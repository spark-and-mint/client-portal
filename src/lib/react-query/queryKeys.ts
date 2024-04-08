export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_MEMBER_ACCOUNT = "createStakeholderAccount",

  // MEMBER KEYS
  GET_CURRENT_MEMBER = "getCurrentStakeholder",
  GET_MEMBERS = "getStakeholders",
  GET_MEMBER_BY_ID = "getStakeholderById",

  // CLIENT KEYS
  GET_CLIENTS = "getClients",
  GET_CLIENT_BY_ID = "getClientById",

  // UPDATE KEYS
  GET_UPDATES_BY_PROJECT_ID = "getUpdatesByProjectId",
  GET_UPDATE_BY_ID = "getUpdateById",
  GET_MEMBER_UPDATES = "getStakeholderUpdates",

  // OPPORTUNITY KEYS
  GET_MEMBER_OPPORTUNITY = "getStakeholderOpportunity",

  // PROJECTS KEYS
  GET_MEMBER_PROJECTS = "getStakeholderProjects",
  GET_PROJECT_BY_ID = "getProjectById",

  // OTHER KEYS
  GET_TYPEFORM_ANSWERS_BY_EMAIL = "getTypeformAnswersByEmail",
}
