<template>
  <section class="appDownloadCTABanner" :class="classes">
    <div v-if="text" class="appDownloadCTABanner_inner">
      <AppLogo size="medium" direction="vertical" icon-color="#fff" />
      <p class="appDownloadCTABanner_text">{{ text }}</p>
      <AppDownloadButton has-link />
    </div>
    <CTAButton
      class="appDownloadCTABanner_button"
      type="default"
      :label="$t('appDownloadCTABanner.button')"
      icon
      icon-color="black"
      :link="link"
      text-change-hover
    />
    <img v-lazy="require(`~/assets/images/${image}`)" :alt="text" width="1440" height="493" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import AppLogo from '~/components/atoms/AppLogo/AppLogo.vue'
import CTAButton from '~/components/atoms/Button/CTAButton.vue'
import AppDownloadButton from '~/components/atoms/Button/AppDownloadButton.vue'

export interface I_AppDownloadCTABannerProps {
  text: string
  image: string
  link: string
}

export default defineComponent({
  name: 'AppDownloadCTABanner',

  components: {
    AppLogo,
    CTAButton,
    AppDownloadButton
  },

  props: {
    text: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },

  setup(props: I_AppDownloadCTABannerProps) {
    const classes = computed(() => {
      return {
        [`--hasText`]: props.text
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.appDownloadCTABanner {
  position: relative;
  color: $color_white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;

  &.--hasText {
    padding: $spacing_16x 0 $spacing_24x 0;

    @include mb() {
      padding: $spacing_14x $spacing_4x $spacing_14x;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
  }

  &_inner {
    z-index: 2;
    margin-bottom: $spacing_10x;
  }

  &_text {
    font-weight: $font_weight_bold;
    @include fz($font_size_large);
    line-height: 24px;
    color: $color_white;
    padding: $spacing_10x 0;
    margin: 0;

    @include mb() {
      padding-bottom: $spacing_8x;
      @include fz($font_size_medium);
    }
  }

  &_button {
    z-index: 2;
  }
}
</style>
