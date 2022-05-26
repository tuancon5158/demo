// ----------------------------------------------
//                    COMMON
// ----------------------------------------------
export type ICode = 200 | 401 | 404

export interface IResponseType<T> {
	httpStatusCode: ICode
	timestamp: string
	description: string
	response: {
		code?: ICode
		description?: string
		data: T
	}
	data?: T
}

export interface IParams {
	page?: number
	limit?: number
	sort?: string
	direction?: string
	title?: string
	status?: string
}
export interface IResponse<T> {
	code?: ICode
	description?: string
	data: T
}
// pagination
export interface IPagination {
	page: number
	limit: number
	totalPages?: number
	totalRecords?: number
}

// metadata

export interface I_Meta {
	httpStatusCode: ICode
	requestId: string
	attempts: number
	totalRetryDelay: number
	extendedRequestId: string
	cfId: string
}

// ----------------------------------------------
//                    REGISTER
// ----------------------------------------------
// register response
export interface I_Register_Response_Data {
	$metadata: I_Meta
	CodeDeliveryDetails: {
		AttributeName: string
		DeliveryMedium: string
		Destination: string
	}
	UserConfirmed: boolean
	UserSub: string
}

// ----------------------------------------------
//                    LOGIN
// ----------------------------------------------
// login response
export interface ILoginResponseData {
	message: string
	$metadata: I_Meta
	AuthenticationResult: {
		AccessToken: string
		ExpiresIn: number
		IdToken: string
		RefreshToken: string
		TokenType: string
		NewDeviceMetadata: {
			DeviceKey: string
			DeviceGroupKey: string
		}
	}
	ChallengeName: string
	Session: string
	ChallengeParameters: object
}

// auth confirm resonpse
export interface I_Confirm_Login_Response_Data {
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
	lastLoginDate: string
	deletedAt: string
	createdAt: string
	updatedAt: string
	id: number
}

// auth confirm email
export interface I_Confirm_Email_Response_Data {
	message: string
	$metadata: I_Meta
	CodeDeliveryDetails: {
		AttributeName: string
		DeliveryMedium: string
		Destination: string
	}
}

// refesh-token response
export interface I_RefeshToken_Response_Data {
	message: string
	$metadata: I_Meta
	AuthenticationResult: {
		AccessToken: string
		ExpiresIn: number
		IdToken: string
		RefreshToken: string
		TokenType: string
		NewDeviceMetadata: {
			DeviceKey: string
			DeviceGroupKey: string
		}
	}
	ChallengeName: string
	Session: string
	ChallengeParameters: object
}

// user account change (path)  response || user account get list response
export interface I_UserAccountUpdate_Response_Data {
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
	lastLoginDate: string
	deletedAt: string
	createdAt: string
	updatedAt: string
	id: number
}

// user change email resonponse (get)
export interface I_UserChangeEmail_Response_Data {
	MessageId: string
	$metadata: I_Meta
}
// user change email resonponse (post)
export interface IUserInfoResponse {
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
	lastLoginDate: string
	deletedAt: string
	createdAt: string
	updatedAt: string
	id: number
}

// user change password resonponse
// user change email resonponse (get)
export interface IUserMetaResponse {
	message: string
	$metadata: I_Meta
}

// user language response
export interface I_UserLanguage_Response_Data {
	language: string
}

// get User
export interface I_GetUserInfo_Response_Data {
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
	lastLoginDate: string
	deletedAt: string
	createdAt: string
	updatedAt: string
	id: number
	countSpaces: number
	countFavorites: number
	countFollower: number
	countFollowing: number
	isFollowing: boolean
}

// user-new password response
export interface I_UserNewPassword_Response_Data {
	message: string
	$metadata: I_Meta
}

// delete user
export interface I_DeleteUser_Response_Data {
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
	lastLoginDate: string
	deletedAt: string
	createdAt: string
	updatedAt: string
	id: number
}

// get user follower response + user Following
export interface I_UserFollow_Response_Data {
	pagination: IPagination
	list: string[]
}

// is follower
export interface I_IsFollow_Response_Data {
	isFollower: boolean
}

// user-follow
export interface I_UserFollow2_Response_Data {
	followerId: number
	followingId: number
	isFollowed: boolean
}

// get Space response
export interface I_GetSpaces_Response_Data {
	pagination: IPagination
	list: string[]
}

// post Space response + patch
export interface I_Space_Response_Data_Details {
	createdAt: string
	updatedAt: string
	id: string
	uuid: string
	categoryId: number
	title: string
	description: string
	thumbnailUrl: string
	embedUrl: string
	orders: number
	coverType: number
	coverDataValue: string
	coverDefaultImageUrl: string
	publishedStatus: number
	publishedDate: string
	numViewers: number
	numFavorites: number
	isRecommended: boolean
	expiredAt: string
	category: {
		createdAt: string
		updatedAt: string
		id: number
		name: string
		nameEn: string
		colorCode: string
	}
	tags: string[]
	isFavorited: boolean
	userSpaces: string[]
	shortLink: string
	deepLink: string
}

// space affected row ?
export interface I_Space_Affected_Response_Data {
	affectedRows: number
}

// space instance
export interface I_Space_Instance_Response_Data {
	createdAt: string
	updatedAt: string
	id: string
	uuid: string
	spaceId: string
	expiredAt: string
}

// space dynamic link
export interface I_Space_Dynamic_Response_Data {
	id: string
	shortLink: string
	deepLink: string
}

// Patch space favourite

export interface I_Space_Favourite_Patch_Response_Data {
	userId: number
	spaceId: string
	isFavorited: true
}

// ---------------------------------------------
// NEWS
// ----------------------------------------------

// get news
export interface IGetNewsResponseData {
	pagination: IPagination
	list: string[]
}
export interface IGetResponseData<R> {
	pagination: IPagination
	list: R[]
}
// get news -> id

export interface IGetNewsIdResponseData {
	id: number
	title: string
	titleEn: string
	body: string
	bodyEn: string
	image: string
	newsUrl: string
	isActive: number
	createdAt: string
	updatedAt: string
	deletedAt: string
	publishedAt: string
}

// ---------------------------------------------
// AVATAR
// ----------------------------------------------

// get avatar
export interface I_Get_Avatar_Response_Data {
	pagination: IPagination
	list: string[]
}

// post avatar
export interface I_Post_Avatar_Response_Data {
	id: number
	path: string
	users: string[]
	createdAt: string
	updatedAt: string
	deletedAt: string
}

// ---------------------------------------------
// CONTACT
// ----------------------------------------------
/// get contact
export interface I_Get_Contact_Response_Data {
	pagination: IPagination
	list: string[]
}
// post contact
export interface I_Post_Contact_Response_Data {
	id: number
	name: string
	email: string
	phone: string
	companyName: string
	department: string
	content: string
	detail: string
	createdAt: string
	updatedAt: string
	deletedAt: string
}

// ---------------------------------------------
// TAGS
// ----------------------------------------------

// get Tags
export interface I_Get_Tags_Response_Data {
	pagination: IPagination
	list: string[]
}

// post Tags
export interface I_Post_Tags_Response_Data {
	id: number
	name: string
	spaces: string[]
}

// ---------------------------------------------
// CATEGORIES
// ----------------------------------------------

// get Categories
export interface I_Get_Categories_Response_Data {
	pagination: IPagination
	list: string[]
}

// ---------------------------------------------
// ROLES
// ----------------------------------------------

// get role
export interface I_Get_Roles_Response_Data {
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
	lastLoginDate: string
	deletedAt: string
	createdAt: string
	updatedAt: string
	id: number
}

// ---------------------------------------------
// GUEST
// ----------------------------------------------

// Post + Patch guest + Get guest
export interface I_Guest_Response_Data {
	name: string
	spaceId: string
	uuid: string
	id: boolean
	createdAt: string
	updatedAt: string
	spaceLog?: string[]
}

// ---------------------------------------------
// FILE
// ----------------------------------------------
// post file
export interface I_File_Response_Data {
	key?: string
	message?: string
}

// ---------------------------------------------
// WORKSPACES
// ----------------------------------------------
// getWorkspaces response
export interface I_WorkSpaceInfoSingle {
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
export interface I_Get_Workspace_Response_Data {
	pagination: IPagination
	workspaceList: [I_WorkSpaceInfoSingle]
}

// post Workspaces response
export interface I_Post_Workspace_Response_Data {
	createdAt: string
	updatedAt: string
	id: string
	type: string
	thumbnailUrl: string
	description: string
	userId: number
	orders: number
	companyName: string
	companyUrl: string
	contactUrl: string
	remainingDataVolume: number
	isActive: boolean
	createdUserId: number
	updatedUserId: number
	deletedAt: string
	workspacePlanId: number
}

export interface I_Register_Workspace_Response_Data {
	id: string
	name: string
	type: number
	thumbnailUrl: string
	description: string
	userId: number
	orders: number
	contactUrl: string
	companyName: string
	companyUrl: string
	createdAt: string
	updatedAt: string
	workspacePlanId: number
}
export interface I_Register_Space_Issues_Response_Data {
	id: number
	memberRole: number
	workspaceId: string
	userId: number
	orders: number
	createdAt: string
	updatedAt: string
	deletedAt: string
}
// ---------------------------------------------
// MEMBERS
// ----------------------------------------------

// get members
export interface I_Get_Members_Response_Data {
	pagination: {
		page: number
		isFirst: boolean
		next: Object
		previous: Object
		limit: number
		totalPages: number
		totalRecords: number
		isLast: boolean
	}
	workspaceUserList: string[]
}

export interface I_Get_Members_Me_Response_Data {
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
	workspace: object
	user: object
}

// patch members response
export interface I_Patch_Members_Response_Data {
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
}

// delete members response
export interface I_Delete_Members_Response_Data {
	generatedMaps: object
	raw: object
	affected: number
}

// get info plan response
export interface I_Get_Info_Plan_Response_Data {
	workspaceId: string
	planName: string
	planNameEn: string
	maxDataVolume: number
	useDataVolume: number
	useAccount: number
	maxAccount: number
	invoice: number
	discount: number
}

// post members invite response
export interface I_Post_Members_Invite_Response_Data {
	inviteNewUser: number
	inviteExistUser: number
}
