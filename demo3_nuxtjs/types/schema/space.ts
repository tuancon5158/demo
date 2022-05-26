import { I_TagListItem } from '~/types/schema/tag'

export interface I_Space {
  id?: number
  title?: string
  categoryId?: number | string
  description?: string
  thumbnailUrl?: string
  coverType?: number
  coverDataValue?: string
  coverDefaultImageUrl?: string
  embedUrl?: string
  publishedStatus?: number
  publishedDate?: string
  tags?: Array<I_TagListItem>
  expirationDate?: ''
}

export interface I_SpaceListRequest {
  page?: number
  limit?: number
  sort?: string
  publishedStatus?: number
  direction?: string
  categoryId?: number
  include?: string
  userId?: number
  workspaceId?: string
}

export interface I_FollowSpace {
  followerId: number
  followingId: number
}

export interface I_SpaceListDTO {
  anonymous: number
  category: Object
  categoryId: number
  coverDataValue: string
  coverDefaultImageUrl: string
  coverType: number
  createdAt: string
  deepLink: string
  deletedAt?: string
  description: string
  embedUrl: string
  id: string
  isRecommended: number
  numFavorites: number
  numViewers: number
  orders?: string
  publishedDate: string
  publishedStatus: number
  shortLink: string
  tags: I_TagListItem[]
  thumbnailUrl: string
  title: string
  updatedAt: string
  userSpaces: []
  uuid?: number
}

export interface I_SpaceDetailDTO {
  createdAt?: string
  updatedAt?: string
  id?: string
  uuid?: string
  categoryId?: number
  title?: string
  description?: string
  thumbnailUrl?: string
  embedUrl?: string
  orders?: number
  coverType?: string
  coverDataValue?: string
  coverDefaultImageUrl?: string
  publishedStatus?: number
  publishedDate?: string
  numViewers?: number
  numFavorites?: number
  shortLink?: string
  deepLink?: string
  isRecommended?: number
  anonymous?: number
  expiredAt?: string
  category?: string
  tags?: {
    id?: number
    name: string
  }
  spaceTicket?: {
    haveEvent: boolean
    eventNow: boolean
  }
  isFavorited?: boolean
  userSpaces?: any // fix it later
}
