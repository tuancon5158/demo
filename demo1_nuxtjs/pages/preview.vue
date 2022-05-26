<template>
  <a-modal
    v-model="visible"
    :footer="null"
    centered
    width="60%"
    :after-close="back"
  >
    <base-image :src="srcImage" />
  </a-modal>
</template>

<script lang="ts">
import {
  computed,
  ref,
  defineComponent,
  useRoute,
} from '@nuxtjs/composition-api'
import BaseImage from '@/components/elements/base-image.vue'

export default defineComponent({
  name: 'Preview',
  components: { BaseImage },
  middleware: 'admin',
  setup() {
    const visible = ref(true)

    const route = useRoute()

    const srcImage = computed(() => {
      return route.value.query.image
    })

    return { visible, srcImage }
  },
  methods: {
    back() {
      this.$router.push('/admin')
    },
  },
})
</script>
