<template>
  <div class="faq" :class="classes">
    <div
      v-observe-visibility="{
        callback: visibilityChanged
      }"
    >
      <AccordionItem
        v-for="(item, index) in listItem"
        :id="`accordionItem${index}`"
        :key="index"
        :is-scroll="isScroll"
        :show-text="showText"
        :accordion-item="item"
        color="transparent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, SetupContext } from '@nuxtjs/composition-api'
import AccordionItem from '~/components/molecules/AccordionItem/AccordionItem.vue'
export interface I_ListItemFAQ {
  question: string
  answer: string
}
// props type
interface I_FAQProps {
  bgColor: string
  listItem: I_ListItemFAQ[]
  isScroll: boolean
}
export default defineComponent({
  name: 'FAQ',

  components: {
    AccordionItem
  },

  props: {
    bgColor: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['black', 'transparent'].includes(value)
      }
    },
    listItem: {
      type: Array as PropType<I_ListItemFAQ[]>,
      default: () => [
        {
          question:
            '質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容',
          answer:
            'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
        },
        {
          question:
            '質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容',
          answer:
            'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
        },
        {
          question:
            '質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容',
          answer:
            'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
        },
        {
          question:
            '質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容',
          answer:
            'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
        }
      ]
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },

  setup(props: I_FAQProps, context: SetupContext) {
    const showText = ref(false)
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor
      }
    })

    const visibilityChanged = (isVisible: boolean, entry: object, delayTime = 400) => {
      context.emit('visibilityChanged', isVisible, entry, delayTime)
      showText.value = isVisible
    }

    return {
      classes,
      visibilityChanged,
      showText
    }
  }
})
</script>

<style scoped lang="scss">
.faq {
  display: flex;
  flex-direction: column;
  max-width: 1440px;

  &.-bgColor {
    &--black {
      background: linear-gradient(90deg, #100f09 0%, #2b2e33 100%);
    }
    &--transparent {
      background: transparent;
    }
  }
}
</style>
