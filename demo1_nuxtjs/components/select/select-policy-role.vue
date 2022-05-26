<template>
  <a-select
    v-model="policyRole"
    :placeholder="placeholder"
    :mode="multiple ? 'multiple' : 'default'"
    size="large"
  >
    <a-select-option
      v-for="policyRole in policyRoles"
      :key="policyRole.code"
      :value="policyRole.code"
    >
      {{ policyRole.name }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'
import { usePolicyRole } from '@/state'
import { useServicePolicy } from '@/services'

export default defineComponent({
  name: 'SelectPolicyRole',
  props: {
    value: {
      type: [Array, String],
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
  },
  setup(props) {
    const store = useStore()
    const policyRole = useVModel(props)

    const { loadInvoiceRole } = useServicePolicy()

    const { policyRoles } = usePolicyRole()

    onMounted(async () => {
      if (policyRoles.value.length) return

      const { data } = await loadInvoiceRole()

      store.commit('resource/SET_POLICY_ROLES', data.roles)
      store.commit('resource/SET_POLICY_MODEL_NAMES', data.invoices)
    })

    return { policyRole, policyRoles }
  },
})
</script>
