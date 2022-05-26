/* eslint-disable */

export default {
	LIMIT_PAGE_DEFAULT: 10,
	PAGE_DEFAULT: 1,
	ROLE_ADMIN: 5,
}
export enum StatusWorkspace {
	Backlog = 0,
	Closed = 1,
}

export enum TypeWorkspace {
	Approved_Not_Plan = 12,
	Approved_Plan = 11,
}
export const publishStatus = [
	{ value: 2, name: `公開` },
	{ value: 1, name: `限定公開` },
	{ value: 0, name: `非公開` },
]
export const coverType = [
	{ value: 0, name: `画像` },
	{ value: 1, name: `Youtube動画` },
	{ value: 2, name: `Sketchfab 3Dモデル` },
	{ value: 3, name: `バーチャルツアー` },
]

export const roles = [
	{ value: 1, name: `オーナー` },
	{ value: 2, name: `アドミン` },
	{ value: 3, name: `メンバー` },
]
