<template>
  <div class="notFound">
    <img
      class="notFound_image"
      width="206px"
      height="185px"
      alt="not found"
      :src="require('@/assets/images/common/not_found/not_found.png')"
    />
    <p v-show="title" class="notFound_text">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// type NotFoundProps = {
//   title: String
// }

export default defineComponent({
  name: 'NotFound',

  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.notFound {
  height: 55vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &_image {
    object-fit: contain;
    margin-bottom: $spacing_10x;
  }

  &_text {
    line-height: 24px;
    text-align: center;
    @include fz($font_size_s);
    font-weight: $font_weight_medium;
    color: $color_gray_600;
    margin: 0;
  }
}
</style>
