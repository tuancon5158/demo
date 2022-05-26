<template>
  <a-select
    v-if="$device.isDesktopOrTablet"
    v-model="behaviorModel"
    v-bind="$attrs"
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
    :size="size"
  ></a-select>
  <t-select-modalize
    v-else
    v-model="behaviorModel"
    :drawer-title="placeholder"
    :items="options"
    item-text="label"
    item-value="value"
  ></t-select-modalize>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRef,
} from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'
import TSelectModalize from '@/components/elements/select/t-select-modalize.vue'
import { useBehaviors } from '@/state'
import { IBehaviorType } from '@/interfaces/behavior'

export default defineComponent({
  name: 'SelectBehavior',

  components: { TSelectModalize },

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    type: {
      type: Number as PropType<IBehaviorType>,
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
    const behaviorModel = useVModel(props)
    const type = toRef(props, 'type')

    const { behaviors } = useBehaviors()

    const options = computed(() => {
      if (!type.value) return behaviors.value

      return behaviors.value
        .filter(behavior => behavior.type === type.value)
        .map(behavior => ({
          value: behavior.id,
          label: behavior.name,
        }))
    })

    return { behaviorModel, options }
  },
})
</script>
