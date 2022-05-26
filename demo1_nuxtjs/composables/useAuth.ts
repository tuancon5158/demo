import { reactive, useContext } from '@nuxtjs/composition-api'
import { ICurrentUser } from '@/interfaces/user'

export const useAuth = () => {
  const context = useContext()

  const auth = context.$auth

  // @ts-ignore
  const user = reactive<ICurrentUser>(context.$auth.user)

  return { user, auth }
}
