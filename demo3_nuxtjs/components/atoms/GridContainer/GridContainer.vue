<template>
  <div class="grid">
    <div class="grid_contents">
      <div v-for="i in Number(columns)" :key="i" class="grid_column" :class="colClasses">
        <slot :name="`column-${i}`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
// props type
type GridContainerProps = {
  columns: string
}

export default defineComponent({
  name: 'GridContainer',

  props: {
    columns: {
      type: String,
      default: '1'
    }
  },

  setup(props: GridContainerProps) {
    const colClasses = computed(() => {
      return {
        [`-col--${props.columns}`]: props.columns
      }
    })

    return {
      colClasses
    }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  position: relative;
  margin: 0 auto;
  width: 100%;

  &_contents {
    @include pc() {
      display: flex;
      justify-content: space-between;
    }
  }

  &_column {
    &.-col {
      &--1 {
        width: 100%;
      }

      &--2 {
        @include pc() {
          width: calc((100% - 3.2rem) / 2);
        }
      }

      &--3 {
        @include pc() {
          width: calc((100% - (3.2rem * 2)) / 3);
        }

        &:not(:last-child) {
          @include mb() {
            margin-bottom: $spacing_10x;
          }
        }
      }
    }
  }
}
</style>
