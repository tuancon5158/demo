// Update Password

export interface I_UpdatePassword {
  password: string
  passwordConfirm: string
  email: string
  confirmCode: string
}

// Update Password
export interface I_UpdateEmailRequest {
  email: string
  emailConfirm: string
}

// Update User
export interface I_UpdateUserRequestname {
  name: string
  thumbnailUrl: string
  facebookUrl: string
  twitterUrl: string
  introduction: string
  contactUrl: string
  companyName: string
  companyUrl: string
  avatarId: number
  language: string
}
