// Login
export interface ILoginRequest {
	email: string
	password: string
	remember_me?: boolean
}
export interface I_MsgErrorLoginRequest {
	email: string
	password: string
}

// Register
export interface I_RegisterRequest {
	email: string
	password: string
	passwordConfirm: string
	name: string
	rolesId?: string
}
