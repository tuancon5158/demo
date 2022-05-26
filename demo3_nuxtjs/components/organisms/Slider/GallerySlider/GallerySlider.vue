<template>
  <client-only>
    <div class="gallerySlider">
      <div class="gallerySlider_wrapper">
        <component
          :is="item.id ? 'nuxt-link' : 'div'"
          v-for="(item, index) in sliderList"
          :key="index"
          :class="index === 0 ? (reverse ? 'gallerySlider_first' : 'gallerySlider_reverse') : ''"
          :to="localePath(`/spaces/${item.id}`)"
        >
          <CurvedImage
            class="gallerySlider_item"
            :path="getSpaceThumbnailUrl(item.thumbnailUrl, imageSizes.spaceGallery.medium)"
            :alt="item.title ? item.title : 'space'"
          />
        </component>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, computed } from '@nuxtjs/composition-api'
// components
import CurvedImage from '~/components/atoms/Image/CurvedImage.vue'
// composables
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
// constants
import { imageSizes } from '~/constants/image-size'

// props type
interface GallerySliderProps {
  reverse: boolean
  sliders: GallerySliderProps[]
}

// slider type
export interface I_GallerySliderElement {
  thumbnailUrl?: string
  title?: string
}

export default defineComponent({
  name: 'GallerySlider',

  components: {
    CurvedImage
  },

  props: {
    sliders: {
      type: Array as PropType<I_GallerySliderElement[]>,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },

  setup(props: GallerySliderProps, context: SetupContext) {
    const { $config } = context.root

    const sliderList = computed(() => {
      if (props.sliders.length >= 5) {
        return [...props.sliders, ...props.sliders]
      }

      return [
        ...props.sliders,
        ...Array.from({ length: 5 - props.sliders.length }, () => 5 - props.sliders.length),
        ...props.sliders,
        ...Array.from({ length: 5 - props.sliders.length }, () => 5 - props.sliders.length)
      ]
    })

    // ---------------- get avatar image path ----------------
    const { getSpaceThumbnailUrl } = useCreateThumbnailPath()

    return {
      imageSizes,
      getSpaceThumbnailUrl,
      sliderList
    }
  }
})
</script>

<style lang="scss" scoped>
.gallerySlider {
  // display: flex;
  overflow: hidden;

  &_wrapper {
    height: 448px;
    width: 5740px;
    @include mb() {
      height: 197px;
      width: 2530px;
    }
  }

  &_first {
    animation: bannermove 60s linear infinite;
    @include mb() {
      animation: bannermovemb 60s linear infinite;
    }
  }

  &_reverse {
    animation: bannermove 60s linear infinite;
    animation-direction: reverse;
    @include mb() {
      animation: bannermovemb 60s linear infinite;
      animation-direction: reverse;
    }
  }

  a,
  div {
    display: inline-block;
  }

  &_item {
    float: left;
    height: 448px;
    padding: 0 $spacing_3x;
    width: 574px !important;

    @include mb() {
      height: 197px;
      padding: 0 $spacing_2x;
      width: 253px !important;
    }
  }
}

@keyframes bannermove {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -5744px;
  }
}

@keyframes bannermovemb {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -2528px;
  }
}
</style>
