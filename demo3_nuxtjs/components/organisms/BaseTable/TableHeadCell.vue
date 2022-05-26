<template>
  <th scope="col" class="th" @click="$emit('clicked')">
    <slot />
  </th>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TableHeadCell'
})
</script>
<style lang="scss" scoped>
.th {
  @include fz($font_size_xxxs);
  line-height: 18px;
  @include ls(33);
  color: $color_gray_900;
  font-weight: $font_weight_normal;
  text-align: left;
  padding-left: $spacing_5x;
  padding-right: $spacing_5x;
}
</style>
