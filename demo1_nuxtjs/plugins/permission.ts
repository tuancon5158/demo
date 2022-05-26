import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { permissionGroup } from '@/config/permission-group'
import { IStaff } from '@/interfaces/staff'

export default defineNuxtPlugin((context, inject) => {
  const getUser = () => context.$auth.user as unknown as IStaff

  const getTitles = () => {
    const titles = getUser().titles || []

    return titles.map(title => title.id)
  }

  const hasTitle = (permissions: number[]) => {
    const titleIds = getTitles()

    return permissions.some(permission => {
      return titleIds.includes(permission)
    })
  }

  const isAdmin = () => hasTitle(permissionGroup.admin)

  const isManage = () => hasTitle(permissionGroup.manage)

  const isMember = () => !isAdmin() && !isManage()

  inject('isAdmin', isAdmin)
  inject('isManage', isManage)
  inject('isMember', isMember)
})
