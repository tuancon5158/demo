export interface IWorkspaceAdmin {
	name: string
	id: number | string
	createdAt: string
	updatedAt: string
	thumbnailUrl: string
	description: string
	companyName?: string
	companyUrl?: string
	contactUrl?: string
	invoice: number
	workspacePlan: IWorkspacePlan
	creator?: string
	workspaceUser?: IWorkspaceUser[]
	workspaceSpaceName?: string
	workspaceSpace?: IWorkspaceSpace[]
	spaces?: string
	planName?: string
}
export interface IWorkspacePlan {
	addAccount: number
	addStorage: number
	discount: number
	id: string
	createdAt?: string
	plan?: IPlan
	planId?: number
}
export interface IWorkspaceSpace {
	id: string
	space?: {
		title: string
		createdAt?: string
		publishedStatus: number
		userSpaces: {
			id: string
			user: {
				name: string
			}
		}[]
	}
}
export interface IWorkspaceUser {
	memberRole: number
	user: { name: string; email: string; lastLoginDate: string }
	id: number | string
}
export interface IPlan {
	name: string
	id: string
	maxAccount?: number
	maxStorage: number
	basePrice: number
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
