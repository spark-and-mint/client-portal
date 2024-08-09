import {
  Client,
  Account,
  Databases,
  Storage,
  Avatars,
  Functions,
  Messaging,
} from "appwrite"

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  clientCollectionId: import.meta.env.VITE_APPWRITE_CLIENT_COLLECTION_ID,
  feedbackCollectionId: import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID,
  memberCollectionId: import.meta.env.VITE_APPWRITE_MEMBER_COLLECTION_ID,
  milestoneCollectionId: import.meta.env.VITE_APPWRITE_MILESTONE_COLLECTION_ID,
  opportunityCollectionId: import.meta.env
    .VITE_APPWRITE_OPPORTUNITY_COLLECTION_ID,
  profileCollectionId: import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID,
  projectCollectionId: import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_ID,
  documentCollectionId: import.meta.env.VITE_APPWRITE_DOCUMENT_COLLECTION_ID,
  stakeholderCollectionId: import.meta.env
    .VITE_APPWRITE_STAKEHOLDER_COLLECTION_ID,
  updateCollectionId: import.meta.env.VITE_APPWRITE_UPDATE_COLLECTION_ID,
  requestCollectionId: import.meta.env.VITE_APPWRITE_REQUEST_COLLECTION_ID,
  feedbackRequestCollectionId: import.meta.env
    .VITE_APPWRITE_FEEDBACK_REQUEST_COLLECTION_ID,
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
export const functions = new Functions(client)
export const messaging = new Messaging(client)
