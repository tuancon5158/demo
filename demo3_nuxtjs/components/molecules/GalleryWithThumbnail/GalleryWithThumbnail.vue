<template>
  <div class="galleryWithThumbnail">
    <img
      v-lazy="backgroundPath"
      class="galleryWithThumbnail_background"
      :alt="alt"
      width="522"
      height="522"
    />
    <div class="galleryWithThumbnail_thumbnail">
      <CurvedImage
        v-for="(item, index) in imageList"
        :key="index"
        class="galleryWithThumbnail_thumbnail_item"
        :alt="item.title"
        :path="item.thumbnailUrl"
      ></CurvedImage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@nuxtjs/composition-api'
import CurvedImage from '~/components/atoms/Image/CurvedImage.vue'

export interface I_GalleryWithThumbnailElement {
  title?: string
  thumbnailUrl?: string
}

export default defineComponent({
  name: 'GalleryWithThumbnail',

  components: {
    CurvedImage
  },

  props: {
    backgroundPath: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    imageList: {
      type: Array as PropType<I_GalleryWithThumbnailElement[]>,
      required: true
    }
  },

  setup(_, context: SetupContext) {
    const { $config } = context.root

    return {
      // getThumbnailUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.galleryWithThumbnail {
  position: relative;
  border-radius: $galleryWithThumbnail_BorderRadius;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 566px;
  width: 100%;
  aspect-ratio: 1/1;
  transition: all 0.5s;

  @include max-screen(1110px) {
    width: 100%;
    border-radius: 20%;
    margin: 0 auto;
  }

  @include mb() {
    width: 100%;
    border-radius: $galleryWithThumbnail_BorderRadius_sp;
  }

  &_background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transition: all 0.5s;
  }

  &_thumbnail {
    display: flex;
    opacity: 0;
    transition: all 0.5s;
    width: 100%;
    justify-content: center;
    z-index: 2;

    &_item {
      width: 124px;
      aspect-ratio: 1/1;
      margin: 0 $spacing_2x;

      @include mb() {
        width: 45%;
        margin: 0 $spacing_1x;
      }
    }
  }

  &:hover {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.6);

    & .galleryWithThumbnail {
      // darken blur background
      &_background {
        -webkit-filter: blur(3px) brightness(50%);
        -moz-filter: blur(3px) brightness(50%);
        -o-filter: blur(3px) brightness(50%);
        -ms-filter: blur(3px) brightness(50%);
        filter: blur(3px) brightness(50%);
      }

      // gallery thumbnail appear
      &_thumbnail {
        opacity: 1;
        padding: 0 $spacing_2x;

        @include mb() {
          padding: 0 $spacing_1x;
        }
      }
    }
  }
}
</style>
