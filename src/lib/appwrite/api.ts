import { ID, Models, Query } from "appwrite"
import { appwriteConfig, account, databases, storage, avatars } from "./config"
import {
  IClient,
  IStakeholder,
  INewStakeholder,
  IOpportunity,
  IProject,
  IUpdate,
  IUpdateStakeholder,
  INewMilestone,
  IFeedback,
  INewFeedback,
  IMilestone,
  INewRequest,
  INewOAuthStakeholder,
  INewClient,
} from "@/types"
import { nanoid } from "nanoid"

export async function createStakeholderAccount(stakeholder: INewStakeholder) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      stakeholder.email,
      stakeholder.password,
      `${stakeholder.firstName} ${stakeholder.lastName}`
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(
      `${stakeholder.firstName} ${stakeholder.lastName}`
    )

    const newStakeholder = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: newAccount.email,
        firstName: stakeholder.firstName,
        lastName: stakeholder.lastName,
        avatarUrl,
        avatarId: nanoid(),
      }
    )

    return newStakeholder
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function createOAuthStakeholderAccount(
  stakeholder: INewOAuthStakeholder,
  userId: string
) {
  try {
    const avatarUrl = avatars.getInitials(
      `${stakeholder.firstName} ${stakeholder.lastName}`
    )

    const newStakeholder = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      ID.unique(),
      {
        accountId: userId,
        email: stakeholder.email,
        firstName: stakeholder.firstName,
        lastName: stakeholder.lastName,
        avatarUrl,
        avatarId: nanoid(),
      }
    )

    return newStakeholder
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function signInAccount(stakeholder: {
  email: string
  password: string
}) {
  try {
    const session = await account.createEmailSession(
      stakeholder.email,
      stakeholder.password
    )
    return session
  } catch (error) {
    console.log(error)
  }
}

export async function getCurrentStakeholder() {
  try {
    const session = await account.getSession("current")

    if (!session || !session.userId) throw new Error("No active session.")

    const currentStakeholder = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      [Query.equal("accountId", session.userId)]
    )

    if (!currentStakeholder) throw new Error("Stakeholder not found.")

    return { stakeholder: currentStakeholder.documents[0], error: null }
  } catch (error) {
    return { stakeholder: null, error }
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get()
    return currentAccount
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current")
    return session
  } catch (error) {
    console.log(error)
  }
}

export async function getStakeholders() {
  const stakeholders = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.stakeholderCollectionId
  )

  if (!stakeholders) throw Error

  return stakeholders
}

export async function getStakeholderById(stakeholderId: string) {
  try {
    const stakeholder = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      stakeholderId
    )

    if (!stakeholder) throw Error

    return stakeholder
  } catch (error) {
    console.log(error)
  }
}

export async function updateStakeholder(stakeholder: IUpdateStakeholder) {
  const hasFileToUpdate = stakeholder.file.length > 0

  try {
    let avatar = {
      avatarUrl: stakeholder.avatarUrl,
      avatarId: stakeholder.avatarId,
    }

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(stakeholder.file[0])

      if (!uploadedFile) throw Error

      const fileUrl = getFilePreview(uploadedFile.$id)

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }

      avatar = { ...avatar, avatarUrl: fileUrl, avatarId: uploadedFile.$id }
    }

    const updatedStakeholder = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      stakeholder.stakeholderId,
      {
        emailVerification: stakeholder.emailVerification,
        email: stakeholder.email,
        firstName: stakeholder.firstName,
        lastName: stakeholder.lastName,
        avatarUrl: avatar.avatarUrl,
        avatarId: avatar.avatarId,
        clientId: stakeholder.clientId,
      }
    )

    if (!updatedStakeholder) {
      if (hasFileToUpdate) {
        await deleteFile(avatar.avatarId)
      }
      throw Error
    }

    if (stakeholder.avatarId && hasFileToUpdate) {
      await deleteFile(stakeholder.avatarId)
    }

    return updatedStakeholder
  } catch (error) {
    console.log(error)
  }
}

export async function createClient(client: INewClient) {
  try {
    const newClient = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      ID.unique(),
      {
        name: client.name,
        logoId: nanoid(),
        logoUrl: avatars.getInitials(client.name),
      }
    )

    return newClient
  } catch (error) {
    console.log(error)
  }
}

export async function getClients() {
  const clients = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.clientCollectionId
  )

  if (!clients) throw Error

  return clients
}

export async function getClientById(clientId?: string) {
  if (!clientId) throw Error

  try {
    const client = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      clientId
    )

    if (!client) throw Error

    return client
  } catch (error) {
    console.log(error)
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (error) {
    console.log(error)
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      400,
      400
    )

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}

export async function updateClient(client: IClient) {
  const hasFileToUpdate = client.file.length > 0

  try {
    let logo = {
      logoUrl: client.logoUrl,
      logoId: client.logoId,
    }

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(client.file[0])
      if (!uploadedFile) throw Error

      const fileUrl = getFilePreview(uploadedFile.$id)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }

      logo = { ...logo, logoUrl: fileUrl, logoId: uploadedFile.$id }
    }

    const updatedClient = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      client.id,
      {
        name: client.name,
        description: client.description,
        logoUrl: logo.logoUrl,
        logoId: logo.logoId,
      }
    )

    if (!updatedClient) {
      if (hasFileToUpdate) {
        await deleteFile(logo.logoId)
      }

      throw Error
    }

    if (hasFileToUpdate) {
      await deleteFile(client.logoId)
    }

    return updatedClient
  } catch (error) {
    console.log(error)
  }
}

export async function assignStakeholderToClient(
  clientId: string,
  stakeholderArray: IStakeholder[]
) {
  try {
    const updatedClient = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      clientId,
      {
        stakeholders: stakeholderArray,
      }
    )

    if (!updatedClient) throw Error

    return updatedClient
  } catch (error) {
    console.log(error)
  }
}

export async function deleteClient(clientId?: string, logoId?: string) {
  if (!clientId || !logoId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      clientId
    )

    if (!statusCode) throw Error

    await deleteFile(logoId)

    return { status: "Ok" }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return { status: "ok" }
  } catch (error) {
    console.log(error)
  }
}

export async function getTypeFormAnswersByEmail(email: string) {
  if (!email) throw Error("Email can't be empty")

  try {
    const response = await fetch(
      `https://spectacular-sprite-2804c0.netlify.app/.netlify/functions/formResponses?email=${email}`
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`An error occurred: ${error}`)
    return error
  }
}

export async function updateUpdate(update: IUpdate) {
  try {
    const updatedUpdate = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      update.updateId,
      {
        title: update.title,
        isViewed: update.isViewed,
      }
    )

    if (!updatedUpdate) {
      throw Error
    }

    return updatedUpdate
  } catch (error) {
    console.log(error)
  }
}

export async function getStakeholderUpdates(stakeholderId?: string) {
  if (!stakeholderId) return

  try {
    const update = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      [Query.equal("creator", stakeholderId), Query.orderDesc("$createdAt")]
    )

    if (!update) throw Error

    return update
  } catch (error) {
    console.log(error)
  }
}

export async function getStakeholderOpportunity(stakeholderId?: string) {
  if (!stakeholderId) return

  try {
    const opportunity = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      [Query.equal("stakeholder", stakeholderId)]
    )

    if (!opportunity) throw Error

    return opportunity
  } catch (error) {
    console.log(error)
  }
}

export async function updateOpportunity(opportunity: IOpportunity) {
  if (!opportunity) return

  try {
    const updatedOpportunity = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      opportunity.opportunityId,
      {
        status: opportunity.status,
      }
    )

    if (!updatedOpportunity) {
      throw Error
    }

    return updatedOpportunity
  } catch (error) {
    console.log(error)
  }
}

export async function getClientProjects(clientId?: string) {
  if (!clientId) return

  try {
    const projects = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      [Query.equal("clientId", clientId)]
    )

    if (!projects) throw Error

    return projects
  } catch (error) {
    console.log(error)
  }
}

export async function updateProject(project: IProject) {
  if (!project) return

  try {
    const updatedProject = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      project.projectId,
      {
        title: project.title,
        team: project.team,
      }
    )

    if (!updatedProject) {
      throw Error
    }

    return updatedProject
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectById(projectId?: string) {
  if (!projectId) throw Error

  try {
    const project = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      projectId
    )

    if (!project) throw Error

    return project
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectTeam(
  projectId?: string,
  memberIds: string[] = []
) {
  if (!projectId || !memberIds.length)
    throw Error("Invalid project ID or member IDs")

  try {
    const opportunities = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      [Query.equal("projectId", projectId)]
    )

    const memberRoles = opportunities.documents.reduce((acc, doc) => {
      if (memberIds.includes(doc.memberId)) {
        acc[doc.memberId] = doc.role
      }
      return acc
    }, {})

    const teamMembers = await Promise.all(
      memberIds.map(async (memberId) => {
        const memberDetails = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.memberCollectionId,
          memberId
        )

        return {
          id: memberId,
          firstName: memberDetails.firstName,
          lastName: memberDetails.lastName,
          avatarUrl: memberDetails.avatarUrl,
          role: memberRoles[memberId] || "Team member",
        }
      })
    )

    return teamMembers
  } catch (error) {
    console.error("Failed to fetch project team: ", error)
    throw new Error("Error fetching project team")
  }
}

export async function createMilestone(milestone: INewMilestone) {
  try {
    const newMilestone = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      ID.unique(),
      {
        projectId: milestone.projectId,
        title: milestone.title,
      }
    )

    return newMilestone
  } catch (error) {
    console.log(error)
  }
}

export async function updateMilestone(milestone: IMilestone) {
  try {
    const updatedMilestone = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      milestone.milestoneId,
      {
        title: milestone.title,
        status: milestone.status,
      }
    )

    if (!updatedMilestone) {
      throw Error
    }

    return updatedMilestone
  } catch (error) {
    console.log(error)
  }
}

export async function deleteMilestone(milestoneId?: string) {
  if (!milestoneId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      milestoneId
    )

    if (!statusCode) throw Error

    return { status: "Ok", milestoneId }
  } catch (error) {
    console.log(error)
  }
}

export async function getMilestoneById(milestoneId?: string) {
  if (!milestoneId) throw Error

  try {
    const milestone = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      milestoneId
    )

    if (!milestone) throw Error

    return milestone
  } catch (error) {
    console.log(error)
  }
}

export async function createFeedback(feedback: INewFeedback) {
  try {
    const newFeedback = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      ID.unique(),
      {
        updateId: feedback.updateId,
        text: feedback.text,
        label: feedback.label,
      }
    )

    return newFeedback
  } catch (error) {
    console.log(error)
  }
}

export async function getUpdateFeedback(updateId?: string) {
  if (!updateId) return

  try {
    const feedback = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      [Query.equal("updateId", updateId)]
    )

    if (!feedback) throw Error

    return feedback.documents
  } catch (error) {
    console.log(error)
  }
}

export async function updateFeedback(feedback: IFeedback) {
  try {
    const updatedFeedback = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      feedback.feedbackId,
      {
        text: feedback.text,
        label: feedback.label,
      }
    )

    if (!updatedFeedback) {
      throw Error
    }

    return updatedFeedback
  } catch (error) {
    console.log(error)
  }
}

export async function deleteFeedback(feedbackId: string, updateId: string) {
  if (!feedbackId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      feedbackId
    )

    if (!statusCode) throw Error

    return { status: "Ok", updateId }
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectMilestones(projectId?: string) {
  if (!projectId) return

  try {
    const milestones = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      [Query.equal("projectId", projectId)]
    )

    if (!milestones) throw Error

    return milestones.documents
  } catch (error) {
    console.log(error)
  }
}

export async function getMilestoneUpdates(milestoneId?: string) {
  if (!milestoneId) return

  try {
    const updates = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      [Query.equal("milestoneId", milestoneId)]
    )

    if (!updates) throw Error

    return updates.documents
  } catch (error) {
    console.log(error)
  }
}

export async function getMemberById(memberId: string) {
  try {
    const member = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.memberCollectionId,
      memberId
    )

    if (!member) throw Error

    return member
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectsWithNewUpdates(clientId: string) {
  if (!clientId) return

  try {
    const projects = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      [Query.equal("clientId", clientId)]
    )

    if (!projects || projects.documents.length === 0)
      throw new Error("No projects found")

    const projectsWithNewUpdates: Models.Document[] = []

    for (const project of projects.documents) {
      const milestones = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.milestoneCollectionId,
        [Query.equal("projectId", project.$id)]
      )

      if (!milestones || milestones.documents.length === 0) continue

      let hasUnviewedUpdates = false

      for (const milestone of milestones.documents) {
        const updates = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.updateCollectionId,
          [
            Query.equal("milestoneId", milestone.$id),
            Query.equal("isViewed", false),
          ]
        )

        if (updates.documents.length > 0) {
          hasUnviewedUpdates = true
          break
        }
      }

      if (hasUnviewedUpdates) {
        projectsWithNewUpdates.push(project)
      }
    }

    return projectsWithNewUpdates
  } catch (error) {
    console.error("Error fetching projects with new updates:", error)
    throw error
  }
}

export async function createRequest(request: INewRequest) {
  try {
    const newRequest = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.requestCollectionId,
      ID.unique(),
      {
        stakeholderId: request.stakeholderId,
        individualOrTeam: request.individualOrTeam,
        fixedOrOngoing: request.fixedOrOngoing,
        goal: request.goal,
        skill: request.skill,
        industry: request.industry,
        timeFrame: request.timeFrame,
        budget: request.budget,
        contactPreference: request.contactPreference,
        contactInfo: request.contactInfo,
        status: "in review",
      }
    )

    return newRequest
  } catch (error) {
    console.log(error)
  }
}

export async function getStakeholderRequests(stakeholderId: string) {
  try {
    const requests = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.requestCollectionId,
      [
        Query.equal("stakeholderId", stakeholderId),
        Query.orderDesc("$createdAt"),
      ]
    )

    if (!requests) throw Error

    return requests
  } catch (error) {
    console.log(error)
  }
}

export async function deleteRequest(requestId: string) {
  if (!requestId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.requestCollectionId,
      requestId
    )

    if (!statusCode) throw Error

    return { status: "Ok", requestId }
  } catch (error) {
    console.log(error)
  }
}

export async function getClientDocuments(clientId?: string) {
  if (!clientId) return

  try {
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.documentCollectionId,
      [Query.equal("clientId", clientId), Query.orderDesc("$createdAt")]
    )

    if (!documents) throw Error

    return documents
  } catch (error) {
    console.log(error)
  }
}

export async function checkIfUserExists(email: string) {
  try {
    const userDoc = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      [Query.equal("email", email)]
    )

    if (userDoc.total > 0) {
      return userDoc.documents[0]
    } else {
      return null
    }
  } catch (error) {
    console.error("Error checking user existence:", error)
    return null
  }
}
