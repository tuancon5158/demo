// Login
export interface I_LoginRequest {
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

export interface I_MsgErrorRegisterRequest {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface I_RegisterConfirmCode {
  email: string
  confirmCode: string
}

//
export interface I_ResendConfirmRequest {
  email: string
}
