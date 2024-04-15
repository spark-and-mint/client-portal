import { ID, Query } from "appwrite"
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

    const newStakeholder = await saveStakeholderToDB({
      accountId: newAccount.$id,
      clientId: stakeholder.clientId,
      email: newAccount.email,
      name: `${stakeholder.firstName} ${stakeholder.lastName}`,
      firstName: stakeholder.firstName,
      lastName: stakeholder.lastName,
      avatarUrl,
    })

    return newStakeholder
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function saveStakeholderToDB(stakeholder: {
  accountId: string
  clientId: string
  email: string
  name: string
  firstName: string
  lastName: string
  avatarUrl: URL
}) {
  try {
    const newStakeholder = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      ID.unique(),
      {
        accountId: stakeholder.accountId,
        client: stakeholder.clientId,
        email: stakeholder.email,
        name: stakeholder.name,
        firstName: stakeholder.firstName,
        lastName: stakeholder.lastName,
        avatarUrl: stakeholder.avatarUrl,
        avatarId: nanoid(),
      }
    )

    return newStakeholder
  } catch (error) {
    console.log(error)
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
    const currentAccount = await getAccount()

    if (!currentAccount) throw Error

    const currentStakeholder = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.stakeholderCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentStakeholder) throw Error

    return { stakeholder: currentStakeholder.documents[0], error: null }
  } catch (error) {
    console.log(error)
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
      2000,
      2000
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
        resources: client.resources,
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
      [Query.equal("client", clientId)]
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

export async function createMilestone(milestone: INewMilestone) {
  try {
    const newMilestone = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      ID.unique(),
      {
        project: milestone.projectId,
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

    return { status: "Ok" }
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
        update: feedback.updateId,
        text: feedback.text,
      }
    )

    return newFeedback
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

export async function deleteFeedback(feedbackId?: string) {
  if (!feedbackId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      feedbackId
    )

    if (!statusCode) throw Error

    return { status: "Ok" }
  } catch (error) {
    console.log(error)
  }
}
