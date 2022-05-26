<template>
  <div class="cautionBox">
    <strong>{{ $t('cautionNotMainSended.heading') }}</strong>
    <ul>
      <li>{{ $t('cautionNotMainSended.text1') }}</li>
      <li>
        {{ $t('cautionNotMainSended.text2') }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CautionBox'
})
</script>

<style scoped lang="scss">
.cautionBox {
  background-color: $color_gray_lighten3;
  border-radius: 5px;
  padding: $spacing_5x;

  ul {
    margin-top: $spacing_3x;
    li {
      list-style: disc;
      margin-left: $spacing_5x;
    }
  }
}
</style>
