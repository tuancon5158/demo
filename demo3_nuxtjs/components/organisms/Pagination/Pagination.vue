<template>
  <div class="pagination">
    <IconArrowPagination
      v-if="totalItems > 1"
      :class="!isShowArrowLeft && 'pagination_arrow'"
      :color-arrow="colorArrow"
      direction="back"
      @click.native="handleArrowClick(-1)"
    />

    <section v-if="isHavePaginationItem" class="pagination_content">
      <div
        v-for="(item, index) in areaSelected"
        :key="index"
        :class="[
          item === selected ? 'active' : '',
          typeof item === 'number' ? 'pagination_content_item' : 'pagination_content_space'
        ]"
        @click="typeof item === 'number' && handleClickItem(item)"
        v-html="typeof item === 'number' ? item : ''"
      />
    </section>

    <IconArrowPagination
      v-if="totalItems > 1"
      :class="!isShowArrowRight && 'pagination_arrow'"
      :color-arrow="colorArrow"
      direction="next"
      @click.native="handleArrowClick(1)"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed, onBeforeMount } from '@nuxtjs/composition-api'
import IconArrowPagination from '~/components/icons/IconArrowPagination.vue'
// props type
interface I_PaginationProps {
  totalItems: number
  current: number
  colorArrow: string
  isHavePaginationItem: boolean
  isScrollOnTop: boolean
  scrollTo: string
  behaviorScroll: any
}
export default defineComponent({
  name: 'Pagination',
  components: {
    IconArrowPagination
  },
  props: {
    isHavePaginationItem: {
      type: Boolean,
      default: true
    },
    isScrollOnTop: {
      type: Boolean,
      default: false
    },
    scrollTo: {
      type: String,
      default: ''
    },
    behaviorScroll: {
      type: String,
      default: 'smooth',
      validator: (value: string) => {
        return ['auto', 'smooth'].includes(value)
      }
    },
    totalItems: {
      type: Number,
      required: true,
      default: 20
    },
    current: {
      type: Number,
      default: 1
    },
    colorArrow: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['black', 'white'].includes(value)
      }
    }
  },

  emits: ['onSelectedItem'],

  setup(props: I_PaginationProps, { emit }) {
    const selected = ref(0)
    let active = false

    onBeforeMount(() => {
      for (let i = 0; i < props.current; i++) {
        selected.value += 1
      }
    })

    const areaSelected = ref<any>([])
    const increase = (): void => {
      selected.value++
    }
    const handleClickItem = (value: number): void => {
      emit('onSelectedItem', value)
      selected.value = value
    }

    const isShowArrowLeft = computed(() => {
      return selected.value < props.totalItems
    })

    const isShowArrowRight = computed(() => {
      return selected.value > 1
    })

    const handleArrowClick = (value): void => {
      if (value === 1 && isShowArrowLeft.value) {
        selected.value += 1
        emit('onSelectedItem', selected.value)
      }

      if (value === -1 && isShowArrowRight.value) {
        selected.value -= 1
        emit('onSelectedItem', selected.value)
      }
    }

    watch(
      () => selected.value,
      () => {
        if (selected.value !== 1 || active === true) {
          active = true

          if (props.isScrollOnTop) {
            setTimeout(
              () =>
                document
                  .querySelector(props.scrollTo)
                  ?.scrollIntoView({ behavior: props.behaviorScroll, block: 'start' }),
              0
            )
          }
        }
      }
    )
    watch(
      () => selected.value,
      () => {
        areaSelected.value = []
      },
      { immediate: true }
    )

    watch(
      () => selected.value,
      (value) => {
        for (let i = 1; i < 3; i++) {
          const right = selected.value + i
          const left = selected.value - i

          if (left >= 1) {
            areaSelected.value.push(left)
          }

          if (right <= props.totalItems) {
            areaSelected.value.push(right)
          }
        }

        if (!areaSelected.value.includes(1)) {
          areaSelected.value.push(1)
        }

        // insert first and last if select is in middle
        if (!areaSelected.value.includes(props.totalItems)) {
          areaSelected.value.push(props.totalItems)
        }

        if (!areaSelected.value.includes(value)) {
          areaSelected.value.push(value)
        }

        // sort
        areaSelected.value.sort((a, b) => a - b)
        // insert dot

        if (areaSelected.value.includes(1) && selected.value > 4) {
          areaSelected.value.splice(1, 0, '...')
        }

        if (
          areaSelected.value.includes(props.totalItems) &&
          selected.value < props.totalItems - 3
        ) {
          areaSelected.value.splice(-1, 0, '...')
        }
      },
      { immediate: true }
    )

    return {
      selected,
      areaSelected,
      increase,
      handleClickItem,
      handleArrowClick,
      isShowArrowLeft,
      isShowArrowRight
    }
  }
})
</script>

<style scoped lang="scss">
$pagination_font_size: 15;
$pagination_width: 39px;
$pagination_height: 39px;
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  &_arrow {
    cursor: pointer;
  }

  &_content {
    display: flex;
    justify-content: center;
    align-items: center;
    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $pagination_width;
      height: $pagination_height;
      margin: 0 $spacing_2x;
      text-decoration: none;
      color: $color_gray_1000;
      background: rgba($color_white, 0.4);
      @include fz($pagination_font_size);
      cursor: pointer;
      &.active {
        background: $color_yellow;
      }
    }
    &_space {
      background: none;
      &::after {
        content: '\2026';
        display: absolute;
        top: 50%;
        left: 50%;
        color: white;
        opacity: 0.4 !important;
        @include fz($font_size_xlarge_mb);
      }
    }
  }
}
</style>
