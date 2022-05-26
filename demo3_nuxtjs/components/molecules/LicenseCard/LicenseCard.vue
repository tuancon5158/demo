<template>
  <div class="licenseCard">
    <p class="licenseCard_name">
      {{ name }}
    </p>
    <p class="licenseCard_subtitle">
      {{ subtitle }}
    </p>
    <p v-if="date" class="licenseCard_date">
      {{ $t('license.item.dateLabel') + ' : ' + date }}
    </p>
    <nuxt-link v-if="nameLink && !date" class="licenseCard_link" :to="`${localePath(link)}${hash}`">
      {{ nameLink }}
      <img src="@/assets/images/icon/icon-arrow-right.svg" :alt="nameLink" />
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// props type
// type LicenseCardProps = {
//   name: String
//   subtitle: String
//   date: String
//   link: String
//   nameLink: String
// }

export default defineComponent({
  name: 'LicenseCard',

  props: {
    name: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    hash: {
      type: String,
      default: ''
    },
    nameLink: {
      type: String,
      default: ''
    }
  }
})
</script>
<style lang="scss" scoped>
.licenseCard {
  padding: $spacing_5x;
  background-color: $color_white;
  border: 1px solid $color_light_blue_200;
  border-radius: $licenseCard_BorderRadius;
  height: 100%;

  &_name {
    line-height: 24px;
    margin: 0;
    margin-bottom: $spacing_5x;
    color: $color_gray_900;
    @include fz($font_size_s);
    font-weight: $font_weight_medium;
  }

  &_subtitle {
    line-height: 3.2rem;
    margin: 0;
    margin-bottom: $spacing_5x;
    color: $color_gray_900;
    @include fz($font_size_xxl);
    font-weight: $font_weight_medium;
  }

  &_date {
    margin: 0;
    line-height: 24px;
    color: $color_gray_700;
    @include fz($font_size_s);
    font-weight: $font_weight_medium;
  }

  &_link {
    color: $color_blue_400;
    display: inline-flex;
    align-items: center;
    line-height: 24px;
    @include fz($font_size_s);
    font-weight: $font_weight_medium;
    img {
      margin-left: $spacing_2x;
    }
  }
}
</style>
