<template>
  <div class="popup" :class="{ 'is-open': show }">
    <div class="popup_heading">
      {{
        coverType === spaceCoverTypeId.IMAGE
          ? $t('spaceNew.form.explanation.coverImage.title')
          : $t('spaceNew.form.explanation.coverUrl.title')
      }}
      <img
        class="popup_icon"
        :src="require(`~/assets/images/icon/icon-close-popup.svg`)"
        @click="$emit('onClose')"
      />
    </div>
    <div class="popup_subTitle">
      {{
        coverType === spaceCoverTypeId.IMAGE
          ? $t('spaceNew.form.explanation.coverImage.subTitle')
          : $t('spaceNew.form.explanation.coverUrl.subTitle')
      }}
    </div>
    <div class="popup_content">
      <img
        v-if="coverType === spaceCoverTypeId.IMAGE"
        :src="require(`@/assets/images/explain-1.png`)"
      />
      <img v-else :src="require(`@/assets/images/explain-2.png`)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { spaceCoverTypeId } from '~/constants/spaces'

export default defineComponent({
  name: 'Popup',

  props: {
    show: {
      type: Boolean,
      default: false
    },

    coverType: {
      type: Number,
      default: 0
    }
  },

  setup() {
    return {
      spaceCoverTypeId
    }
  }
})
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  z-index: 9999;
  width: 52rem;
  height: auto;
  background: $color_white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: $formContainer_BorderRadius;
  bottom: calc(100% - 15px);
  left: 10rem;
  display: none;

  @include mb() {
    width: 92%;
    left: 50%;
    transform: translate(-50%, 0);
    top: 60px;
    bottom: -100%;
  }

  &.is-open {
    display: inline-table;
  }

  &_heading {
    padding: $spacing_2x $spacing_3x;
    @include fz($font_size_xs);
    line-height: 16px;
    color: $color_gray_900;
    border-bottom: 1px solid $color_gray_300;
    display: flex;
    align-items: center;
    background-color: $color_white;
    border-radius: $formContainer_BorderRadius $formContainer_BorderRadius 0 0;
  }

  &_icon {
    margin-left: auto;
    cursor: pointer;
    display: none;

    @include mb() {
      display: block;
    }
  }

  &_subTitle {
    padding: $spacing_2x $spacing_3x;
    @include fz($font_size_xxxs);
    line-height: 16px;
    color: $color_gray_900;
    background-color: $color_white;
  }

  &_content {
    background: $color_gray_400;
    padding: $spacing_5x;
    border-radius: 0 0 $formContainer_BorderRadius $formContainer_BorderRadius;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}
</style>
