<template>
  <div class="tagInput">
    <div class="formAutocomplete">
      <div class="formAutocomplete_header">
        <div v-if="value.length > 0" class="formAutocomplete_tags">
          <div v-for="(v, k) in value" :key="k" class="itemSelected">
            <Tag
              :key="k"
              bg-color="blue"
              label-color="blue"
              icon-type="close-circle"
              :label="v.name"
              rounded="large"
              @onDelete="removeItem(k)"
            />
          </div>
        </div>
        <input
          v-model="textSearch"
          class="formAutocomplete_input"
          type="text"
          :placeholder="$t('spaceNew.tags.placeHolder')"
          @keydown.enter="addNewTag"
        />
      </div>

      <div class="formAutocomplete_footer">
        <div class="formAutocomplete_footer_text">
          {{ $t('spaceNew.tags.frequentlyAdded') }}
        </div>
        <div v-for="(v, k) in options" :key="k" class="itemSelected">
          <Tag
            :key="k"
            class="itemSelected_select"
            bg-color="light-blue"
            label-color="gray"
            rounded="large"
            :label="v.label"
            @onClick="addItem(v)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import Tag from '~/components/atoms/Tag/Tag.vue'
import { I_Tag, I_TagListItemNewCreate, I_TagListItem } from '~/types/schema/tag'
type TagInputProps = {
  options: I_Tag[]
  value: I_TagListItem[]
}

export default defineComponent({
  name: 'TagInputForm',
  components: { Tag },
  props: {
    options: {
      type: Array as PropType<I_Tag[]>,
      required: true
    },
    value: {
      type: Array as PropType<I_TagListItem[]>,
      default: () => []
    }
  },
  setup(props: TagInputProps, { emit }) {
    const textSearch = ref('')

    const inSelectedItems = (value: string): boolean => {
      // eslint-disable-next-line dot-notation
      if (!value) {
        return true
      }

      return props.value.map((val) => val.name.toLowerCase()).includes(value.toLowerCase())
    }

    const selectItem = (item) => {
      textSearch.value = ''
      emit('update:item', item)
      emit('onSelectItem', item)
    }

    const clearItem = () => {
      textSearch.value = ''
      emit('update:item', {
        id: undefined,
        title: undefined
      })
      emit('onClearItem')
    }

    const addNewTag = (e) => {
      // create new label and add above

      if (!inSelectedItems(e.target.value.trim())) {
        const items = JSON.parse(JSON.stringify(props.value))
        const itemTag: I_TagListItemNewCreate = {
          name: e.target.value.trim()
        }

        items.push(itemTag)
        emit('input', items)
        emit('onAddItem', items)
      }

      textSearch.value = ''
    }

    const removeItem = (index) => {
      textSearch.value = ''
      const items = JSON.parse(JSON.stringify(props.value))

      items.splice(index, 1)
      emit('input', items)
      emit('onRemoveItem', items)
    }

    const addItem = (item: I_Tag) => {
      if (!inSelectedItems(item.label)) {
        const items = JSON.parse(JSON.stringify(props.value))
        const itemTag: I_TagListItemNewCreate = {
          name: item.label
        }

        items.push(itemTag)
        emit('input', items)
        emit('onAddItem', items)
      }
    }

    return {
      textSearch,
      clearItem,
      removeItem,
      addNewTag,
      selectItem,
      inSelectedItems,
      addItem
    }
  }
})
</script>
<style scoped lang="scss">
.tagInput {
  border-color: 1px solid $color_light_blue_200;
  border-radius: $formContainer_BorderRadius;
  border: 1px solid $color_light_blue_200;

  .formAutocomplete {
    &_header {
      padding: $spacing_3x $spacing_4x;
      border-bottom: 1px solid $color_light_blue_200;
      margin-bottom: $spacing_3x;
    }

    &_tags {
      margin-bottom: $spacing_4x;
    }

    &_footer {
      padding: 0 $spacing_4x $spacing_3x $spacing_4x;
      color: $color_gray_600;
      @include fz($font_size_xxxs);
      text-align: left;

      &_text {
        margin-bottom: $spacing_3x;
      }
    }

    &_input {
      border: none;
      @include fz($font_size_xxxs);
      width: 100%;
      height: 20px;
      padding: $spacing_3x 0;
      outline: none;
      border-radius: 5px;
      cursor: default;

      &:focus {
        border: none;
      }
    }

    ul {
      background-color: $color_gray_lighten2;
      width: 100%;
      padding-left: 0;
      cursor: default;
      height: 200px;
      overflow: scroll;
      overflow-x: hidden;
    }

    .options_area {
      align-items: center;
      padding: $spacing_1x 0 $spacing_1x $spacing_4x;

      &:hover {
        background: $color_gray;
      }

      li {
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        cursor: default;
        list-style: none;
        padding: $spacing_1x $spacing_3x;
        width: fit-content;
        @include fz($font_size_xxxs);
        ///add new color for li
        background: $color_secondary;
        border-radius: 5px;
        overflow-x: hidden;
        color: $color_white;
      }

      li.disabled,
      li.disabled:hover {
        background: #eaeaea;
        color: #a7a7a7;
        cursor: default;
        pointer-events: none;
      }

      li.disabled .flag-icon {
        opacity: 0.5;
      }
    }

    .itemSelected {
      display: inline-block;
      text-align: center;
      cursor: default;
      list-style: none;
      width: fit-content;
      ///add new color for li
      overflow-x: hidden;

      &_tag {
        @include fz($font_size_xxxs);
        background: $color_blue_50 !important;
        color: $color_blue_400;
        border-radius: $tag_BorderRadius_larger;
      }

      &:not(:last-child) {
        margin-right: $spacing_1x;
      }

      &_select {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: $color_blue_100;
        }
      }
    }
  }
}
</style>
