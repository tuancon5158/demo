<template>
  <component :is="tag" :id="id" class="textMainVisual" :class="classes"></component>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'

interface TextMainVisualProps {
  tag: string
  type: string
  title: string
  id: string
  position: string
  color: string
}

export default defineComponent({
  name: 'TextMainVisual',

  props: {
    tag: {
      type: String,
      default: 'p'
    },
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return [
          'default',
          'heading',
          'subTitle',
          'title',
          'accorditionTitle',
          'imageBoxTitle',
          'heroTitle'
        ].includes(value)
      }
    },
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'right', 'center'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'black'].includes(value)
      }
    }
  },

  setup(props: TextMainVisualProps) {
    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type,
        [`-position--${props.position}`]: props.position,
        [`-color--${props.color}`]: props.color
      }
    })

    onMounted(() => {
      const html = document.querySelector<HTMLElement>(`#${props.id}`)
      const animationDelay = 20
      let content = ''

      for (let index = 0; index < props.title.length; index++) {
        if (props.title[index] === ' ') {
          content += '<span style="display: inline;"> </span>'
        } else {
          content += `<span>${props.title[index]}</span>`
        }
      }

      if (html) html.innerHTML = content

      if (['subTitle', 'title'].includes(props.type)) {
        return
      }

      const length = html?.children.length || 0

      for (let index = 0; index < length; index++) {
        if (html) {
          const element = html.children[index] as HTMLElement

          element.style['animation-delay'] = `${animationDelay * index}ms`
        }
      }
    })

    return {
      classes
    }
  }
})
</script>
<style lang="scss" scoped>
.textMainVisual {
  &.-type {
    &--default {
      overflow: hidden;
      font-weight: $font_weight_normal;
      @include fz($font_size_standard);
      margin: 0;
      word-break: break-word;
      display: inline;

      @include mb() {
        @include fz($font_size_xsmall);
      }

      /deep/ span {
        word-break: break-word;
        // display: inline-block;
        animation: opacityDrop 2s both;
      }
    }

    &--accorditionTitle {
      overflow: hidden;
      font-weight: $font_weight_normal;
      @include fz($font_size_large);
      word-break: break-word;

      @include mb() {
        @include fz($font_size_medium);
      }

      /deep/ span {
        word-break: break-word;
        // display: inline-block;
        animation: opacityDrop 2s both;
      }
    }

    &--imageBoxTitle {
      overflow: hidden;
      word-break: break-word;

      /deep/ span {
        word-break: break-word;
        //  display: inline-block;
        animation: opacityDrop 0.75s both;
      }
    }

    &--heading {
      overflow: hidden;
      font-weight: $font_weight_black;
      animation-name: bright;
      animation-duration: 4s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      margin: 0;
      word-break: break-word;

      @include pc() {
        @include fz($font_size_xxlarge);
      }

      @include mb() {
        @include fz($font_size_xxlarge_mb);
      }

      @include screen(769px, 1225px) {
        height: auto;
        font-size: 5.6vw;
      }

      /deep/ span {
        word-break: break-word;
        display: inline-block;
        opacity: 0;
        transform: translate(0, 30px) scale(0.8);
        animation: revolveDrop 1.5s both;
      }
    }

    &--subTitle {
      word-break: break-word;
      @include fz($font_size_standard);

      @include mb() {
        @include fz($font_size_xsmall);
      }

      /deep/ span {
        word-break: break-word;
        display: inline-block;
        opacity: 0;
        transform: translate(0, 30px);
        animation: bottomToTop 2s both;
      }
    }

    &--title {
      word-break: break-word;
      font-weight: $font_weight_bold;
      margin: 0;
      @include fz($font_size_large);
      margin-bottom: $spacing_14x;

      @include mb() {
        @include fz($font_size_medium);
        margin-bottom: $spacing_6x;
      }

      /deep/ span {
        word-break: break-word;
        display: inline-block;
        opacity: 0;
        transform: translate(0, 30px);
        animation: bottomToTop 2s both;
      }
    }

    &--heroTitle {
      /deep/ span {
        word-break: break-word;
        display: inline-block;
        opacity: 0;
        transform: translate(0, 30px) scale(0.8);
        animation: revolveDrop 1.5s both;
      }
    }
  }

  &.-position {
    &--center {
      text-align: center;
    }
  }

  &.-color {
    &--white {
      color: $color_white;
    }

    &--black {
      color: $color_black;
    }
  }
}

@keyframes revolveDrop {
  0% {
    transform: translate(0, 30px) scale(0.8);
  }

  100% {
    transform: translate(0) scale(1);
    opacity: 1;
  }
}

@keyframes opacityDrop {
  0% {
    opacity: 0;
  }

  70% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes bottomToTop {
  0% {
    transform: translate(0, 30px);
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}

@keyframes bright {
  0% {
    text-shadow: 0;
  }

  35% {
    text-shadow: 0 0 11px rgba(255, 255, 255, 0.5);
  }

  50% {
    text-shadow: 0 0 11px rgba(255, 255, 255, 0.6);
  }

  65% {
    text-shadow: 0 0 11px rgba(255, 255, 255, 0.5);
  }

  100% {
    text-shadow: 0;
  }
}
</style>
