<template>
  <div class="navigation">
    <div class="navigation_wrapper">
      <button class="navigation_button_left" @click="scrollTo(menu, -300)">
        <span class="navigation_button_arrow" />
      </button>
      <ul class="navigation_list" id="menu" ref="menu">
        <li v-for="nav in navigationList" :key="nav.id" class="navigation_item">
          <component
            :is="isLink ? 'nuxt-link' : 'button'"
            :to="
              isLink && nav.id !== ''
                ? localePath({
                    name: `profile-id-${nav.id}`,
                    params: { id: paramsId }
                  })
                : isLink && nav.id === ''
                ? localePath({ name: `profile-id`, params: { id: paramsId } })
                : ''
            "
            class="navigation_link"
            :class="{ '-active': currentCategoryId === nav.id }"
            @click="isLink ? '' : onClick(nav.id)"
          >
            <span v-if="$i18n.locale === 'en'">{{ nav.nameEn }}</span>
            <span v-else>{{ nav.name }}</span>
          </component>
        </li>
      </ul>

      <button class="navigation_button_right" @click="scrollTo(menu, 300)">
        <span class="navigation_button_arrow" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  SetupContext,
  useRoute,
  onMounted,
  onUnmounted
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HorizontalNavigation',

  props: {
    isLink: {
      type: Boolean,
      default: false
    },

    navigationList: {
      type: Array,
      required: true
    },

    paramsId: {
      type: String,
      default: ''
    }
  },

  setup(_, context: SetupContext) {
    const route = useRoute()

    const currentCategoryId = ref<number>(Number(route.value.query?.category_id) || 0)

    // handle click menu item
    const onClick = (categoryId: number) => {
      currentCategoryId.value = categoryId
      context.emit('onClick', categoryId)
    }

    /**
     * handle scroll when clicking arrows
     * @elemt: <HTMLElement> | element
     * @scrollPixels: <Number> | scrolling pixels
     */
    const scrollTo = (elemt: HTMLElement | null, scrollPixels: number) => {
      if (elemt) {
        const scrollPos = elemt.scrollLeft
        return (elemt.scrollLeft = scrollPos + scrollPixels)
      }

      return false
    }

    /**
     * get current menu width
     * @elemt: <HTMLElement> | element
     */
    const getMenuWrapperSize = (elemt: HTMLElement | null) => {
      return elemt?.clientWidth
    }

    /**
     * get total width of all menu items
     * @elemt: <NodeListOf<Element> | list of menu items
     */
    const getMenuSize = (items: NodeListOf<Element> | null) => {
      let total = 0

      items?.forEach((item) => {
        total += item.clientWidth
      })
      return total
    }

    /**
     * get current menu position
     * @elemt: <HTMLElement> | element
     */
    const getMenuPosition = (elemt: HTMLElement | null) => {
      return elemt?.scrollLeft
    }

    /**
     * handle show arrows
     * @elemt: <HTMLElement> | element
     */
    const show = (elemt: HTMLElement | null) => {
      elemt?.classList.remove('hidden')
    }

    /**
     * handle hide arrows
     * @elemt: <HTMLElement> | element
     */
    const hide = (elemt: HTMLElement | null) => {
      elemt?.classList.add('hidden')
    }

    // check menu width to show / hide arrows
    const handleShowArrow = () => {
      const leftArrow = document.querySelector('.navigation_button_left') as HTMLElement
      const rightArrow = document.querySelector('.navigation_button_right') as HTMLElement
      const menuItem = document.querySelectorAll('.navigation_item') as NodeListOf<Element>
      const itemWidth = getMenuSize(menuItem)
      const menuWidth = getMenuWrapperSize(menu.value) || 0
      const paddleMargin = ref(50)

      // get how much of menu is invisible
      const menuInvisibleSize = itemWidth - menuWidth
      // get how much have we scrolled so far
      const menuPosition = getMenuPosition(menu.value) || 0
      const menuEndOffset = menuInvisibleSize - paddleMargin.value

      // handle show / hide arrows based on position
      if (itemWidth <= menuWidth) {
        hide(leftArrow)
        hide(rightArrow)
      } else {
        if (menuPosition <= paddleMargin.value) {
          hide(leftArrow)
          show(rightArrow)
        } else if (menuPosition < menuEndOffset) {
          show(leftArrow)
          show(rightArrow)
        } else if (menuPosition >= menuEndOffset) {
          show(leftArrow)
          hide(rightArrow)
        }
      }

      // handle show / hide arrows when menu is scrolling
      menu.value.addEventListener('scroll', handleShowArrow, { passive: true })
    }

    const menu = ref()

    onMounted(() => {
      handleShowArrow()
      window.onresize = () => {
        handleShowArrow()
      }
    })

    onUnmounted(() => {
      menu.value.removeEventListener('scroll', handleShowArrow, { passive: true })
    })

    return {
      onClick,
      currentCategoryId,
      menu,
      scrollTo,
      handleShowArrow
    }
  }
})
</script>

<style scoped lang="scss">
$zIndex_navigation: 300;
.navigation {
  z-index: $zIndex_navigation;
  width: 100%;
  color: $color_white;

  &_wrapper {
    position: relative;
    display: flex;
    width: 95%;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  &_list {
    text-align: center;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
    position: relative;
  }

  &_item {
    display: inline-block;
    &:not(:last-child) {
      border-right: 1px solid $color_white;
    }

    a {
      color: $color_white;
    }
  }

  &_link {
    display: block;
    @include fz($font_size_medium);
    font-weight: $font_weight_bold;
    color: $color_white;
    transition: all 0.3s ease;
    background-color: transparent;
    cursor: pointer;
    padding: $spacing_1x $spacing_6x;

    span {
      position: relative;
      padding: 0 $spacing_3x $spacing_2x $spacing_3x;
      display: inline-block;

      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: $color_white;
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      @include mb() {
        padding: 0 0 $spacing_1x 0;
      }
    }

    @include mb() {
      padding: $spacing_1x $spacing_4x;
      @include fz($font_size_xsmall);
    }

    &.-active,
    &.nuxt-link-exact-active {
      color: $color_white;

      span {
        &::before {
          transform: scaleX(1);
        }
      }
    }

    &:hover {
      opacity: $opacity_hover;
    }

    &.active {
      background: lighten($color_black, 10%);
    }
  }

  // arrow button
  &_button {
    &_left,
    &_right {
      width: 5rem;
      display: block;
      color: $color_white;
      cursor: pointer;
      padding: 0 $spacing_3x $spacing_2x $spacing_3x;

      @include mb() {
        padding: 0 0 $spacing_1x 0;
      }
    }

    &_arrow {
      border: solid $color_white;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
    }

    &_left {
      & .navigation_button_arrow {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
      }
    }

    &_right {
      & .navigation_button_arrow {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }
    }
  }
}

// hide scrollbar
::-webkit-scrollbar {
  display: none;
}

// hidden class
.hidden {
  display: none;
}
</style>
