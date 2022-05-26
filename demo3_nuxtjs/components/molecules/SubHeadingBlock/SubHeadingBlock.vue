<template>
  <div class="subHeadingBlock" :class="classes">
    <div class="subHeadingBlock_wrapper">
      <div
        v-observe-visibility="{
          callback: visibilityChanged,
          once: false
        }"
        class="subHeadingBlock_title mask-elem"
      >
        <div>
          <span v-html="title[0].line1" />
        </div>
        <div>
          <span v-if="title[0].line2" v-html="title[0].line2" />
        </div>
      </div>
      <div v-if="description" class="subHeadingBlock_description" v-html="description"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext } from '@nuxtjs/composition-api'

interface SubHeadingBlockProps {
  bgColor: string
  position: string
  title: string
  description: string
}

export default defineComponent({
  name: 'SubHeadingBlock',
  props: {
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'white_gradient'].includes(value)
      }
    },
    position: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'right'].includes(value)
      }
    },
    title: {
      type: [String, Array],
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup(props: SubHeadingBlockProps, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-position--${props.position}`]: props.position
      }
    })

    const visibilityChanged = (isVisible: boolean, entry) => {
      if (isVisible) {
        context.emit('visibilityChanged', isVisible, entry, 600)
      }
    }

    return {
      classes,
      visibilityChanged
    }
  }
})
</script>
<style lang="scss" scoped>
.subHeadingBlock {
  position: relative;
  max-width: 100%;
  background-color: $color-white;

  @include mb() {
    max-width: 100%;
    height: auto;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 150px;
    background-color: $color-white;

    @include mb() {
      height: 75px;
    }
  }

  &.-bgColor {
    &--white {
      background: $color-white;
    }
    &--white_gradient {
      background: $color_white_gradient;
    }
  }

  &.-position {
    &--left {
      padding-left: 120px;

      @include mb() {
        padding: 0 $spacing_4x;
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xxl)) {
        padding: 0 $spacing_8x;
      }
    }

    &--right {
      padding-left: calc(
        ((100% - #{$default_contents_W}) / 2) + (100% - #{$default_contents_W}) / 2 - 120px
      );

      @include mb() {
        padding: 0 $spacing_4x;
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xxl)) {
        padding: 0 $spacing_8x;
      }
    }
  }

  &_wrapper {
    position: relative;
    top: -37px;
    height: calc(100% + 37px);
    max-width: $dashboard_contents_W;

    @include mb() {
      top: -24px;
      height: calc(100% + 24px);
    }
  }

  &_title {
    font-weight: $font_weight_black;
    @include fz($font_size_xlarge);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;

    @include mb() {
      font-weight: $font_weight_bold;
      @include fz($font_size_xlarge_mb);
      line-height: 1.6;
    }

    span {
      background: $color_black_gradient_2;
      display: inline;
      padding: 0 $spacing_4x;
      color: $color-white;

      @include mb() {
        padding: 0;
      }
    }

    /deep/ span {
      &.-yellow {
        padding: 0;
        background: $color_yellow_gradient;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    }
  }

  &_description {
    margin-top: $spacing_10x;
    margin-bottom: 0;
    @include mb() {
      margin-top: $spacing_6x;
    }
  }
}
</style>
