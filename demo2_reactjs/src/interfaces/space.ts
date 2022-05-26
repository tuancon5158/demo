export interface ISpace {
	category?: ICategory
	content?: string
	id: number | string
	createdAt: string
	updatedAt: string
	thumbnailUrl: string
	title: string
	description: string
	isKey: number
	isRecommended: number
	numViewers: number
	publishedStatus: number
	publishedDate: string
	tags?: { name: string; id: string }[]
	numFavorites?: number
	spaceInstances: SpaceInstances[]
	coverType?: number
	coverDataValue?: string
	userSpaces: IUserSpaces[]
	creator?: string
	workspaceSpace?: { workspace: { name: string } }[]
	workspaceSpaceName?: string
}
export interface SpaceInstances {
	createdAt: string
	expiredAt: string
	id: string
}
export interface ICategory {
	colorCode?: string
	id: string
	name?: string
}

export interface IUserSpaces {
	id: string
	roleId: number
	spaceId?: string
	userId: number
	user: {
		name: string
	}
}
