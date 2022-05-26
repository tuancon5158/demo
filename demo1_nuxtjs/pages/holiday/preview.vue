<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Preview from '@/pages/preview.vue'

export default defineComponent({
  extends: Preview,

  methods: {
    back() {
      this.$router.push('/holiday')
    },
  },
})
</script>
