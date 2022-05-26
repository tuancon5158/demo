<template>
  <div class="spaceGallery">
    <div class="spaceGallery_wrapper">
      <div
        v-for="(item, index) in arrayData"
        :key="index"
        v-observe-visibility="{
          callback: slideThreeItem
        }"
        class="spaceGallery_wrapper_item"
      >
        <CurvedSpaceCard
          :thumbnail-url="getResizedSpaceImage(item.thumbnailUrl || '', index)"
          :label="item.isKey === 1 ? ($i18n.locale !== 'en' ? '会員限定' : 'Members only') : ''"
          :title="item.title"
          :workspace-id="item.workspaceSpace[0].workspace.id"
          :workspace-name="item.workspaceSpace[0].workspace.name"
          :description="item.description"
          :workspace-thumbnail-url="
            getResizedUserThumbnail(item.workspaceSpace[0].workspace.thumbnailUrl || '')
          "
          :to="localePath(`/spaces/${item.id}`)"
          :is-show-content="true"
          class="slide-in-item"
          :style="{
            'animation-delay': index < 13 ? index * 50 + 'ms' : (index - 13) * 50 + 'ms'
          }"
          :is-key="item.isKey"
          @onSignUp="handleSignUp"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, SetupContext, useContext } from '@nuxtjs/composition-api'
import CurvedSpaceCard from '~/components/molecules/CurvedSpaceCard/CurvedSpaceCard.vue'
import { handleScroll } from '~/composables/utilities/scroll'
import { imageSizes } from '~/constants/image-size'

interface I_SpaceGalleryList {
  thumbnailUrl: string
  userSpaces: Object
  title: string
  description: string
  category: { [key: string]: string }
}

export default defineComponent({
  name: 'SpaceGallery',

  components: {
    CurvedSpaceCard
  },

  props: {
    arrayData: {
      type: Array as PropType<I_SpaceGalleryList[]>,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    spaceContentList: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },

  setup(_, context: SetupContext) {
    const { $config } = useContext()

    // get resized image path
    const createResizedImage = (resize: number, imageKey: string): string => {
      if (resize) {
        return `${$config.frontURL}/${imageKey}?w=${resize}`
      }

      return `${$config.frontURL}/${imageKey}`
    }

    // get user thumbnail image path
    const getResizedUserThumbnail = (imageKey): string => {
      return createResizedImage(imageSizes.spaceGallery.thumbnail, imageKey)
    }

    // get space galley image path
    const largeSizeGalleryLocation = ref([0, 7, 12, 19])
    const largeSizeGalleryLocationMobile = ref([2, 5, 8, 11, 14, 17, 20, 23])

    const getResizedSpaceImage = (imageKey, index): string => {
      const breakpoint = 768
      const winddowW = window.innerWidth

      // Desktop
      if (winddowW >= breakpoint) {
        if (largeSizeGalleryLocation?.value.indexOf(index) !== -1) {
          return createResizedImage(imageSizes.spaceGallery.large, imageKey)
        } else {
          return createResizedImage(imageSizes.spaceGallery.medium, imageKey)
        }
      } else {
        // Mobile
        if (largeSizeGalleryLocationMobile?.value.indexOf(index) !== -1) {
          return createResizedImage(imageSizes.spaceGallery.mobileM, imageKey)
        } else {
          return createResizedImage(imageSizes.spaceGallery.mobileS, imageKey)
        }
      }
    }

    const { slideThreeItem } = handleScroll()

    const handleSignUp = () => {
      context.emit('onSignUp')
    }

    return {
      handleSignUp,
      getResizedUserThumbnail,
      getResizedSpaceImage,
      slideThreeItem,
      largeSizeGalleryLocation,
      largeSizeGalleryLocationMobile
    }
  }
})
</script>
<style lang="scss" scoped>
.spaceGallery {
  max-width: $space_contents_W;
  min-height: 715px;
  margin: auto;

  &_wrapper {
    display: grid;
    grid-auto-flow: dense;

    @include pc() {
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: auto;
      grid-gap: $spacing_6x;
      padding: $spacing_14x $spacing_6x $spacing_6x;
    }

    @include mb() {
      grid-template-columns: repeat(10, minmax(7px, 1fr));
      grid-gap: $spacing_4x;
      padding: $spacing_4x;
    }

    &_item {
      @include pc() {
        grid-column: span 4;
        grid-row: span 1;
      }

      @include mb() {
        grid-column: span 5;
        grid-row: span 1;
      }
    }

    :first-child,
    :nth-child(13),
    :nth-child(8),
    :nth-child(20) {
      &.spaceGallery_wrapper_item {
        @include pc() {
          grid-column: span 8;
          grid-row: span 2;
        }
      }
    }

    :nth-child(3),
    :nth-child(6),
    :nth-child(9),
    :nth-child(12),
    :nth-child(15),
    :nth-child(18),
    :nth-child(21),
    :nth-child(24) {
      &.spaceGallery_wrapper_item {
        @include mb() {
          grid-column: span 10;
          grid-row: span 1;
          grid-row: span 2;
        }
      }
    }
  }
}

.fade-in-enter-active {
  transition: all 0.7s ease-in;
}

.fade-in-leave-active {
  transition: all 0.7s ease-out;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
