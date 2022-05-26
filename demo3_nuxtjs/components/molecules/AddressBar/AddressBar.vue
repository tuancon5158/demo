<template>
  <div class="addressBar">
    <div class="addressBar_logo">
      <IconBase
        name="appLogo_mark"
        width="150"
        height="150"
        icon-color="white"
        viewBox="0, 0, 50, 50"
        icon-name="comony"
      >
        <IconLogo />
      </IconBase>
    </div>
    <div class="addressBar_text">
      <strong>LASTMILE WORKS Co., Ltd.</strong>
      <p>
        {{ $t('addressBar.japanTitle') }}
        <br />
        {{ $t('addressBar.japanAddress') }}
      </p>
      <p>
        {{ $t('addressBar.cambodiaTitle') }}
        <br />
        No.1159, Bldg. No. 2, 4F, National Road No. 2, Phum Prek Tanu, S/k Chak Angre Leu, Khan Mean
        Chey, Phnom Penh
      </p>
      <p>
        {{ $t('addressBar.vietnamTitle') }}
        <br />
        8F, Le Meridien Building, 3C Ton Duc Thang str., Ben Nghe ward, Dist. 1, Ho Chi Minh City
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import IconLogo from '~/components/icons/IconLogo.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'

// props type
export default defineComponent({
  name: 'AddressBar',

  components: { IconLogo, IconBase }
})
</script>

<style scoped lang="scss">
.addressBar {
  width: $AddressBar_W;
  height: auto;
  color: $color_white;
  background-color: $color_gray_1000;
  display: flex;
  flex: 1 1 auto;
  align-items: flex-end;
  padding: $spacing_5x $spacing_8x;

  &_logo {
    color: $color_white;
    opacity: 0.25;
    position: absolute;
    right: 3rem;
    z-index: 0;
  }

  &_text {
    position: relative;
    @include fz($font_size_xxxs);
  }
}
</style>
