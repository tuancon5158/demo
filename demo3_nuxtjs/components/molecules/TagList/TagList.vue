<template>
  <div class="tagList">
    <div class="tagList_icon">
      <IconTag />
    </div>
    <div class="tagList_content">
      <LinkText
        v-for="item in linkTextData"
        :key="item.id"
        :color="color"
        :value="item.value"
        :move-to="item.moveTo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import IconTag from '~/components/icons/IconTag.vue'

interface LinkTextElement {
  id: string
  value: string
  moveTo: string
}
// // props type
// type TagListSetProps = {
//   // Link Text
//   value: String
//   moveTo: String
//   color: String
//   underline: Boolean
//   newTab: String
//   // TagList
//   linkTextData: Array<LinkText>
// }

export default defineComponent({
  name: 'TagList',
  components: {
    LinkText,
    IconTag
  },
  props: {
    linkTextData: {
      type: Array as PropType<LinkTextElement[]>,
      required: true
    },
    value: {
      type: String,
      required: true,
      default: '会員の方は'
    },
    moveTo: {
      type: String,
      required: true,
      default: '#'
    },
    newTab: {
      type: String,
      default: '_blank',
      validator: (value: string) => {
        return ['_blank', '_self'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'secondary'
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
.tagList {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  &_content {
    * {
      margin: 10px 0 10px 10px;
    }
  }
}
</style>
