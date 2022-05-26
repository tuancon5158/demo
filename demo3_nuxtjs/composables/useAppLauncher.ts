import { ref, useContext, useRouter } from '@nuxtjs/composition-api'
import { useFetchUser } from '~/composables'

const useAppLauncher = () => {
  const { app, $auth } = useContext()
  const router = useRouter()

  // open desktop application
  const { fetchUser, isLoggedIn } = useFetchUser()
  const isAppLauncher = ref(false)

  // close app-launcher modal
  const closeAppLauncher = () => {
    isAppLauncher.value = false
  }

  /**
   * Check if user can enter the room or not (入室前チェック)
   * @param: spaceId<string>
   * @param: haveEvent<boolean>
   * @param: eventNow<boolean>
   * @param: isTicketAuthor<boolean>
   * @param: anonymous<boolean>
   * @param: shortLink<string>
   * @param: deepLink<string>
   * @param: isIframe<boolean>
   */
  const handleClickComonyApp = async (args) => {
    // イベント持ってる
    if (args.haveEvent) {
      // イベント作成者
      if (args.isTicketAuthor) {
        // login check
        await fetchUser()

        checkLoggedInAndOpenApp(args.shortLink, args.deepLink, args.isIframe)
      } else if (!args.isTicketAuthor) {
        // イベント準備中
        if (!args.eventNow) {
          // comonyに入室できません。再度お試しください。
          alert(app.i18n.t('spaces.event.unPermission'))
        } else {
          // イベント開催中
          await fetchUser()

          if (!isLoggedIn.value) {
            alert(app.i18n.t('form.errorMessage.forceLogin'))

            if (!args.isIframe) router.push(app.localePath('login'))
            else window.open(`${app.$config.frontURL}/login`)
          } else {
            // 支払いチェック
            checkIsPaid(args.spaceId, args.shortLink, args.deepLink)
          }
        }
      }
    } else if (!args.haveEvent && args.anonymous !== 0) {
      // イベントなしの普通の空間 anonymousで誰でも入れる空間
      // available anonymous access

      openShortOrDeepLink(args.shortLink, args.deepLink)
      isAppLauncher.value = true
    } else {
      // login check
      checkLoggedInAndOpenApp(args.shortLink, args.deepLink, args.isIframe)
    }
  }

  /**
   * 入室前のログインチェック
   * @param: shortLink<string>
   * @param: deepLink<string>
   * @param: isIframe<boolean>
   */
  const checkLoggedInAndOpenApp = async (shortLink, deepLink, isIframe) => {
    await fetchUser()

    if (!isLoggedIn.value) {
      alert(app.i18n.t('form.errorMessage.forceLogin'))

      if (!isIframe) router.push(app.localePath('login'))
      else window.open(`${app.$config.frontURL}/login`)
    } else {
      openShortOrDeepLink(shortLink, deepLink)
      isAppLauncher.value = true
    }
  }

  /**
   * Open App（アプリを開く）
   * @param: shortLink<string>
   * @param: deepLink<string>
   */
  // create url: ex.comony://space_id/6wCb8zfN/token/XXX/lang/en
  const openShortOrDeepLink = (shortLink: string, deepLink: string) => {
    const currentLangStr = app.i18n.locale
    let myToken = ''

    // Tablet or Mobel
    if (app.$device.customIsMobileOrTablet) {
      window.location.href = shortLink || ''
    }

    // if available anonymous access
    if (!$auth.loggedIn) {
      // if selected lang is not japanese
      if (currentLangStr !== 'ja') {
        window.location.href = `${deepLink}/lang/${currentLangStr}` || ''
      } else {
        window.location.href = deepLink || ''
      }
    } else {
      // get token
      myToken = $auth.getToken('local').split(' ')[1]

      // if selected lang is not japanese
      if (currentLangStr !== 'ja') {
        window.location.href = `${deepLink}/token/${myToken}/lang/${currentLangStr}` || ''
      } else {
        window.location.href = `${deepLink}/token/${myToken}` || ''
      }
    }
    // }
  }

  /**
   * Is Paid Check（支払いチェック）
   * @param: spaceId<string>
   * @param: shortLink<string>
   * @param: deepLink<string>
   */
  // TODO: レスポンス変わる予定
  const checkIsPaid = (spaceId, shortLink, deepLink) => {
    app.$api
      .post(`/v1/public/payment`, {
        id: $auth.user.id,
        space: spaceId
      })
      .then((response) => {
        const isPayment = response.data?.isPayment

        if (isPayment) {
          openShortOrDeepLink(shortLink, deepLink)
          isAppLauncher.value = true
        } else {
          alert(app.i18n.t('spaces.event.ticketUnPaid'))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    isAppLauncher,
    closeAppLauncher,
    handleClickComonyApp
  }
}

export default useAppLauncher
