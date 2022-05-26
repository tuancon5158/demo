<template>
  <div class="imageCard">
    <div class="imageCard_image">
      <img
        v-lazy="require(`@/assets/images/${path}`)"
        :class="{ '-show': isLoaded }"
        :alt="alt"
        width="684"
        height="549"
        @load="handleLoad"
      />
      <div v-if="!isLoaded" class="imageCard_image--skelton" />
    </div>
    <div class="imageCard_wrapper">
      <div class="imageCard_header">
        <p class="imageCard_header_title">
          {{ title }}
        </p>
        <div class="imageCard_header_user">
          <UserAvatar
            :image-path="require(`@/assets/images/${thumbnail}`)"
            size="xxsmall"
            :user-name="name"
            direction="horizontal"
          ></UserAvatar>
        </div>
      </div>
      <div class="imageCard_footer">
        <p>
          {{ content }}
        </p>
        <div class="imageCard_footer_bg"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import UserAvatar from '~/components/molecules/UserAvatar/UserAvatar.vue'

export default defineComponent({
  name: 'ImageCard',

  components: {
    UserAvatar
  },

  props: {
    path: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    thumbnail: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },

  setup() {
    const isLoaded = ref(false)

    // handle lazy load image
    const handleLoad = (): void => {
      setTimeout(() => {
        isLoaded.value = true
      }, 500)
    }

    return {
      isLoaded,
      handleLoad
    }
  }
})
</script>
<style lang="scss" scoped>
.imageCard {
  position: relative;
  overflow: hidden;

  &_image {
    display: none;

    &.-show {
      display: block;
    }

    @include aspect-ratio(684, 549);
    min-height: 77.4rem;

    &--skelton {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: block;
      background: linear-gradient(
        to right,
        lighten($color_gray_lighten1, 7%),
        $color_gray_lighten1,
        lighten($color_gray_lighten1, 7%)
      );
      background-size: 200%;
      background-position: left;
      animation: load 1s ease-out 0s infinite normal;
    }

    @include mb() {
      @include aspect-ratio(343, 356);
      min-height: 60rem;
    }
  }

  &_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-white;
    height: 22.5rem;
    transition: height 0.3s;
    display: flex;
    flex-direction: column;
    padding-bottom: $spacing_9x;

    &:hover {
      height: 55.9rem;
      @include mb() {
        height: 57.6rem;
      }

      .imageCard_footer {
        @include mb() {
          overflow-y: auto;
        }

        &_bg {
          @include mb() {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            background: $color_white_gradient_2;
            height: 70px;
          }
        }
      }
    }

    @include mb() {
      height: 24.4rem;
      padding-bottom: $spacing_6x;
    }
  }

  &_header {
    padding: $spacing_6x $spacing_14x $spacing_6x;
    @include mb() {
      padding: $spacing_6x $spacing_4x $spacing_4x;
    }
    &_title {
      @include fz($font_size_large);
      color: $color_gray_1000;
      margin: 0;
      margin-bottom: $spacing_1x;
      font-weight: $font_weight_bold;

      @include mb() {
        @include fz($font_size_medium);
      }
    }
  }

  &_footer {
    padding: 0 $spacing_14x;
    height: 100%;
    overflow: hidden;

    @include mb() {
      padding: 0 $spacing_4x;
    }

    p {
      @include fz($font_size_standard);
      margin: 0;
      letter-spacing: normal;
      text-align: left;
      color: $color_gray_1000;

      @include mb() {
        @include fz($font_size_xsmall);
      }
    }
  }
}
</style>
