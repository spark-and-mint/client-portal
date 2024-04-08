import {
  IClient,
  IStakeholder,
  INewStakeholder,
  IOpportunity,
  IProject,
  IUpdate,
  IUpdateStakeholder,
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
  getStakeholderProjects,
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
} from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"

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
    queryKey: [QUERY_KEYS.GET_MEMBER_BY_ID, stakeholderId],
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
        queryKey: [QUERY_KEYS.GET_CURRENT_MEMBER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MEMBER_BY_ID, data?.$id],
      })
    },
  })
}

export const useGetStakeholders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBERS],
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
        queryKey: [QUERY_KEYS.GET_MEMBERS],
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

export const useGetStakeholderUpdates = (stakeholderId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_UPDATES, stakeholderId],
    queryFn: () => getStakeholderUpdates(stakeholderId),
    enabled: !!stakeholderId,
  })
}

export const useGetStakeholderOpportunity = (stakeholderId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_OPPORTUNITY, stakeholderId],
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
        queryKey: [QUERY_KEYS.GET_MEMBER_OPPORTUNITY, data?.stakeholder.$id],
      })
    },
  })
}

export const useGetStakeholderProjects = (stakeholderId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_PROJECTS, stakeholderId],
    queryFn: () => getStakeholderProjects(stakeholderId),
    enabled: !!stakeholderId,
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
