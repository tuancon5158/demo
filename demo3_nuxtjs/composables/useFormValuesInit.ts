import { reactive, computed, ComputedRef } from '@nuxtjs/composition-api'
import { cloneDeep } from '~/composables/utilities'
interface I_ParamRequest {
  [key: string]: any
}

export const useFormValuesInit = (params: I_ParamRequest) => {
  const formValuesParams = cloneDeep(params)
  const formValues = reactive<I_ParamRequest>(formValuesParams)

  const msgErrorsParams = cloneDeep(params)
  const msgError = reactive<I_ParamRequest>(msgErrorsParams)

  const resetForm = () => {
    const keysForm = Object.keys(formValues)
    const keyError = Object.keys(msgError)

    keysForm.forEach((key: string) => {
      formValues[key] = ''
      // cover some key specific here
    })
    keyError.forEach((key: string) => {
      msgError[key] = ''
      // cover some key specific here
    })
  }

  // some input required filled (needFilled[]), some input validate only fill(validateWhenFilled[])
  const isDisableBtnWithCondition = (
    formValues: object,
    needFilled: string[],
    validateWhenFilled: string[] = []
  ): boolean => {
    const keyParams = Object.keys(params)

    keyParams.forEach((key: string) => {
      if (!needFilled.includes(key) && !validateWhenFilled.includes(key)) {
        msgError[key] = ''
      } else if (validateWhenFilled.includes(key)) {
        if (formValues[key].trim().length === 0) msgError[key] = ''
      }
    })

    const isAllMsgErrorEmpty: boolean = Object.values(msgError).every((value) => value === '')

    const isAllFormValuesNoEmpty: boolean = needFilled.every((item) => {
      /// Wysiwyg Text Editor return value with <div> <div> so need remove it to validate
      if (typeof formValues[item] === 'string' && formValues[item].includes('<p>')) {
        return formValues[item].substring(3, formValues[item].length - 4).trim().length !== 0
      } else {
        return typeof formValues[item] === 'string'
          ? formValues[item].trim().length !== 0
          : !!formValues[item]?.toString().trim().length === true
      }
    })

    // eslint-disable-next-line no-unused-expressions
    return isAllMsgErrorEmpty ? !isAllFormValuesNoEmpty : true
  }

  return {
    formValues,
    msgError,
    resetForm,
    isDisableBtnWithCondition
  }
}
