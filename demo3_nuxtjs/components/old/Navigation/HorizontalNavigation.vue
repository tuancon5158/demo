<template>
  <div v-if="navigationList.length > 1" class="navigation" :class="classes">
    <ul class="navigation_list">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, SetupContext, useRoute } from '@nuxtjs/composition-api'

// props type
// TODO desfin array type from categories res type
type HorizontalNavigationProps = {
  navigationList: Array<string[]>
  position: string
  paramsId: string
}

export default defineComponent({
  name: 'HorizontalNavigation',

  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    pageLink: {
      type: String,
      default: ''
    },
    navigationList: {
      type: Array,
      required: true
    },
    position: {
      type: String,
      default: 'center',
      validator: (value: string) => {
        return ['left', 'center', 'right'].includes(value)
      }
    },
    paramsId: {
      type: String,
      default: ''
    }
  },

  setup(props: HorizontalNavigationProps, context: SetupContext) {
    const route = useRoute()

    const classes = computed(() => {
      return {
        [`-position--${props.position}`]: props.position
      }
    })

    const currentCategoryId = ref<number>(Number(route.value.query?.category_id) || 0)

    const onClick = (categoryId: number) => {
      currentCategoryId.value = categoryId

      context.emit('onClick', categoryId)
    }

    return {
      classes,
      onClick,
      currentCategoryId
    }
  }
})
</script>

<style scoped lang="scss">
$zIndex_navigation: 300;
.navigation {
  z-index: $zIndex_navigation;
  width: 100%;
  padding: $spacing_3x 0;
  color: $color_white;
  background: $color_gray_1000;

  @include pc() {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
  }

  &.-position {
    &--center {
      @include pc() {
        justify-content: center;
      }
    }

    &--left {
      @include pc() {
        justify-content: flex-start;
      }
    }

    &--right {
      @include pc() {
        justify-content: flex-end;
      }
    }
  }

  &_list {
    text-align: center;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
  }

  &_item {
    display: inline-block;

    @include pc() {
      margin: 0 $spacing_1x;
    }

    a {
      color: $color_white;
    }
  }

  &_link {
    display: block;
    @include fz($font_size_xxs);
    color: $color_white;
    transition: all 0.3s ease;
    background-color: transparent;
    cursor: pointer;

    @include pc() {
      padding: $spacing_3x $spacing_4x;
      border-radius: 20px;
    }

    @include mb() {
      padding: $spacing_2x $spacing_4x;
      margin: $spacing_1x 0;
    }

    &.-active,
    &.nuxt-link-exact-active {
      color: $color_white;
      background: lighten($color_gray_1000, 20%);
      border-radius: 20px;
    }

    &:hover {
      color: $color_white;
      background: lighten($color_gray_1000, 10%);
    }

    &.active {
      background: lighten($color_gray_1000, 10%);
    }
  }
}
</style>
