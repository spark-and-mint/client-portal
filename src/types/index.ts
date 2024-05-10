export type INewStakeholder = {
  email: string
  password: string
  firstName: string
  lastName: string
  company: string
}

export type IStakeholder = {
  id: string
  clientId: string
  email: string
  firstName: string
  lastName: string
  company: string
  name: string
  avatarUrl: string
  avatarId: string
  emailVerification: boolean
}

export type IUpdateStakeholder = {
  stakeholderId: string
  email: string
  firstName: string
  lastName: string
  company?: string
  clientId?: string
  file: File[]
  avatarId: string
  avatarUrl?: URL | string
  emailVerification?: boolean
}

export type IMember = {
  id: string
  email: string
  firstName: string
  lastName: string
  emailVerification: boolean
  importedAnswers: boolean
  name: string
  timezone: string
  status: "in review" | "1on1 done" | "accepted" | "rejected" | null
  profileId: string
  profile: {
    workStatus: string
    seniority: string
    rate: string
    roles: string[]
    skills: string[]
    domains: string[]
    availability: string
    lookingFor: string
    website: string
    linkedin: string
    github: string
    x: string
    farcaster: string
    dribbble: string
    behance: string
  }
  avatarUrl: string
  avatarId: string
  contractSigned: boolean
  projects: IProject[]
}

export type IClient = {
  id: string
  name: string
  logoUrl: URL | string
  logoId: string
  file: File[]
  website?: string
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
  sparkRep?: IMember
  status?: string
  client?: IClient
  team?: IMember[]
}

export type IOpportunity = {
  opportunityId: string
  status?: string
  role?: string
  background?: string
  description?: string
  duration?: string
  member?: IMember
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
  status?: string
}

export type IUpdate = {
  updateId: string
  title: string
  type?: string
  link?: string
  file?: File[]
  description?: string
  isViewed?: boolean
}

export type INewFeedback = {
  updateId: string
  text?: string
  label?: string
}

export type IFeedback = {
  feedbackId: string
  text?: string
  label?: string
}

export type INewRequest = {
  stakeholderId: string
  individualOrTeam: string
  fixedOrOngoing: string
  goal: string
  skill: string
  industry: string
  timeFrame: string
  budget: string
  contactPreference: string
  contactInfo: string
}
