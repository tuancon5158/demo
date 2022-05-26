<template>
  <div class="spaceCardOfWorkspace">
    <nuxt-link
      :to="localePath({ name: 'spaces-id', params: { id: dataSource.id || '' } })"
      class="spaceCardOfWorkspace_thumbnail"
    >
      <Label class="spaceCardOfWorkspace_thumbnail_label" v-bind="listRole[dataSource.role]" />
      <ImageLoader
        v-if="dataSource.thumbnailUrl"
        class="spaceCardOfWorkspace_thumbnail_image"
        width="100%"
        ratio-type="1"
        :alt="dataSource.title"
        :path="getThumbnailUrl(dataSource.thumbnailUrl)"
      />
    </nuxt-link>
    <div class="spaceCardOfWorkspace_info">
      <div class="spaceCardOfWorkspace_group">
        <p v-if="dataSource.title" class="spaceCardOfWorkspace_group_title">
          {{ dataSource.title }}
        </p>
        <div class="spaceCardOfWorkspace_group_option">
          <LoadMore
            ref="spaceDropdown"
            class="spaceCardOfWorkspace_group_loadmore"
            color="gray"
            @onClick="handleWorkSpaceDropdown"
          />
          <Dropdown
            v-closable="{
              exclude: ['spaceDropdown'],
              handler: 'onClickOutSizeSpace'
            }"
            class="spaceCardOfWorkspace_group_dropdown"
            :menu-items="menuWorkSpaceItems"
            :menu-selected="menuWorkSpaceSelected"
            :position="positionDropdown"
            @onEdit="handleEdit"
            @onLink="handleLink"
            @onDelete="handleDelete"
          />
        </div>
      </div>
      <template v-if="dataSource.role !== publishedStatusId.PRIVATE">
        <p v-if="$i18n.locale === 'en'" class="spaceCardOfWorkspace_date">
          {{ $t('spaceListDashboard.item.upload') }}&nbsp;
          {{ getYmd(dataSource.uploadAt) }}
        </p>
        <p v-if="$i18n.locale === 'ja'" class="spaceCardOfWorkspace_date">
          {{ getYmd(dataSource.uploadAt) }}{{ $t('spaceListDashboard.item.upload') }}
        </p>
      </template>
    </div>
    <transition name="fade">
      <InstanceUrlModal
        v-if="visibleInstanceUrl"
        :data-source="instanceUrlResult"
        @onClose="handleCloseInstanceUrl"
      />
    </transition>
    <transition name="fade">
      <Dialogue
        v-if="visibleDialogue"
        is-delete
        :title="$t('spaceListDashboard.dialogue.title')"
        :back-button="$t('spaceListDashboard.dialogue.backButton')"
        :confirm-button="$t('spaceListDashboard.dialogue.confirmButton')"
        @onClose="handleCloseModal"
        @onValidate="handleConfirmModal"
      />
    </transition>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRouter,
  SetupContext,
  useContext,
  PropType,
  onMounted
} from '@nuxtjs/composition-api'
// components
import ImageLoader from '~/components/atoms/Image/ImageLoader.vue'
import Label from '~/components/atoms/Label/Label.vue'
import Dropdown from '~/components/molecules/Dropdown/Dropdown.vue'
import LoadMore from '~/components/molecules/LoadMore/LoadMore.vue'
import InstanceUrlModal from '~/components/organisms/Modal/InstanceUrlModal.vue'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'
// composables
import {
  useOpenCloseToggle,
  injectNotification,
  useErrorDisplay,
  injectMember
} from '~/composables'
import { dateFormat } from '~/composables/utilities/dateFormat'
import { truncateFilter } from '~/composables/utilities/filters/truncate'
import { debounce } from '~/composables/utilities/debounce'
// constants
import { publishedStatusId } from '~/constants/spaces'
import { memberRole } from '~/constants/userRole'

const TIMER_DEBOUNCE = 500

interface I_InstanceParams {
  id: string
  expiredAt?: { format: 'date-time'; type: 'string' }
  workspaceId: string
}

interface I_DataSource {
  id: string
  role: number
  thumbnailUrl: string
  title: string
  uploadAt: { format: 'date-time'; type: 'string' }
  workspaceSpaceId: number
}

type SpaceCardProps = {
  dataSource: I_DataSource
  currentWorkspaceId: string
  index: number
  positionDropdown: string
}

export default defineComponent({
  name: 'SpaceCardOfWorkspace',

  components: {
    ImageLoader,
    LoadMore,
    Dropdown,
    Label,
    InstanceUrlModal,
    Dialogue
  },

  props: {
    dataSource: {
      type: Object as PropType<I_DataSource>,
      required: true
    },
    currentWorkspaceId: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    positionDropdown: {
      type: String,
      default: 'bottom'
    }
  },

  emits: ['onDelete'],

  setup(props: SpaceCardProps, context: SetupContext) {
    const { app } = useContext()
    const router = useRouter()
    const { $config } = context.root
    const instanceUrlResult = ref({})
    const { getMemberInfo } = injectMember()
    const truncateText = truncateFilter()

    const setNotiState = injectNotification()
    const { setError } = useErrorDisplay()

    // display role list
    const listRole = computed(() => {
      return {
        1: {
          bgColor: 'green',
          size: 'auto',
          labelColor: 'green',
          label: app.i18n.t('spaceListDashboard.item.limited'),
          rounded: 'small'
        },
        2: {
          bgColor: 'blue',
          size: 'auto',
          labelColor: 'blue',
          label: app.i18n.t('spaceListDashboard.item.open'),
          rounded: 'small'
        },
        0: {
          bgColor: 'red',
          size: 'auto',
          labelColor: 'red',
          label: app.i18n.t('spaceListDashboard.item.privately'),
          rounded: 'small'
        }
      }
    })

    const { getYmd } = dateFormat()

    /**
     * get thumbnail url based on config domain
     * @imageKey: <String> | url image
     */
    const getThumbnailUrl = (imageKey: string): string => {
      return `${$config.frontURL}/${imageKey}`
    }

    const {
      open: handleOpenDialogue,
      close: handleCloseDialogue,
      visible: visibleDialogue
    } = useOpenCloseToggle()

    const {
      open: handleOpenInstanceUrl,
      close: handleCloseInstanceUrl,
      visible: visibleInstanceUrl
    } = useOpenCloseToggle()

    const menuWorkSpaceSelected = ref(false)
    // handle show or hide value when data load more
    const handleWorkSpaceDropdown = () => {
      menuWorkSpaceSelected.value = !menuWorkSpaceSelected.value
    }
    const menuWorkSpaceItems = ref([
      {
        label: app.i18n.t('spaceListDashboard.edit'),
        icon: 'edit',
        action: 'onEdit'
      },
      {
        label: app.i18n.t('spaceListDashboard.invitationLink'),
        icon: 'link',
        action: 'onLink'
      },
      {
        label: app.i18n.t('spaceListDashboard.delete'),
        color: 'red',
        icon: 'delete',
        action: 'onDelete'
      }
    ])

    onMounted(() => {
      if (getMemberInfo.value?.memberRole === memberRole.MEMBER) {
        menuWorkSpaceItems.value = menuWorkSpaceItems.value.filter((_, index) => index === 1)
      }
    })

    // redirect to edit space
    const handleEdit = () => {
      router.push(
        app.localePath({
          path: `/dashboard/${props.currentWorkspaceId}/spaces/${props.dataSource.id}/edit`
        })
      )
      handleWorkSpaceDropdown()
    }

    // handle show modal to display instance belong spaces
    const handleLink = debounce(async () => {
      handleWorkSpaceDropdown()

      const params: I_InstanceParams = {
        id: props.dataSource.id,
        workspaceId: String(props.currentWorkspaceId)
      }

      await app
        .$repository('belongSpaces')
        .instanceBelongSpaces(params)
        .then((response) => {
          instanceUrlResult.value = response.data

          setTimeout(() => {
            visibleInstanceUrl.value ? handleCloseInstanceUrl() : handleOpenInstanceUrl()
          }, 300)
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key
          const errorResource = error.response?.data?.response.args.resource

          setError(errorKeyCode, errorResource)
        })
    }, TIMER_DEBOUNCE)

    // handle show modal to display confirm modal delete
    const handleDelete = () => {
      visibleDialogue.value ? handleCloseDialogue() : handleOpenDialogue()

      handleWorkSpaceDropdown()
    }

    // handle show modal confirm delete
    const handleConfirmModal = () => {
      handleCloseDialogue()
    }

    // handle click out size dropdown
    const onClickOutSizeSpace = () => {
      menuWorkSpaceSelected.value = false
    }

    // handle submit remove data when click button
    const handleCloseModal = debounce(async () => {
      await app
        .$repository('belongSpaces')
        .deleteBelongSpaces(props.dataSource.workspaceSpaceId)
        .then((response) => {
          instanceUrlResult.value = response.data
          setNotiState.setNotification(app.i18n.t('form.successMessage.deleted'), 'success')
          context.emit('onDelete', props.index)
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
        .finally(() => {
          handleCloseDialogue()
        })
    }, TIMER_DEBOUNCE)

    return {
      listRole,
      getThumbnailUrl,
      truncateText,
      getYmd,
      menuWorkSpaceSelected,
      handleWorkSpaceDropdown,
      visibleInstanceUrl,
      instanceUrlResult,
      menuWorkSpaceItems,
      handleEdit,
      handleLink,
      handleDelete,
      handleCloseInstanceUrl,
      visibleDialogue,
      handleConfirmModal,
      handleCloseModal,
      onClickOutSizeSpace,
      publishedStatusId
    }
  }
})
</script>

<style lang="scss" scoped>
$spaceCard_W: 300px;

.spaceCardOfWorkspace {
  // width: $spaceCard_W;
  background: $color_white;
  border: 1px solid $color_gray_200;
  border-radius: 6px;

  &_info {
    padding: $spacing_3x $spacing_4x;
  }

  &_thumbnail {
    position: relative;
    display: block;

    &_label {
      position: absolute;
      top: 8px;
      left: 8px;
      cursor: default;
      z-index: 1;
    }

    &_image {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      overflow: hidden;
    }
  }

  &_group {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &_title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      font-weight: $font_weight_medium;
      @include fz($font_size_s);
      line-height: 2.4rem;
      color: $color_gray_900;
      margin: 0;
    }

    &_option {
      position: relative;
    }

    &_loadmore {
      cursor: pointer;
    }

    &_dropdown {
      right: 0;
    }
  }

  &_date {
    @include fz($font_size_xxxs);
    line-height: 1.6rem;
    color: $color_gray_900;
    margin: $spacing_1x 0 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
