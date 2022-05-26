export interface IWorkspace {
	companyName?: string
	content?: string
	id: number
	createdAt: string
	staff: {
		name: string
	}
	staffId?: number | string
	type: number
	status: number
	name?: string
	email?: string
	department?: string
	reason?: string
	workspaceId?: string
	usersCount?: number
	addAccount?: number
	addStorage?: number
	planId?: number
	workspace?: {
		workspacePlan: any
	}
}
