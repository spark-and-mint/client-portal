export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_STAKEHOLDER_ACCOUNT = "createStakeholderAccount",

  // STAKEHOLDER KEYS
  GET_CURRENT_STAKEHOLDER = "getCurrentStakeholder",
  GET_STAKEHOLDERS = "getStakeholders",
  GET_STAKEHOLDER_BY_ID = "getStakeholderById",
  GET_MEMBER_BY_ID = "getMemberById",

  // CLIENT KEYS
  GET_CLIENTS = "getClients",
  GET_CLIENT_BY_ID = "getClientById",

  // UPDATE KEYS
  GET_UPDATES_BY_PROJECT_ID = "getUpdatesByProjectId",
  GET_UPDATE_BY_ID = "getUpdateById",
  GET_STAKEHOLDER_UPDATES = "getStakeholderUpdates",
  GET_MILESTONE_UPDATES = "getMilestoneUpdates",
  GET_UPDATE_FEEDBACK = "getUpdateFeedback",

  // OPPORTUNITY KEYS
  GET_STAKEHOLDER_OPPORTUNITY = "getStakeholderOpportunity",

  // PROJECTS KEYS
  GET_CLIENT_PROJECTS = "getClientProjects",
  GET_PROJECT_BY_ID = "getProjectById",
  GET_PROJECT_TEAM = "getProjectTeam",

  // MILESTONE KEYS
  GET_MILESTONE_BY_ID = "getMilestoneById",
  GET_PROJECT_MILESTONES = "getProjectMilestones",

  // OTHER KEYS
  GET_TYPEFORM_ANSWERS_BY_EMAIL = "getTypeformAnswersByEmail",
}
