<template>
  <ul class="dropdown" :class="[classes, { 'is-open': menuSelected }]">
    <li
      v-for="(item, id) in menuItems"
      :key="id"
      :class="[`-color--${item.color}`, itemClasses]"
      @click="handleClick(item.action, item)"
    >
      <component
        :is="item.link ? 'nuxt-link' : 'span'"
        :to="item.link ? localePath(item.link) : ''"
        :class="[
          { dropdown_link: item.link },
          { 'is-active': getWorkspaceId === item.id },
          `-color--${item.color}`
        ]"
        class="dropdown_item"
      >
        <img
          v-if="item.icon"
          class="dropdown_icon"
          :class="{ '--image': hasImage }"
          :src="require(`@/assets/images/icon/icon-${item.icon}.svg`)"
          :alt="item.icon"
        />
        <SquareImage
          v-if="item.imagePath"
          class="dropdown_image"
          width="44px"
          height="44px"
          :path="`${item.imagePath}?w=${imageSizes.userThumbnail.small}`"
        />
        <div>
          <span v-if="item.label" class="dropdown_text">
            {{ labelTruncate ? truncateText(item.label, labelTruncate, '..') : item.label }}
          </span>
          <div v-if="item.subtitleEn && $i18n.locale === 'en'" class="dropdown_subtext">
            {{ item.subtitleEn }}
          </div>
          <div v-else class="dropdown_subtext">{{ item.subtitle }}</div>
        </div>
      </component>
    </li>
  </ul>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { injectWorkspace } from '~/composables'
import SquareImage from '~/components/atoms/Image/SquareImage.vue'
import { truncateFilter } from '~/composables/utilities/filters/truncate'
import { imageSizes } from '~/constants/image-size'

interface I_DropdownItem {
  id?: string
  label: string
  icon: string
  imagePath: string
  link: string
  action: string
}

type DropdownProps = {
  position: string
  menuSelected: boolean
  borderColor: string
  menuItems: I_DropdownItem[]
  hasImage: boolean
  labelTruncate: number
}

export default defineComponent({
  name: 'Dropdown',
  components: {
    SquareImage
  },

  props: {
    menuSelected: {
      type: Boolean,
      required: false
    },
    menuItems: {
      type: Array as PropType<I_DropdownItem[]>,
      default: () => []
    },
    position: {
      type: String,
      default: 'top',
      validator: (value: string) => {
        return ['top', 'bottom'].includes(value)
      }
    },
    borderColor: {
      type: String,
      required: false,
      default: 'none',
      validator: (value: string) => {
        return ['none', 'gray'].includes(value)
      }
    },
    hasImage: {
      type: Boolean,
      default: false
    },
    labelTruncate: {
      type: Number,
      default: 30,
      required: false
    }
  },

  emits: ['onClick'],

  setup(props: DropdownProps, { emit }) {
    const truncateText = truncateFilter()

    const classes = computed(() => {
      return {
        [`-position--${props.position}`]: props.position
      }
    })

    const itemClasses = computed(() => {
      return {
        [`-borderColor--${props.borderColor}`]: props.borderColor,
        '--image': props.hasImage
      }
    })

    const handleClick = (action, data) => {
      emit(action || 'click', data)
    }

    const { getWorkspaceId } = injectWorkspace()

    return {
      imageSizes,
      truncateText,
      handleClick,
      classes,
      itemClasses,
      getWorkspaceId
    }
  }
})
</script>

<style lang="scss" scoped>
.dropdown {
  display: none;
  position: absolute;
  width: 260px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  background: $color_white;
  padding: $spacing_2x 0;
  z-index: $zIndex_dropdown;
  max-height: 50vh;
  overflow-y: auto;

  &.is-open {
    display: block;
  }

  &_item {
    padding: $spacing_2x $spacing_4x;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: left;
    @include fz($font_size_s);
    font-weight: $font_weight_normal;
    text-overflow: ellipsis;
    word-break: break-word;

    @include mb() {
      padding: $spacing_2x $spacing_4x;
    }

    &.--image {
      height: 60px;
      @include fz($font_size_xs);
      font-weight: $font_weight_medium;
    }

    &:hover {
      background: $color_light_blue_100;
    }

    &.is-active,
    &.nuxt-link-exact-active,
    &.nuxt-link-active {
      background: $color_light_blue_100;

      @include mb() {
        background-color: transparent;
      }
    }

    &.-color {
      &--black {
        color: $color_gray_900;
      }

      &--red {
        color: $color_red_a_500;
      }
    }

    &.-borderColor {
      &--gray {
        border-bottom: 1px solid $color_light_blue_200;
      }
    }

    &:last-child {
      border: 0;
    }
  }

  &_icon {
    width: 24px;
    height: 24px;
    margin-right: $spacing_3x;

    &.--image {
      width: 44px;
      margin-right: 0;
    }
  }

  &.-position {
    &--top {
      bottom: 100%;
    }

    &--bottom {
      top: 100%;
    }
  }

  &_image {
    margin-right: $spacing_3x;
    flex: 0 0 auto;
  }

  &_text {
    flex: 1;
    word-break: break-all;
  }

  &_subtext {
    @include fz($font_size_xxxs);
    color: $color_gray_800;
  }
}
</style>
