<template>
  <div class="loadMore" @click="$emit('onClick')">
    <span class="loadMore_dot" :class="dotsClasses" />
    <span class="loadMore_dot" :class="dotsClasses" />
    <span class="loadMore_dot" :class="dotsClasses" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

// props type
type LoadMoreProps = {
  color: string
}

export default defineComponent({
  name: 'LoadMore',

  props: {
    color: {
      type: String,
      default: 'gray',
      validator: (value: string) => {
        return ['gray', 'black'].includes(value)
      }
    }
  },

  setup(props: LoadMoreProps) {
    const dotsClasses = computed(() => {
      return {
        [`-color--${props.color}`]: props.color
      }
    })

    return {
      dotsClasses
    }
  }
})
</script>

<style scoped lang="scss">
.loadMore {
  width: 26px;
  display: flex;
  justify-content: space-between;
  height: 26px;
  line-height: 26px;
  align-items: center;
  padding: $spacing_1x;
  cursor: pointer;

  &_dot {
    height: 4px;
    width: 4px;
    border-radius: 50%;
    display: block;

    &.-color {
      &--black {
        background: $color_gray_900;
      }
      &--gray {
        background: $color_gray_500;
      }
    }
  }
}
</style>
