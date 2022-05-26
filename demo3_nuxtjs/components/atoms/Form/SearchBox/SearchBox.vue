<template>
  <div class="searchBox">
    <IconBase
      class="searchBox_icon_search"
      icon-color="#767378"
      icon-name="search"
      width="18"
      height="18"
      viewBox="0 0 20 20"
    >
      <IconSearch :fill="isActive ? '#212022' : ''" />
    </IconBase>
    <input
      class="searchBox_input"
      type="search"
      :value="modelValue"
      name="search"
      :placeholder="placeholder"
      autocomplete="off"
      @input="handleInputChange"
    />
    <a v-if="isActive" class="searchBox_icon_cancel" @click="handleDelete">
      <IconBase icon-color="#767378" width="20" icon-name="cancel" height="20" viewBox="0 0 20 20">
        <IconCancel />
      </IconBase>
    </a>
  </div>
</template>
<script lang="ts">
import { ref, SetupContext, watch } from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconCancel from '~/components/icons/IconCancel.vue'
import IconSearch from '~/components/icons/IconSearch.vue'

type SearchBoxProps = {
  modelValue: string
  placeholder: string
}

export default defineComponent({
  name: 'SearchBox',

  components: {
    IconBase,
    IconCancel,
    IconSearch
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  setup(props: SearchBoxProps, context: SetupContext) {
    const isActive = ref(Boolean(props.modelValue) || false)

    /**
     * handle input when value change
     * @target: <HTMLButtonElement> | target of html button element
     */
    const handleInputChange = (event: { target: HTMLButtonElement }) => {
      isActive.value = Boolean(event.target.value)
      context.emit('update:modelValue', event.target.value)
    }

    // handle delete when click tag a
    const handleDelete = () => {
      isActive.value = !isActive.value
      context.emit('update:modelValue')
    }

    // follow value change
    watch(
      () => props.modelValue,
      (curr, prev) => {
        if (curr !== prev) {
          isActive.value = Boolean(curr)
        }
      }
    )

    return {
      handleInputChange,
      isActive,
      handleDelete
    }
  }
})
</script>
<style lang="scss" scoped>
$searchBox_H: 40px;
$searchBox_W: 260px;

.searchBox {
  position: relative;
  height: $searchBox_H;
  width: $searchBox_W;

  &_input {
    background: $color_white;
    border: 1px solid $color_light_blue_200;
    border-radius: $searchBox_BorderRadius;
    width: 100%;
    height: 100%;
    padding-left: $spacing_10x;
    padding-right: $spacing_10x;
    transition: 0.3s all;
    @include fz($font_size_s);
    font-weight: $font_weight_normal;
    line-height: 24px;
    color: $color_gray_900;

    &:focus-visible {
      outline: none;
    }

    &:focus {
      border: 1px solid $color_blue_400;
    }
  }

  &_icon {
    &_search {
      position: absolute;
      left: 15px;
      top: calc(#{$searchBox_H} - 27px);
    }

    &_cancel {
      position: absolute;
      right: 14px;
      top: calc(#{$searchBox_H} - 30px);
      cursor: pointer;
    }
  }
}
</style>
