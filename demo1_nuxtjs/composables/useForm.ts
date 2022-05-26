import { SetupContext } from '@nuxtjs/composition-api'
import { FormModel } from 'ant-design-vue'

export const useForm = (context: SetupContext, formName = 'formRef') => {
  const validate = () => {
    const formRef = context.refs[formName] as FormModel

    return formRef.validate()
  }

  const clearValidate = (props: string[] | string) => {
    const formRef = context.refs[formName] as FormModel

    return formRef.clearValidate(props)
  }

  return { validate, clearValidate }
}
