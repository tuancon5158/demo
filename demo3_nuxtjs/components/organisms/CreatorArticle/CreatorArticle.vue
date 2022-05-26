<template>
  <article
    v-observe-visibility="{
      callback: visibilityChanged
    }"
  >
    <div class="creatorArticle slide-in-item">
      <div class="creatorArticle_content">
        <h3 class="creatorArticle_content_heading">{{ heading }}</h3>
        <h4 class="creatorArticle_content_subHeading">{{ subHeading }}</h4>
        <p class="creatorArticle_content_text">
          {{ content }}
        </p>
        <LinkText
          :link="to"
          :value="link"
          class="creatorArticle_content_link"
          font-size="standard"
          color="white"
          underline
        />
      </div>
      <div class="creatorArticle_thumbnail">
        <GalleryWithThumbnail
          :background-path="backgroundPath"
          :alt="heading"
          :image-list="imageList"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import GalleryWithThumbnail, {
  I_GalleryWithThumbnailElement
} from '~/components/molecules/GalleryWithThumbnail/GalleryWithThumbnail.vue'

export interface CreatorArticle {
  heading: string
  subHeading: string
  content: string
  link: string
  to: string
}

export default defineComponent({
  name: 'CreatorArticle',

  components: {
    LinkText,
    GalleryWithThumbnail
  },

  props: {
    heading: {
      type: String,
      default: ''
    },
    subHeading: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: 'インタビューをもっと読む >'
    },
    to: {
      type: String,
      default: ''
    },
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
    const visibilityChanged = (isVisible: boolean, entry: object) => {
      if (isVisible) {
        context.emit('visibilityChanged', isVisible, entry)
      }
    }

    return {
      visibilityChanged
    }
  }
})
</script>

<style scoped lang="scss">
.creatorArticle {
  max-width: $dashboard_contents_W;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $color_white;

  @include mb() {
    margin: 0 auto;
    flex-direction: column-reverse;
    justify-content: center;
  }

  &_content {
    margin-right: $spacing_19x;

    @include max-screen(1110px) {
      width: 50%;
      margin: 0 $spacing_3x 0 0;
    }

    @include mb() {
      width: 100%;
      margin: 0 auto;
    }

    &_heading {
      @include fz($font_size_large);
      font-weight: $font_weight_bold;
      margin-bottom: $spacing_4x;

      @include mb() {
        @include fz($font_size_medium);
        margin-bottom: $spacing_2x;
      }
    }

    &_subHeading {
      @include fz($font_size_small);

      @include mb() {
        @include fz($font_size_xxsmall);
      }
    }

    &_text {
      @include fz($font_size_small);
      word-break: break-word;
      margin: $spacing_10x 0;
      line-height: 1.8;

      @include mb() {
        @include fz($font_size_xsmall);
        margin: $spacing_6x 0 $spacing_8x;
      }
    }

    &_link {
      float: right;

      @include mb() {
        font-size: $font_size_xsmall !important;
      }
    }
  }

  &_thumbnail {
    width: 50%;
    flex: 0 0 auto;

    @include mb() {
      width: 100%;
      margin: 0 auto $spacing_4x;
    }
  }
}
</style>
