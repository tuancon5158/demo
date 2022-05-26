<template>
  <DefaultLayout :title="userDetail.name" bg-color="blackGradient">
    <ProfileLayout
      :id="userDetail.id"
      :name="userDetail.name"
      :thumbnail-url="userDetail.thumbnailUrl"
      :description="userDetail.description"
      :company-url="userDetail.companyUrl"
      :facebook-url="userDetail.facebookUrl"
      :twitter-url="userDetail.twitterUrl"
      :instagram-url="userDetail.instagramUrl"
      is-navigation
    >
      <NuxtChild />
    </ProfileLayout>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  useFetch,
  useContext,
  useRoute,
  computed,
  useMeta
} from '@nuxtjs/composition-api'
// composables
import { truncateFilter } from '~/composables/utilities/filters/truncate'
// components
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import ProfileLayout from '~/components/organisms/Layout/ProfileLayout.vue'
// types
import { I_SpaceListDTO, I_SpaceListRequest } from '~/types/schema/space'
// constants
import { publishedStatusId } from '~/constants/spaces'

export default defineComponent({
  name: 'Profile',

  components: {
    DefaultLayout,
    ProfileLayout
  },

  setup() {
    const { app, redirect } = useContext()
    const route = useRoute()
    const selectedUserId = computed(() => route.value.params.id || '')

    // request initial data
    const spacesParams: I_SpaceListRequest = reactive({
      page: 1,
      sort: 'createdAt',
      publishedStatus: publishedStatusId.OPEN,
      direction: 'DESC',
      limit: 12,
      userId: Number(route.value.params?.id) || 0
    })

    const isLoading = ref<boolean>(true)
    const isExistData = ref<boolean>(true)
    const spaceList = ref<I_SpaceListDTO[]>([])

    const fetchSpaceList = async () => {
      // set loading
      isLoading.value = true
      isExistData.value = true

      // call [GET] space list api
      await app
        .$repository('spaces')
        .getList(spacesParams)
        .then((response) => {
          // add space list to spaceList array
          if (response.data.list.length !== 0) {
            spaceList.value = [...spaceList.value, ...response.data.list]
          } else {
            isExistData.value = false
            spacesParams.page = 0
          }
        })

      isLoading.value = false
    }

    const visibilityChanged = () => {
      // add page number
      if (spacesParams.page) {
        spacesParams.page += 1
      }

      fetchSpaceList()
    }
    const userDetail = reactive({
      id: '',
      name: '',
      thumbnailUrl: '',
      companyName: '',
      companyUrl: '',
      description: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: ''
    })

    const fetchUsers = async () => {
      const userId: string = selectedUserId.value

      if (userId) {
        await app
          .$repository('users')
          .getUserDetail(userId)
          .then((response) => {
            userDetail.id = response.data.id
            userDetail.name = response.data.name
            userDetail.thumbnailUrl = response.data.thumbnailUrl
            userDetail.companyName = response.data.companyName
            userDetail.companyUrl = response.data.companyUrl
            userDetail.description = response.data.introduction
            userDetail.facebookUrl = response.data.facebookUrl
            userDetail.twitterUrl = response.data.twitterUrl
            userDetail.instagramUrl = response.data.instagramUrl

            fetchMeta()
          })
          .catch((error) => {
            const errorStatusCode = error.response?.data?.httpStatusCode

            if (errorStatusCode === 404) redirect('/error/404')
          })
      }
    }

    // execuse
    useFetch(fetchUsers)
    useFetch(fetchSpaceList)

    // set meta image
    const { title, meta } = useMeta()
    const truncateText = truncateFilter()

    const fetchMeta = () => {
      // meta descrpition settings
      const metaDescription = userDetail.description
        ? truncateText(
            userDetail.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
            '200',
            '..'
          )
        : app.i18n.t('meta.description')

      title.value = `${userDetail.name} | comony`
      meta.value = [
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${userDetail.name} | comony`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: metaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${app.$config.frontURL}${route.value.fullPath}`
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${userDetail.name} | comony`
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: metaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${app.$config.frontURL}/${userDetail.thumbnailUrl}`
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: `${app.$config.frontURL}/${userDetail.thumbnailUrl}`
        }
      ]
    }

    return {
      userDetail,
      spaceList,
      isLoading,
      isExistData,
      fetchSpaceList,
      visibilityChanged
    }
  },

  head: {}
})
</script>
