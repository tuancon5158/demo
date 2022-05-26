export interface I_WorkspaceRequest {
  name: string
  email: string
  companyName: string
  url: string
  usersCount: number
  reason: string
}

// get workspaces
export interface I_Workspace_Get_Request {
  page?: string
  limit?: number
  direction?: string
  sort?: string
  sortAlias?: string
  userId: number
}

// register workspaces
export interface I_Workspace_Register_Request {
  id?: string
  name?: string
  thumbnailUrl?: string
  description?: string
  orders?: number
  contactUrl?: string
  companyName?: string
  companyUrl?: string
}

export interface I_Get_Workspace {
  companyName: string
  companyUrl: string
  contactUrl: string
  createdAt: { format: 'date-time'; type: 'string' }
  createdUserId: number
  deletedAt: { format: 'date-time'; type: 'string' }
  description: string
  id: string
  isActive: boolean
  name: string
  orders: number
  remainingDataVolume: number
  thumbnailUrl: null
  type: number
  updatedAt: { format: 'date-time'; type: 'string' }
  updatedUserId: number
  userId: number
  workspacePlan: { planId: number }
  workspacePlanId: number
}
