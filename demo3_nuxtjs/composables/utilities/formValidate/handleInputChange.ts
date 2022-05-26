import {
  validateRequiredFilled,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
  validateName,
  validateCompanyName,
  validateUrl,
  validateUserCount,
  validateIntroduction
} from './validate'
import { I_formValuesType } from '~/types/schema/form'
const urlFormFieldName: string[] = [
  'inquiryForm',
  'websiteUrl',
  'companyUrl',
  'contactUrl',
  'facebookUrl',
  'twitterUrl',
  'embedUrl',
  'url'
]

export function handleInputChangeComposables(
  formValues: I_formValuesType,
  errorValues: Object,
  value: string,
  field: string,
  app: any
): void {
  formValues[field] = value

  const criteriaValidate = {
    email: () => validateEmail(formValues[field], errorValues, field, app),
    password: () => validatePassword(formValues[field], errorValues, field, app),
    passwordConfirm: () =>
      validatePasswordConfirm(formValues[field], errorValues, field, formValues.password, app),
    phone: () => validatePhone(formValues[field], errorValues, field, app),
    name: () => validateName(formValues[field], errorValues, field, app),
    companyName: () => validateCompanyName(formValues[field], errorValues, field, app),
    usersCount: () => validateUserCount(formValues[field], errorValues, field, app),
    introduction: () => validateIntroduction(formValues[field], errorValues, field, app),
    requiredFilled: () => validateRequiredFilled(formValues[field], errorValues, field, app)
  }

  if (urlFormFieldName.includes(field)) {
    // validate form url
    validateUrl(formValues[field], errorValues, field, app)
  } else {
    // validate follow criteria
    criteriaValidate[field] === undefined
      ? validateRequiredFilled(formValues[field], errorValues, field, app)
      : criteriaValidate[field]()
  }
}
