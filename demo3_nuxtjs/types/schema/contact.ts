export interface I_ContactInput {
  name: string
  email: string
  phone: string
  companyName: string
  department: string
  optionRadio: string
  contactDetails: string
  recaptchaToken?: string
}

export interface I_ContactRequest {
  name: string
  email: string
  phone?: string
  companyName?: string
  department?: string
  content?: string
  detail: string
  recaptchaToken?: string
}
