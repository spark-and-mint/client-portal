import {
  IClient,
  IStakeholder,
  INewStakeholder,
  IOpportunity,
  IProject,
  IUpdate,
  IUpdateStakeholder,
  INewMilestone,
  INewFeedback,
  IFeedback,
  IMilestone,
} from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  assignStakeholderToClient,
  createStakeholderAccount,
  deleteClient,
  getClientById,
  getClients,
  getStakeholderById,
  getStakeholderOpportunity,
  getStakeholderUpdates,
  getStakeholders,
  getProjectById,
  getTypeFormAnswersByEmail,
  signInAccount,
  signOutAccount,
  updateClient,
  updateStakeholder,
  updateOpportunity,
  updateProject,
  updateUpdate,
  getClientProjects,
  createMilestone,
  deleteMilestone,
  updateFeedback,
  createFeedback,
  getMilestoneById,
  deleteFeedback,
  updateMilestone,
} from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"
import { useParams } from "react-router-dom"

export const useCreateStakeholderAccount = () => {
  return useMutation({
    mutationFn: (stakeholder: INewStakeholder) =>
      createStakeholderAccount(stakeholder),
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (stakeholder: { email: string; password: string }) =>
      signInAccount(stakeholder),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}

export const useGetStakeholderById = (stakeholderId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAKEHOLDER_BY_ID, stakeholderId],
    queryFn: () => getStakeholderById(stakeholderId),
    enabled: !!stakeholderId,
  })
}

export const useUpdateStakeholder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (stakeholder: IUpdateStakeholder) =>
      updateStakeholder(stakeholder),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_STAKEHOLDER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_STAKEHOLDER_BY_ID, data?.$id],
      })
    },
  })
}

export const useGetStakeholders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAKEHOLDERS],
    queryFn: getStakeholders,
  })
}

export const useGetClients = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENTS],
    queryFn: getClients,
  })
}

export const useGetClientById = (clientId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId,
  })
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (client: IClient) => updateClient(client),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, data?.$id],
      })
    },
  })
}

export const useAssignStakeholderToClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      clientId,
      stakeholderArray,
    }: {
      clientId: string
      stakeholderArray: IStakeholder[]
      addStakeholder: boolean
    }) => assignStakeholderToClient(clientId, stakeholderArray),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_STAKEHOLDERS],
      })
    },
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ clientId, logoId }: { clientId?: string; logoId: string }) =>
      deleteClient(clientId, logoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
    },
  })
}

export const useGetTypeFormAnswersByEmail = (
  email: string,
  importedAnswers: boolean
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TYPEFORM_ANSWERS_BY_EMAIL, email],
    queryFn: () => getTypeFormAnswersByEmail(email),
    enabled: !importedAnswers,
  })
}

export const useUpdateUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (update: IUpdate) => updateUpdate(update),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UPDATE_BY_ID, data?.$id],
      })
    },
  })
}

export const useUpdateIsViewed = () => {
  return useMutation({
    mutationFn: (update: IUpdate) => updateUpdate(update),
  })
}

export const useGetStakeholderUpdates = (stakeholderId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAKEHOLDER_UPDATES, stakeholderId],
    queryFn: () => getStakeholderUpdates(stakeholderId),
    enabled: !!stakeholderId,
  })
}

export const useGetStakeholderOpportunity = (stakeholderId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAKEHOLDER_OPPORTUNITY, stakeholderId],
    queryFn: () => getStakeholderOpportunity(stakeholderId),
    enabled: !!stakeholderId,
  })
}

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (opportunity: IOpportunity) => updateOpportunity(opportunity),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_STAKEHOLDER_OPPORTUNITY,
          data?.stakeholder.$id,
        ],
      })
    },
  })
}

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: (project: IProject) => updateProject(project),
  })
}

export const useGetProjectById = (projectId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  })
}

export const useGetClientProjects = (clientId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_PROJECTS, clientId],
    queryFn: () => getClientProjects(clientId),
    enabled: !!clientId,
  })
}

export const useCreateMilestone = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (milestone: INewMilestone) => createMilestone(milestone),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, data?.project.$id],
      })
    },
  })
}

export const useUpdateMilestone = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (milestone: IMilestone) => updateMilestone(milestone),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, data?.$id],
      })
    },
  })
}

export const useDeleteMilestone = () => {
  const queryClient = useQueryClient()
  const { projectId } = useParams()
  return useMutation({
    mutationFn: ({ milestoneId }: { milestoneId?: string }) =>
      deleteMilestone(milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, projectId],
      })
    },
  })
}

export const useGetMilestoneById = (milestoneId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, milestoneId],
    queryFn: () => getMilestoneById(milestoneId),
    enabled: !!milestoneId,
  })
}

export const useCreateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (feedback: INewFeedback) => createFeedback(feedback),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, data?.update.milestone.$id],
      })
    },
  })
}

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (feedback: IFeedback) => updateFeedback(feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID],
      })
    },
  })
}

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ feedbackId }: { feedbackId?: string }) =>
      deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID],
      })
    },
  })
}
