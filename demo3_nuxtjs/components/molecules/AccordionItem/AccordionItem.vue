<template>
  <dl v-cloak class="accordionItem slide-in-item">
    <dt
      class="accordionItem_trigger"
      :class="[{ 'is-open': isOpened }, classes]"
      @click="accordionToggle()"
    >
      <!--eslint-disable-next-line-->
      <TextMainVisual
        v-if="showTitle && isScroll"
        :id="id"
        type="accorditionTitle"
        class="accordionItem_trigger_item"
        :title="accordionItem.question"
      />
      <div v-else class="accordionItem_trigger_item" v-html="accordionItem.question" />
      <img
        class="accordionItem_trigger_icon"
        :class="{ 'is-open': isOpened }"
        :width="20"
        :height="15"
        :src="require(`@/assets/images/icon/icon-arrow-up-down.svg`)"
        alt="icon"
      />
    </dt>
    <transition
      name="js-accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <dd v-if="isOpened" class="accordionItem_target" :class="{ 'is-open': isOpened }">
        <div :class="['accordionItem_contents', classes]">
          <!--eslint-disable-next-line-->
          <div v-html="accordionItem.answer" />
        </div>
      </dd>
    </transition>
  </dl>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed, watch } from '@nuxtjs/composition-api'
import TextMainVisual from '~/components/organisms/MainVisual/TextMainVisual.vue'

interface I_AccordionItemElement {
  question: string
  answer: string
}

// props type
type I_AccordionItemProps = {
  isScroll: boolean
  color: string
  accordionItem: object
  id: string
  showText: Boolean
}
export default defineComponent({
  name: 'AccordionItem',

  components: {
    TextMainVisual
  },

  props: {
    accordionItem: {
      type: Object as PropType<I_AccordionItemElement>,
      required: true
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['black', 'darkblue', 'transparent'].includes(value)
      }
    },
    id: {
      type: String,
      default: ''
    },
    showText: {
      type: Boolean,
      default: false
    }
  },

  setup(props: I_AccordionItemProps) {
    const isOpened = ref(false)
    const showTitle = ref(false)
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color
      }
    })

    const accordionToggle = () => {
      isOpened.value = !isOpened.value
    }

    const beforeEnter = (el: any) => {
      el.style.height = '0'
    }

    const enter = (el: any) => {
      el.style.height = `${el.scrollHeight}px`
    }

    const beforeLeave = (el: any) => {
      el.style.height = `${el.scrollHeight}px`
    }

    const leave = (el: any) => {
      el.style.height = '0'
    }

    watch(
      () => props.showText,
      (newVal) => {
        if (newVal) {
          showTitle.value = true
        }
      }
    )

    return {
      isOpened,
      classes,
      accordionToggle,
      beforeEnter,
      enter,
      beforeLeave,
      leave,
      showTitle
    }
  }
})
</script>

<style scoped lang="scss">
.accordionItem {
  margin-bottom: $spacing_14x;

  &:last-child {
    margin-bottom: 0;
  }

  &_trigger {
    position: relative;
    width: 100%;
    min-height: 143px;
    display: flex;
    align-items: center;
    font-weight: $font_weight_bold;
    cursor: pointer;
    background-color: $color_white;
    transition: all 0.2s ease-in;
    padding-left: $spacing_37x;
    @include fz($font_size_large);

    @include mb() {
      padding-left: $spacing_24x;
      min-height: 10rem;
      @include fz($font_size_medium);
    }

    &_item {
      word-break: break-word;
      margin: 0;
      margin-right: $spacing_16x;

      @include mb() {
        margin-right: $spacing_4x;
      }
    }

    &_icon {
      margin-left: auto;
      transition: all 0.2s ease-in;
      width: 20px;
      height: 20px;

      &.is-open {
        transform: rotate(180deg);
        transition: all 0.2s ease-in;
      }
    }

    &.-color {
      &--transparent {
        background-color: transparent;
        color: $color_white;
      }
    }

    &:hover {
      opacity: 0.7;
    }

    &::after {
      position: absolute;
      content: 'Q';
      font-size: 157px;
      font-weight: 100;
      line-height: 1;
      top: 50%;
      left: 0;
      transform: translate(0, -60%);

      @include mb() {
        font-size: 100px;
      }
    }
  }

  &_target {
    overflow: hidden;
    transition: height 0.4s ease-in-out;
    margin-left: $spacing_25x;
    @include mb() {
      margin-left: $spacing_1x;
    }
  }

  &_contents {
    position: relative;
    width: 100%;
    min-height: 143px;
    color: $color_white;
    display: flex;
    align-items: center;
    font-weight: $font_weight_normal;
    margin-top: $spacing_12x;
    padding-left: $spacing_42x;
    @include fz($font_size_standard);
    padding-right: $spacing_17x;

    @include mb() {
      padding-left: $spacing_28x;
      margin: $spacing_9x 0 0;
      min-height: 7.1rem;
      padding-right: $spacing_10x;

      @include fz($font_size_xsmall);
    }

    &.-color {
      &--black {
        background-color: $font_color_base;
      }

      &--darkblue {
        background-color: $color_darkblue;
      }

      &--transparent {
        color: $color_white;
      }
    }

    &::after {
      position: absolute;
      content: 'A';
      font-size: 157px;
      font-weight: 100;
      line-height: 1;
      left: 20px;
      top: 50%;
      transform: translate(0, -60%);

      @include mb() {
        font-size: 100px;
      }
    }
  }
}

.js-accordion {
  &-enter-active {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: js-accordion--anime__opend;
  }

  &-leave-active {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: js-accordion--anime__closed;
  }
}

@keyframes type3 {
  0% {
    width: 0;
  }
  50% {
    width: 0;
  }
  100% {
    width: 100;
  }
}
</style>
