<template>
  <section class="forCreatorBusinessCTABanner">
    <div v-if="title" class="forCreatorBusinessCTABanner_inner">
      <p class="forCreatorBusinessCTABanner_text">{{ title }}</p>
      <p v-html="description" class="forCreatorBusinessCTABanner_description" />
    </div>
    <div class="forCreatorBusinessCTABanner_wrapperButton">
      <CTAButton
        class="forCreatorBusinessCTABanner_button"
        type="outline"
        icon
        icon-color="white"
        :label="buttonLabel"
        :link="link"
      />
    </div>
    <img v-lazy="require(`~/assets/images/${image}`)" :alt="title" width="1440" height="531" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CTAButton from '~/components/atoms/Button/CTAButton.vue'

export default defineComponent({
  name: 'ForCreatorBusinessCTABanner',

  components: {
    CTAButton
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    buttonLabel: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.forCreatorBusinessCTABanner {
  position: relative;
  color: $color_white;
  padding: $spacing_14x $spacing_8x $spacing_24x;

  @include mb() {
    padding: $spacing_8x $spacing_4x $spacing_14x;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    position: absolute;
  }

  &_inner {
    position: relative;
    margin-bottom: $spacing_14x;
    z-index: 1;
    @include mb() {
      margin-bottom: $spacing_20x;
    }
  }

  &_text {
    max-width: 104.5rem;
    font-weight: $font_weight_bold;
    @include fz($font_size_xlarge);
    color: $color_white;
    margin: 0 auto;
    margin-bottom: $spacing_10x;

    @include mb() {
      margin-bottom: $spacing_6x;
      @include fz($font_size_medium);
    }
  }

  &_description {
    max-width: 104.5rem;
    margin: 0 auto $spacing_14x;
    @include fz($font_size_medium);
    font-weight: $font_weight_bold;
    color: $color_white;
    line-height: 2;

    @include mb() {
      @include fz($font_size_xsmall);
    }
  }

  &_wrapperButton {
    display: flex;
    justify-content: center;

    @include mb() {
      margin: 0 1.6rem;
    }
  }

  &_button {
    @include mb() {
      min-width: auto !important;
      width: 100%;
    }
  }
}
</style>
