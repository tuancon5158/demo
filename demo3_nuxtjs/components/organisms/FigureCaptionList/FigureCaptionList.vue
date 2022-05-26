<template>
  <SectionContainer bg-color="black-gradient" columns="1" container-size="lg" position="left">
    <template #column-1>
      <div
        v-observe-visibility="{
          callback: visibilityChanged
        }"
        class="figureCaptionList"
      >
        <FigureCaptionItem
          v-for="(item, index) in figureCaptionList"
          :key="index"
          class="figureCaptionList_item"
          :is-scroll="isScroll"
          :image="item.image"
          :title="item.title"
          :text="item.text"
          :size="size"
        />
      </div>
    </template>
  </SectionContainer>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@nuxtjs/composition-api'
import FigureCaptionItem from '~/components/molecules/FigureCaptionItem/FigureCaptionItem.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'

// FigureCaptionItem type
interface I_FigureCaptionListElement {
  title: string
  text: string
  image: string
}

export default defineComponent({
  name: 'FigureCaptionList',

  components: {
    FigureCaptionItem,
    SectionContainer
  },

  props: {
    figureCaptionList: {
      type: Array as PropType<I_FigureCaptionListElement[]>,
      required: true
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    }
  },

  setup(_, context: SetupContext) {
    const visibilityChanged = (isVisible: boolean, entry, delayTime = 100) => {
      context.emit('visibilityChanged', isVisible, entry, delayTime)
    }

    return {
      visibilityChanged
    }
  }
})
</script>

<style scoped lang="scss">
.figureCaptionList {
  position: relative;
  display: flex;
  justify-content: space-between;

  @include mb() {
    flex-direction: column;
    align-items: center;
  }

  &_item {
    @include mb() {
      max-width: 32rem;
    }

    &:not(:last-child) {
      margin-right: $spacing_7x;

      @include mb() {
        margin-right: 0;
      }
    }

    &:nth-child(2) {
      margin-top: $spacing_10x;
    }

    &:nth-child(3) {
      margin-top: $spacing_20x;
    }

    &:nth-child(2),
    &:nth-child(3) {
      @include mb() {
        margin-top: $spacing_14x;
      }
    }
  }
}
</style>
