<template>
  <div class="formContainer" :class="classes">
    <slot v-if="explanationText" name="formExplanation" />
    <div class="formContainer_title">
      {{ title }}
      <!-- display explanation for cover -->
      <div
        v-if="explanationText"
        class="formContainer_explanation"
        @mouseover="$emit('onMouseover')"
        @mouseleave="$emit('onMouseleave')"
      >
        <img :src="require(`~/assets/images/icon/question-mark.svg`)" />
        <small class="formContainer_explanation_text">{{ explanationText }}</small>
      </div>
    </div>
    <div class="formContainer_contents">
      <slot name="formContents" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type FormContainerProps = {
  title: string
  size: string
  explanationText: string
}

export default defineComponent({
  name: 'FormContainer',

  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'large',
      validator: (value: string) => {
        return ['large', 'medium'].includes(value)
      }
    },
    explanationText: {
      type: String,
      default: ''
    }
  },

  setup(props: FormContainerProps) {
    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size
      }
    })

    return {
      classes
    }
  }
})
</script>
<style lang="scss" scoped>
.formContainer {
  position: relative;
  border: 1px solid $color_light_blue_200;
  border-radius: $formContainer_BorderRadius;
  max-width: 100%;
  background: $color_white;

  &.-size {
    &--large {
      max-width: $dashboard_contents_W;
    }

    &--medium {
      max-width: 63.2rem;
    }
  }

  &_title {
    padding: $spacing_5x;
    border-bottom: 1px solid $color_light_blue_200;
    @include fz($font_size_l);
    font-weight: $font_weight_medium;
    color: $color_gray_900;
    text-align: left;
  }

  &_explanation {
    position: relative;
    display: inline-block;
    align-items: center;
    margin-left: $spacing_4x;
    cursor: default;
    height: 100%;

    &_text {
      font-weight: 500;
      @include fz($font_size_xxxs);
      // line-height: 12px;
      text-decoration-line: underline;
      color: $color_explanationText;
    }
  }

  &_contents {
    @include pc() {
      padding: $spacing_6x $spacing_5x $spacing_8x;
    }

    @include mb() {
      padding: $spacing_5x;
    }
  }
}
</style>
