<template>
  <section class="spaceCover">
    <client-only>
      <transition name="fade">
        <div v-if="isLoading" class="spaceCover_loading">
          <Spinner size="medium" color="black" bg-color="white" />
        </div>
      </transition>

      <div v-if="coverType === 0" class="spaceCover_image">
        <img v-if="path" :src="createThumbnailUrl(path)" :alt="title" @load="onLoad" />
      </div>

      <div v-else class="spaceCover_iframe">
        <iframe :src="createIframeUrl(path, coverType)" allowfullscreen @load="onLoad"></iframe>
      </div>

      <CTAButton
        class="spaceCover_button"
        v-if="appLauncherButton"
        :label="appLauncherButton.label"
        :disabled="appLauncherButton.isDisabled"
        icon
        @onClick="handleClickOpenComonyApp"
      />
      <div class="spaceCover_footer">
        <button
          v-if="!isInstanceId"
          class="spaceCover_footer_item"
          :class="deepLink ? '' : '-disabled'"
          @click="handleClickFavorite"
        >
          <IconBase
            class="spaceCover_footer_icon"
            icon-color="#fff"
            width="22"
            height="20"
            viewBox="0 0 22 20"
          >
            <IconFavoriteSpace :is-favorited="isFavorited" />
          </IconBase>
          <span v-if="!isFavorited">{{ $t('spaces.favorite') }}</span>
          <span v-else>{{ $t('spaces.favoriteAdded') }}</span>
        </button>
        <button
          class="spaceCover_footer_item"
          :class="deepLink ? '' : '-disabled'"
          @click="handleOpenShareModal"
        >
          <IconBase
            class="spaceCover_footer_icon"
            icon-color="#fff"
            width="22"
            height="20"
            viewBox="0 0 22 20"
          >
            <IconShareSpace />
          </IconBase>
          <span>{{ $t('spaces.share') }}</span>
        </button>
      </div>
    </client-only>
  </section>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, PropType, useContext } from '@nuxtjs/composition-api'
import CTAButton from '~/components/atoms/Button/CTAButton.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconFavoriteSpace from '~/components/icons/IconFavoriteSpace.vue'
import IconShareSpace from '~/components/icons/IconShareSpace.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import useCreateCoverPath from '~/composables/useCreateCoverPath'

// props type
interface I_SpaceCoverProps {
  path: string
  title: string
  coverType: number
  deepLink: string
  isFavorited: boolean
  appLauncherButton: object
}

interface I_AppLauncherButton {
  isDisabled: boolean
  label: string
}

export default defineComponent({
  name: 'SpaceCover',

  components: {
    CTAButton,
    IconBase,
    IconFavoriteSpace,
    IconShareSpace,
    Spinner
  },

  props: {
    path: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    coverType: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return [0, 1, 2, 3].includes(value)
      }
    },
    deepLink: {
      type: String,
      default: ''
    },
    isFavorited: {
      type: Boolean,
      default: false
    },
    isInstanceId: {
      type: Boolean,
      default: false
    },
    appLauncherButton: {
      type: Object as PropType<I_AppLauncherButton>,
      default: () => {}
    }
  },

  setup(props: I_SpaceCoverProps, context: SetupContext) {
    const { $config } = useContext()

    // handle load
    const isLoading = ref(true)
    const onLoad = () => {
      isLoading.value = false
    }

    // get cover path
    const { createIframeUrl, createThumbnailUrl } = useCreateCoverPath()

    // handle click favorite button
    const handleClickFavorite = () => {
      context.emit('onClickFavorite')
    }

    // handle click CTAButton
    const handleClickOpenComonyApp = () => {
      context.emit('onClickOpenComonyApp')
    }

    // handle click share button
    const handleOpenShareModal = () => {
      context.emit('onClickOpenShareModal')
    }

    return {
      isLoading,
      onLoad,
      createThumbnailUrl,
      createIframeUrl,
      handleClickOpenComonyApp,
      handleClickFavorite,
      handleOpenShareModal
    }
  }
})
</script>

<style scoped lang="scss">
.spaceCover {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: $color_gray_1000;

  @include pc() {
    height: 743px;
  }

  @include mb() {
    height: 457px;
  }

  &_image {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &_iframe {
    position: relative;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    height: 100%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &_button {
    position: absolute;
    bottom: 9.6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;

    @include mb() {
      bottom: 5.6rem;
    }
  }

  &_footer {
    position: absolute;
    z-index: 2;
    bottom: 0;
    background: rgba($color_gray_1000, 0.2);
    width: 100%;
    padding: $spacing_4x $spacing_6x;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @include mb() {
      justify-content: center;
      padding: $spacing_2x $spacing_4x;
    }

    &_item {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;
      color: $color_white;
      @include fz($font_size_standard);

      @include mb() {
        @include fz($font_size_xsmall);
      }

      &:not(:first-child) {
        margin-left: $spacing_11x;

        @include mb() {
          margin-left: $spacing_6x;
        }
      }

      &:hover {
        opacity: $opacity_hover;
      }

      &.-disabled {
        opacity: $opacity_hover;
        cursor: default;
        pointer-events: none;
      }
    }

    &_icon {
      margin-right: $spacing_4x;

      @include mb() {
        margin-right: $spacing_1x;
      }
    }
  }

  &_loading {
    position: absolute;
    z-index: 3;
    text-align: center;
    width: 100%;
    height: 100%;
    background: $color_black_gradient;
  }
}
</style>
