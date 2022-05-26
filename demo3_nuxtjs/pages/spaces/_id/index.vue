<template>
  <DefaultLayout :title="spaceDetail.title">
    <client-only>
      <!-- SPACE IMAGE COVER -->
      <SpaceCover
        :is-favorited="isFavorited"
        :is-instance-id="isInstanceId"
        :app-launcher-button="appLauncherButton"
        :title="spaceDetail.title"
        :cover-type="spaceDetail.coverType"
        :path="spaceDetail.coverDataValue"
        :deep-link="spaceDetail.deepLink"
        @onClickOpenComonyApp="handleOpenClickComonyApp"
        @onClickFavorite="handleClickFavorite"
        @onClickOpenShareModal="openShareModal"
      />

      <!-- AUTHOUR PROFILE -->
      <SectionContainer position="left" bg-color="black-gradient" columns="1">
        <template #column-1>
          <h3 class="spaceDetail_heading">{{ spaceDetail.title }}</h3>
          <UserProfile
            v-if="spaceDetailExists"
            :link="
              localePath({
                name: 'profile-workspace-id',
                params: { id: workspaceDetail.workspace.id }
              })
            "
            size="small"
            :name="workspaceDetail.workspace.name"
            :company-name="workspaceDetail.workspace.companyName"
            :company-url="workspaceDetail.workspace.companyUrl"
            :description="workspaceDetail.workspace.description"
            :thumbnail-url="
              getAvatarThumbnailUrl(
                workspaceDetail.workspace.thumbnailUrl,
                imageSizes.userThumbnail.small
              )
            "
          />
        </template>
      </SectionContainer>

      <!--SPACE DESCRIPTION -->
      <SectionContainer
        position="left"
        class="spaceDetail_description"
        bg-color="white-gradient"
        columns="1"
      >
        <template #column-1>
          <div v-html="spaceDetail.description" />
        </template>
      </SectionContainer>

      <!-- SPACE CTABANNER -->
      <section v-observe-visibility="slideItems">
        <div class="spaceDetail_CTABanner slide-in-item">
          <p class="spaceDetail_CTABanner_text">{{ spaceDetail.title }}</p>
          <CTAButton
            class="spaceDetail_CTABanner_button"
            v-if="appLauncherButton"
            :label="appLauncherButton.label"
            :disabled="appLauncherButton.isDisabled"
            icon
            @onClick="handleOpenClickComonyApp"
          />
          <div class="spaceDetail_CTABanner_background">
            <img
              class="spaceDetail_CTABanner_image"
              v-if="spaceDetail.coverDataValue && spaceDetail.coverType === 0"
              :src="createThumbnailUrl(spaceDetail.coverDataValue)"
              :alt="spaceDetail.title"
            />
            <iframe
              v-else
              class="spaceDetail_CTABanner_video"
              :src="createIframeUrl(spaceDetail.coverDataValue, spaceDetail.coverType)"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <AnimatedBackground>
        <template #contents>
          <!-- USER PROFILE -->
          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              intersection: { rootMargin: '50px' }
            }"
          >
            <div class="animatedDirection -left">
              <section class="spaceDetail_user heading">
                <UserProfile
                  v-if="spaceDetailExists"
                  :link="
                    localePath({
                      name: 'profile-workspace-id',
                      params: { id: workspaceDetail.workspace.id }
                    })
                  "
                  color="black"
                  :name="workspaceDetail.workspace.name"
                  :company-name="workspaceDetail.workspace.companyName"
                  :company-url="workspaceDetail.workspace.companyUrl"
                  :thumbnail-url="
                    getAvatarThumbnailUrl(
                      workspaceDetail.workspace.thumbnailUrl,
                      imageSizes.userThumbnail.medium
                    )
                  "
                  :description="workspaceDetail.workspace.description"
                />
              </section>
            </div>
          </div>

          <!-- GALLERY SLIDER -->
          <div
            v-if="authorOtherSpaceList.slice(0, 5).length > 0"
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              intersection: { rootMargin: '50px' }
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <SectionContainer
                class="spaceDetail_gallery imageBoxAnimated"
                bg-color="black-gradient"
                columns="1"
                full-width
                container-size="full"
              >
                <template #column-1>
                  <GallerySlider reverse :sliders="authorOtherSpaceList.slice(0, 5)" />
                  <LinkText
                    v-if="spaceDetailExists"
                    class="spaceDetail_link"
                    :link="
                      localePath({
                        name: 'profile-workspace-id',
                        params: { id: workspaceDetail.workspace.id }
                      })
                    "
                    :value="$t('spaceListLink')"
                    underline
                    color="white"
                    font-size="standard"
                  />
                </template>
              </SectionContainer>
            </div>
          </div>
        </template>
      </AnimatedBackground>

      <!-- MODAL -->
      <ShareModal v-if="isShareModal" :share-text="shareUrl" @onClose="closeShareModal" />
      <AppLaunchModal
        v-if="isAppLauncher"
        @onClose="handleClickCloseAppLaunch"
        @onClickOpenAppLaunch="handleOpenClickComonyApp"
      />
      <!-- keep for later -->
      <!-- <EmbedButtonModal
        v-if="isEmbedButtonModal"
        :space-id="spaceId"
        :anonymous="spaceDetail.anonymous"
        :short-link="spaceDetail.shortLink"
        :deep-link="spaceDetail.deepLink"
        @onClose="handleClickCloseEmbedButtonModal"
      /> -->
      <!-- <InstanceUrlModal
      v-if="isInstanceUrlModal"
      :data-source="instanceUrlResult"
      @onClose="handleClickCloseInstanceUrl"
    /> -->
    </client-only>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useAsync,
  useContext,
  useRouter,
  useRoute,
  onMounted,
  useMeta
} from '@nuxtjs/composition-api'
// conponents
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SpaceCover from '~/components/organisms/SpaceCover/SpaceCover.vue'
import ShareModal from '~/components/organisms/Modal/ShareModal.vue'
import EmbedButtonModal from '~/components/organisms/Modal/EmbedButtonModal.vue'
import AppLaunchModal from '~/components/organisms/Modal/AppLaunchModal.vue'
import InstanceUrlModal from '~/components/organisms/Modal/InstanceUrlModal.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import UserProfile from '~/components/organisms/UserProfile/UserProfile.vue'
import CTAButton from '~/components/atoms/Button/CTAButton.vue'
import AnimatedBackground from '~/components/atoms/AnimatedBackground/AnimatedBackground.vue'
import GallerySlider from '~/components/organisms/Slider/GallerySlider/GallerySlider.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
// type
import { I_SpaceDetailDTO, I_SpaceListRequest } from '~/types/schema/space'
// composables
import { truncateFilter } from '~/composables/utilities/filters/truncate'
import useAppLauncher from '~/composables/useAppLauncher'
// import { injectWorkspace } from '~/composables'
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
import { handleScroll } from '~/composables/utilities/scroll'
import { useOpenCloseToggle } from '~/composables'
import useCreateCoverPath from '~/composables/useCreateCoverPath'
// constant
import { publishedStatusId, spaceIdLength } from '~/constants/spaces'
import { imageSizes } from '~/constants/image-size'

export default defineComponent({
  name: 'SpaceDetail',

  components: {
    DefaultLayout,
    SpaceCover,
    ShareModal,
    EmbedButtonModal,
    AppLaunchModal,
    InstanceUrlModal,
    SectionContainer,
    UserProfile,
    CTAButton,
    AnimatedBackground,
    GallerySlider,
    LinkText
  },

  setup() {
    const { app, $auth, redirect } = useContext()
    const { title, meta } = useMeta()
    const router = useRouter()
    const route = useRoute()
    const truncateText = truncateFilter()

    const spaceIdQuery = computed(() => route.value.params.id)

    const isInstanceId = computed(() => {
      if (spaceIdQuery?.value?.length === spaceIdLength.SPACE_INSTANCE_ID_LENGTH) return true

      return false
    })

    // handle app launch modal
    const { close: closeAppLaunchModal, visible: isAppLaunchModal } = useOpenCloseToggle()

    // handle close app launch
    const handleClickCloseAppLaunch = () => {
      closeAppLaunchModal()
      closeAppLauncher()
    }

    // handle open / close Share modal
    const {
      open: openShareModal,
      close: closeShareModal,
      visible: isShareModal
    } = useOpenCloseToggle()

    // get user avatar
    const { getAvatarThumbnailUrl } = useCreateThumbnailPath()

    /// get cover path
    const { createIframeUrl, createThumbnailUrl } = useCreateCoverPath()

    // space detail
    const spaceDetail = ref<I_SpaceDetailDTO>({})
    // author Id
    const authorId = ref(0)
    // if added favorite list
    const isFavorited = ref(false)
    // author detail
    const authorDetail = ref()
    // workspace detail
    const workspaceDetail = ref()

    // call space detail in ssr
    useAsync(async () => {
      // fetch space detail
      if (spaceIdQuery.value) {
        spaceDetail.value = await app
          .$repository('spaces')
          .getDetail(spaceIdQuery.value)
          .then((response) => {
            // set meta
            title.value = `${response.data.title} | comony`
            meta.value = [
              {
                hid: 'description',
                name: 'description',
                content: truncateText(
                  response.data.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
                  '200',
                  '..'
                )
              },
              {
                hid: 'og:title',
                property: 'og:title',
                content: `${response.data.title} | comony`
              },
              {
                hid: 'og:description',
                property: 'og:description',
                content: truncateText(
                  response.data.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
                  '200',
                  '..'
                )
              },
              {
                hid: 'og:url',
                property: 'og:url',
                content: `${app.$config.frontURL}${route.value.fullPath}`
              },
              {
                hid: 'og:image',
                property: 'og:image',
                content: `${app.$config.frontURL}/${response.data.thumbnailUrl}`
              },
              {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: `${response.data.title} | comony`
              },
              {
                hid: 'twitter:description',
                property: 'twitter:description',
                content: truncateText(
                  response.data.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
                  '200',
                  '..'
                )
              },
              {
                hid: 'twitter:image',
                property: 'twitter:image',
                content: `${app.$config.frontURL}/${response.data.thumbnailUrl}`
              }
            ]

            // get author information when roleId is 1
            isFavorited.value = response.data.isFavorited
            authorDetail.value = response.data.userSpaces.find((item) => item.roleId === 1)
            authorId.value = authorDetail.value.userId
            workspaceDetail.value = response.data.workspaceSpace[0]

            // is following or not
            fetchSpaceList(workspaceDetail.value?.workspace?.id)

            return response.data
          })
          .catch((error) => {
            const errorStatus = error.response?.status

            // [ssr] redirest 404 not found error page
            if (errorStatus === 404) {
              if (app.i18n.locale === 'ja') redirect('/error/404')
              else redirect('/en/error/404')
            }

            // [client side] redirest 403 forbidden error page
            if (process.client) {
              if (errorStatus === 403) {
                if (app.i18n.locale === 'ja') redirect('/error/403')
                else redirect('/en/error/403')
              }
            }
          })
      }
    })

    const shareUrl = ref('')

    onMounted(() => {
      // get share url
      if (route.value) {
        shareUrl.value = `${app.$config.frontURL}${route.value.fullPath}`
      }

      // Check ticket author
      spaceTicketCheckUser()

      // add viewer count
      addViewer()

      //  scroll to top after refresh
      window.scrollTo({ top: 0 })
    })

    // -------------- [GET] space tickets check user --------------
    const isTicketAuthor = ref(false)
    const spaceTicketCheckUser = () => {
      if ($auth.loggedIn) {
        app
          .$repository('spaceTickets')
          .checkAuthor(spaceIdQuery.value)
          .then((response) => {
            isTicketAuthor.value = response.data.havePermission
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

    const authorOtherSpaceList = ref([])
    // -------------- [GET] space list of the author --------------
    const fetchSpaceList = async (workspaceId: string) => {
      const requestParams: I_SpaceListRequest = {
        page: 1,
        sort: 'createdAt',
        publishedStatus: publishedStatusId.OPEN,
        direction: 'DESC',
        limit: 9,
        workspaceId: ''
      }

      requestParams.workspaceId = workspaceId

      // -------------- [GET] space list api --------------
      await app
        .$repository('spaces')
        .getList(requestParams)
        .then((response) => {
          // display space list except current one
          authorOtherSpaceList.value = response.data.list.filter(
            (item) => item.id !== spaceIdQuery.value
          )
        })
    }

    // -------------- Add Viewer - keep for later --------------
    const addViewer = () => {
      app.$repository('spaces').addViewer(spaceIdQuery.value)
    }

    // -------------- Add Favorite --------------
    const handleClickFavorite = (): void => {
      app
        .$repository('spaceFavorites')
        .add(spaceIdQuery.value)
        .then((response) => {
          isFavorited.value = response.data.isFavorited
        })
        .catch((error) => {
          const errorStatus = error.response?.status

          if (errorStatus === 401) {
            alert(app.i18n.t('form.errorMessage.forceLogin'))
            router.push(app.localePath('login'))
          }
        })
    }

    // -------------- open desktop application --------------
    const { closeAppLauncher, handleClickComonyApp, isAppLauncher } = useAppLauncher()

    const handleOpenClickComonyApp = () => {
      const comonyAppArguments = {
        spaceId: spaceIdQuery.value,
        haveEvent: spaceDetail.value?.spaceTicket?.haveEvent,
        eventNow: spaceDetail.value?.spaceTicket?.eventNow,
        isTicketAuthor: isTicketAuthor.value,
        anonymous: spaceDetail.value?.anonymous,
        shortLink: spaceDetail.value?.shortLink,
        deepLink: spaceDetail.value?.deepLink,
        isIframe: false
      }

      handleClickComonyApp(comonyAppArguments)
    }

    /**
     * !data.deepLinkがなかったら '準備中'
     * deepLinkがあったら
     * isTicketAuthor がtrueだったら comonyに入室する
     * isTicketAuthorがfalseだったら
     * haveEvent=true&&eventNow=trueだったら、イベント開催中
     * haveEvent=true&&eventNow=falseだったら、イベント準備中
     * haveEvent=falseだったら comonyに入室する
     */
    const appLauncherButton = computed(() => {
      // Whether the spatial data has been uploaded or not
      if (!spaceDetail.value.deepLink) {
        return {
          isDisabled: true,
          label: app.i18n.t('spaces.spaceNotUploaded') // 準備中
        }
      }

      if (isTicketAuthor) {
        // Ticket Author
        return {
          isDisabled: false,
          label: app.i18n.t('spaces.spaceEnterButton1') // この空間に入室する
        }
      }

      // Whether the ticket has been created or not
      if (spaceDetail.value.spaceTicket?.haveEvent) {
        // During the event
        if (spaceDetail.value.spaceTicket?.eventNow) {
          return {
            isDisabled: false,
            label: app.i18n.t('spaces.eventNowButton') // イベント開催中
          }
        }

        return {
          isDisabled: true,
          label: app.i18n.t('spaces.eventNotReadyButton') // イベント準備中
        }
      }

      return {
        isDisabled: false,
        label: app.i18n.t('spaces.spaceEnterButton1') // この空間に入室する
      }
    })

    // ---------- animation ----------
    const { slideItems, visibilityChangedArrows } = handleScroll()

    // check spaceDetail
    const spaceDetailExists = computed(() => {
      if (spaceDetail.value && spaceDetail.value.userSpaces && authorDetail.value) return true

      return false
    })

    // -------------- get Instance URL - keep for later --------------
    // const instanceUrlResult = ref({})
    // const handleClickInstanceUrl = async () => {
    //   await app
    //     .$repository('spaces')
    //     .instance(spaceIdQuery.value)
    //     .then((response) => {
    //       instanceUrlResult.value = response.data
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }

    // const { getWorkspaceId } = injectWorkspace()

    // -------------- Go to Space Edit page - keep for later  --------------
    // const handleClickSpaceEdit = () => {
    //   router.push(
    //     app.localePath({
    //       path: `/dashboard/${getWorkspaceId.value}/spaces/${spaceIdQuery.value}/edit`
    //     })
    //   )
    // }

    return {
      imageSizes,
      authorOtherSpaceList,
      spaceDetail,
      isTicketAuthor,
      spaceIdQuery,
      shareUrl,
      isFavorited,
      authorId,
      isInstanceId,
      isAppLauncher,
      appLauncherButton,
      spaceDetailExists,
      isAppLaunchModal,
      isShareModal,
      authorDetail,
      workspaceDetail,
      handleClickFavorite,
      closeAppLauncher,
      handleOpenClickComonyApp,
      openShareModal,
      closeShareModal,
      handleClickCloseAppLaunch,
      getAvatarThumbnailUrl,
      visibilityChangedArrows,
      slideItems,
      createThumbnailUrl,
      createIframeUrl
    }
  },

  head: {}
})
</script>

<style lang="scss" scoped>
.spaceDetail {
  &_heading {
    @include fz($font_size_xxl);
    font-weight: $font_weight_bold;
    margin-bottom: $spacing_10x;

    @include mb() {
      @include fz($font_size_m);
      margin-bottom: $spacing_8x;
    }
  }

  &_CTABanner {
    position: relative;
    color: $color_white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 49.3rem;
    width: 100%;

    @include mb() {
      padding: $spacing_8x;
      min-height: 22rem;
    }

    &_background {
      width: 100%;
      height: 100%;
      z-index: 1;
      position: absolute;

      &::before {
        z-index: 3;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color_gray_1000, 0.4);
        backdrop-filter: blur(5px);
      }
    }

    &_image,
    &_video {
      width: 100%;
      height: 100%;
    }

    &_image {
      object-fit: cover;
    }

    &_text {
      font-weight: $font_weight_bold;
      @include fz($font_size_large);
      color: $color_white;
      margin: 0;
      z-index: 2;
      margin-bottom: $spacing_8x;
      max-width: $default_contents_W;

      @include mb() {
        margin-bottom: $spacing_4x;
        @include fz($font_size_medium);
      }
    }

    &_button {
      z-index: 2;
    }
  }

  &_user {
    background: $color_white;
    padding: $spacing_14x $spacing_30x $spacing_14x calc((100% - #{$interview_contents_W}) / 2);
    margin: $spacing_31x calc((100% - #{$interview_contents_W}) / 2 - #{$spacing_30x}) 0 0;

    @include max-screen(map-get($breakpoints, lg)) {
      padding: $spacing_6x;
      width: 100%;
    }

    @include mb() {
      padding: $spacing_6x $spacing_4x;
      margin: $spacing_20x 0 0 0;
    }

    &_item {
      /deep/ & .userProfile_head {
        @include mb() {
          margin-bottom: $spacing_8x;
        }
      }
    }
  }

  &_link {
    margin-top: $spacing_14x;
    display: block;

    @include mb() {
      margin-top: $spacing_8x;
    }
  }

  &_description {
    line-height: $line_height_article;
    @include pc() {
      @include fz($font_size_s);
    }

    @include mb() {
      @include fz($font_size_xxxs);
    }

    // make image full width
    /deep/ img {
      width: 100%;
    }

    // make video full width and 16/9 aspect-ratio
    /deep/ iframe {
      aspect-ratio: 16/9;
      width: 100%;
    }
  }
}
</style>
