export interface I_MemberPersonal {
  name: string
  email: string
  companyName?: string
  url?: string
  reason: string
  numberOfUser?: string
}

export interface I_Members_Request {
  page?: number
  limit?: number | string
  sort?: string
  direction?: string
  name?: string
  workspaceId: string
  sortAlias?: string
}

export interface I_Patch_Members_Request {
  memberRole: number
  userId: number
  workspaceId: string
}

export interface I_Patch_Members_Notification_Request {
  id: number
  isMailNotify: boolean
}

export interface I_MembersList {
  createdAt: string
  updatedAt: string
  id: number
  memberRole: number
  workspaceId: string
  userId: number
  orders: number
  createdUserId: number
  updatedUserId: number
  deletedAt: string
  user: {
    createdAt: string
    updatedAt: string
    id: number
    rolesId: number
    avatarId: number
    name: string
    thumbnailUrl: string
    facebookUrl: string
    twitterUrl: string
    introduction: string
    contactUrl: string
    companyName: string
    companyUrl: string
    language: string
    lastLoginDate: string
  }
}

export interface I_Post_Members_Invite_Request {
  workspaceId: string
  emails: string[]
}
