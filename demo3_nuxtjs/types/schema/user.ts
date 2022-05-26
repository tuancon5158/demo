export interface User {
  id: number
  email: string
  rolesId: number
  cognitoUid: string
  isActive: number
  thumbnailUrl: string
  facebookUrl: string
  twitterUrl: string
  introduction: string
  contactUrl: string
  companyName: string
  companyUrl: string
  language: string
  lastLoginDate: { format: 'date-time'; type: 'string' }
  deletedAt: { format: 'date-time'; type: 'string' }
  createdAt: { format: 'date-time'; type: 'string' }
  updatedAt: { format: 'date-time'; type: 'string' }
  countSpaces: number
  countFavorites: number
  countFollower: number
  countFollowing: number
  isFollowing: boolean
}

export interface I_UpdateUser {
  createdAt: Date
  updatedAt: Date
  id: number
  rolesId: number
  avatarId: number
  name: string
  email: string
  thumbnailUrl: string
  facebookUrl: string
  twitterUrl: string
  introduction: string
  contactUrl: string
  companyName: string
  companyUrl: string
  language: string
  lastLoginDate: Date
  isActive: number
  deletedAt: null
  cognitoUid: string
  countSpaces: number
  countFavorites: number
  countFollower: number
  countFollowing: number
  isFollowing: Boolean
}

export interface I_Avatar {
  id: number
  path: string
  users: Array<string>
  createdAt: { format: 'date-time'; type: 'string' }
  updatedAt: { format: 'date-time'; type: 'string' }
  deletedAt: { format: 'date-time'; type: 'string' }
}

export interface I_Account {
  id: number
  name: string
  email: string
  rolesId: number
  cognitoUid: string
  isActive: number
  thumbnailUrl: string
  facebookUrl: string
  twitterUrl: string
  instagramUrl: string
  introduction: string
  contactUrl: string
  companyName: string
  companyUrl: string
  language: string
  lastLoginDate: { format: 'date-time'; type: 'string' }
  deletedAt: { format: 'date-time'; type: 'string' }
  createdAt: { format: 'date-time'; type: 'string' }
  updatedAt: { format: 'date-time'; type: 'string' }
}

export interface I_Account_Change_Request {
  name?: string
  thumbnailUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  introduction?: string
  contactUrl?: string
  companyName?: string
  companyUrl?: string
  avatarId?: number
  language?: string
}
