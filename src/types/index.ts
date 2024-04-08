export type INewStakeholder = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type IStakeholder = {
  accountId: string
  clientId: string
  email: string
  firstName: string
  lastName: string
  name: string
  avatarUrl: string
  avatarId: string
  emailVerification: boolean
}

export type IUpdateStakeholder = {
  stakeholderId: string
  clientId: string
  email: string
  firstName: string
  lastName: string
  file: File[]
  avatarId: string
  avatarUrl?: URL | string
  emailVerification?: boolean
}

export type IClient = {
  id: string
  name: string
  logoUrl: URL | string
  logoId: string
  file: File[]
  description?: string
  stakeholders?: IStakeholder[]
  resources?: IResource[]
  projects?: IProject[]
}

export type IResource = {
  title: string
  link: string
  type: "design" | "document" | "other"
}

export type IOption = {
  label: string
  value: string
  [key: string]: string | boolean | undefined
}

export type IProject = {
  projectId: string
  title: string
  briefLink?: string
  additionalLink?: string
  sparkRep?: string
  status?: string
  client?: IClient
  team?: IStakeholder[] | null
}

export type IOpportunity = {
  opportunityId: string
  status?: string
  role?: string
  background?: string
  description?: string
  duration?: string
  type?: string
  estimatedEarnings?: string
  responsibilities?: string
}

export type INewMilestone = {
  projectId: string
  title: string
}

export type IMilestone = {
  milestoneId: string
  title: string
  updates?: IUpdate[]
  status?: "in progress" | "approved"
}

export type IUpdate = {
  updateId: string
  title: string
  type?: string
  link?: string
  file?: File[]
  description?: string
}

export type INewFeedback = {
  updateId: string
  text: string
}

export type IFeedback = {
  feedbackId: string
  text: string
}
