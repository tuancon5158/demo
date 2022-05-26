/// app any type is Vue but cannot use with i18
export function validateName(
  data: string,
  errorData: object,
  field: string = 'name',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length === 0) {
      errorData[field] = app.i18n.t('form.errorMessage.name')
    } else if (data.trim().length > 255) {
      errorData[field] = app.i18n.t('form.errorMessage.nameLimit')
    } else {
      errorData[field] = ''
    }
  }
}

export function validateCompanyName(
  data: string,
  errorData: object,
  field: string = 'companyName',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length === 0) {
      errorData[field] = app.i18n.t('form.errorMessage.company')
    } else if (data.trim().length > 255) {
      errorData[field] = app.i18n.t('form.errorMessage.companyLimit')
    } else {
      errorData[field] = ''
    }
  }
}

export function validateIntroduction(
  data: string,
  errorData: object,
  field: string = 'introduction',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length > 255) {
      errorData[field] = app.i18n.t('form.errorMessage.introductionLimit')
    } else {
      errorData[field] = ''
    }
  }
}

export function validateUrl(
  data: string,
  errorData: object,
  field: string = 'companyUrl',
  app: any
): void {
  const lc = data.toLowerCase().trim()
  const isValidate = lc.substring(0, 8) === 'https://' || lc.substring(0, 7) === 'http://'

  if (Object.keys(errorData).includes(field)) {
    // url form not required, but it field, validate it
    if (!isValidate || data.trim().length === 0) {
      errorData[field] = app.i18n.t('form.errorMessage.url')
    } else if (data.trim().length > 255) {
      errorData[field] = app.i18n.t('form.errorMessage.urlLimit')
    } else {
      errorData[field] = ''
    }
  }
}

export function validateUserCount(
  data: string,
  errorData: object,
  field: string = 'usersCount',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.trim().length === 0) {
      errorData[field] = app.i18n.t('form.errorMessage.usersCount')
    } else if (/\D/.test(data.trim())) {
      errorData[field] = app.i18n.t('form.errorMessage.usersCountNumber')
    } else if (Number(data.trim()) > 1000) {
      errorData[field] = app.i18n.t('form.errorMessage.usersCountMaxNumber')
    } else {
      errorData[field] = ''
    }
  }
}

export function validatePassword(
  data: string,
  errorData: object,
  field: string = 'password',
  app: any
): void {
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9])/)
  const regResult = regex.test(data)

  if (Object.keys(errorData).includes(field)) {
    if (regResult && data.trim().length >= 8) {
      errorData[field] = ''
    } else {
      errorData[field] = app.i18n.t('form.errorMessage.passwordInvalid')
    }
  }
}

export function validatePasswordConfirm(
  data: string,
  errorData: object,
  field: string = 'passwordConfirm',
  compareValue: string,
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data === compareValue) {
      errorData[field] = ''
    } else {
      errorData[field] = app.i18n.t('form.errorMessage.passwordConfirm')
    }
  }
}

export function validateEmail(
  data: string,
  errorData: object,
  field: string = 'email',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (/^[A-Za-z0-9]{1}[A-Za-z0-9_.+-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(data)) {
      errorData[field] = ''
    } else if (data.trim().length === 0) {
      errorData[field] = app.i18n.t('form.errorMessage.emailRequired')
    } else {
      errorData[field] = app.i18n.t('form.errorMessage.emailInvalid')
    }
  }
}

export function validateEmailConfirm(
  data: string,
  errorData: object,
  field: string = 'emailConfirm',
  conpareValue: string,
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data === conpareValue) {
      errorData[field] = ''
    } else {
      errorData[field] = app.i18n.t('form.errorMessage.emailConfirm')
    }
  }
}

export function validateDuplicate(
  list: any,
  tag: string,
  errorData: object,
  field: string = 'duplicate',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (list.some((item) => item.value === tag)) {
      errorData[field] = app.i18n.t('form.errorMessage.emailDuplicated')
    } else {
      errorData[field] = ''
    }
  }
}

export function validateLimit(
  count: any,
  limit: number,
  errorData: object,
  field: string = 'limit',
  app: any
): void {
  if (Object.keys(errorData).includes(field)) {
    if (limit <= count) {
      errorData[field] = app.i18n.t('form.errorMessage.emailLimit')
    } else {
      errorData[field] = ''
    }
  }
}

export function validatePhone(
  data: string,
  errorData: object,
  field: string = 'phone',
  app: any
): void {
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp(/^[0-9!-/:-@¥[-`{-~]*$/)
  const regResult = regex.test(data)

  if (Object.keys(errorData).includes(field)) {
    if (
      (data.toString().trim().length > 0 && data.toString().trim().length < 9) ||
      data.toString().trim().length > 11 ||
      !regResult
    ) {
      errorData[field] = app.i18n.t('form.errorMessage.phoneInvalid')
    } else if (data.toString().trim().length === 0) {
      errorData[field] = app.i18n.t('form.errorMessage.phoneRequired')
    } else {
      errorData[field] = ''
    }
  }
}

export function validateRequiredFilled(
  data: string | number,
  errorData: object,
  field: string,
  app: any,
  baseLocale: string = 'form.errorMessage'
): void {
  if (Object.keys(errorData).includes(field)) {
    if (data.toString().trim().length === 0) {
      const errorValue = app.i18n.t(`${baseLocale}.${field}`)

      if (errorValue.includes(`.${field}`)) errorData[field] = app.i18n.t('form.errorMessage.alert')
      else if (errorValue) {
        errorData[field] = errorValue
      }
    } else {
      errorData[field] = ''
    }
  }
}
