<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DateBlockUpdate from '../cong-ty/_id.vue'

export default defineComponent({
  extends: DateBlockUpdate,
  methods: {
    back() {
      this.$router.push('/lich-lam-viec/ca-nhan')
    },
  },
})
</script>
