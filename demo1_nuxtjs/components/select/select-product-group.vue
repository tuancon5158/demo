<template>
  <a-select
    v-model="productGroupModel"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    :size="size"
    :options="productGroups"
    v-bind="$attrs"
  ></a-select>
</template>

<script>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'SelectProductGroup',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const context = useContext()
    const productGroupModel = useVModel(props)

    const productGroups = useAsync(async () => {
      const { data } = await context.$axios.$get('/cms/group/product/getAll')

      return data.map(item => ({ label: item.name, value: item.id }))
    })

    return { productGroupModel, productGroups }
  },
})
</script>
