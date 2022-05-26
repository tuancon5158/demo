<template>
  <a-select
    v-model="internalValue"
    :placeholder="placeholder"
    :mode="multiple ? 'multiple' : 'default'"
    :options="addressList"
    :disabled="disabled"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { fetchAddressV2 } from '@/state'

interface Address {
  code: number
  codename: string
  districts: any[]
  division_type: string
  name: string
  phone_code: number
}
export default defineComponent({
  name: 'SelectAddressProvince',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    provinceCode: {
      type: Number,
      default: null,
    },
    districtCode: {
      type: Number,
      default: null,
    },
    depth: {
      type: Number,
      default: 2,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { getAddress } = fetchAddressV2()
    const addressList = ref([])
    const fetchAddress = async () => {
      try {
        const res = await getAddress(
          props.provinceCode,
          props.districtCode,
          props.depth
        )

        addressList.value = res?.map((item: Address) => {
          return {
            ...item,
            value: `${item.code}`,
            label: item.name,
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchAddress()

    return {
      addressList,
      ...useQueryValue(toRef(props, 'value'), 'type'),
    }
  },
})
</script>
