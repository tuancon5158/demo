import { ref, useContext, ComputedRef } from '@nuxtjs/composition-api'
import { injectNotification } from './useGlobalNotification'
import { injectWorkspace } from './useGlobalWorkspaceInfo'
import { workspaceType } from '~/constants/workspace'
import { memberRole } from '~/constants/userRole'
import { injectMember } from '~/composables'
import { I_Response_Type, I_Get_Info_Plan_Response_Data } from '~/types/schema/response'

export const useGetInfoPlan = () => {
  const { app } = useContext()
  const {
    getWorkspaceId,
    getWorkspaceInfo
  }: { getWorkspaceId: ComputedRef<string | undefined>; getWorkspaceInfo: ComputedRef } =
    injectWorkspace()
  const isDataExist = ref(false)
  const setNotiState = injectNotification()

  const { getMemberInfo } = injectMember()

  const licenseList = ref([
    {
      name: app.i18n.t('license.item.boxTitle1'),
      subtitle: ''
      // TODO: 問い合わせリンク一旦非表示
      // nameLink: app.i18n.t('license.item.boxTitleLink1'),
      // link: 'contact',
      // hash: '#contract'
    },
    {
      name: app.i18n.t('license.item.boxTitle2'),
      subtitle: '',
      nameLink: app.i18n.t('license.item.boxTitleLink2'),
      link: 'contact',
      hash: '#contract'
    },
    {
      name: app.i18n.t('license.item.boxTitle3'),
      subtitle: '',
      nameLink: app.i18n.t('license.item.boxTitleLink3'),
      link: 'contact',
      hash: '#contract'
    },
    {
      name: app.i18n.t('license.item.boxTitle4'),
      subtitle: ''
    }
  ])

  // get information plan
  const getInfoPlan = async () => {
    await app
      .$repository('plan')
      .getInfoPlan({
        workspaceId: getWorkspaceId.value
      })
      .then((response: I_Response_Type<I_Get_Info_Plan_Response_Data>) => {
        const {
          invoice,
          discount,
          maxAccount,
          maxDataVolume,
          planName,
          planNameEn,
          useAccount,
          useDataVolume
        } = response.data

        licenseList.value[0].subtitle = app.i18n.locale !== 'ja' ? planNameEn : planName
        licenseList.value[1].subtitle = `${useAccount.toLocaleString()}/${maxAccount.toLocaleString()}${app.i18n.t(
          'license.item.boxSubtitle'
        )}`
        licenseList.value[2].subtitle = `${useDataVolume.toLocaleString()}/${maxDataVolume.toLocaleString()}GB`
        licenseList.value[3].subtitle = `¥${Number(invoice).toLocaleString()}/${app.i18n.t(
          'license.item.boxTitleUnit'
        )}`

        // remove データ容量（Data usage） if  workspaces type is 1
        if (getWorkspaceInfo.value?.type === workspaceType.PERSONAL) {
          licenseList.value.splice(2, 1)
        }

        // remove 利用料金（Billing） if member_role id 3
        if (getMemberInfo.value?.memberRole === memberRole.MEMBER) {
          licenseList.value.pop()
        }
      })
      .catch(() => {
        setNotiState.setNotification(app.i18n.t('form.errorMessage.normal'), 'error')
      })
      .finally(() => {
        isDataExist.value = true
      })
  }

  return {
    getInfoPlan,
    licenseList,
    isDataExist
  }
}
