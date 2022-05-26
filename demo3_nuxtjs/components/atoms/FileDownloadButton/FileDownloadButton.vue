<template>
  <div class="dlDocsLabel">
    <a class="dlDocsLabel_link" :href="link" target="_blank" :download="type === 'download'">
      <span class="dlDocsLabel_text">{{ name }}</span>
      <div class="dlDocsLabel_group">
        <img
          class="dlDocsLabel_icon"
          :src="require(`@/assets/images/icon/icon-${iconType}.svg`)"
          :alt="name"
        />
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FileDownloadButton',

  props: {
    name: {
      type: String,
      required: true
    },
    iconType: {
      type: String,
      default: 'download',
      validator: (value: string) => {
        return ['external-link', 'pdf', 'download'].includes(value)
      }
    },
    link: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'download',
      validator: (value: string) => {
        return ['externalLink', 'download'].includes(value)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.dlDocsLabel {
  position: relative;
  width: 100%;
  max-width: 552px;
  background: $color_light_blue_100;
  border-radius: $fileDownload_BorderRadius;

  &_link {
    display: flex;
    padding: $spacing_4x $spacing_5x;
    color: $color_secondary;
    justify-content: space-between;
    align-items: center;
    @include fz($font_size_s);
    line-height: 24px;
  }

  &_text {
    vertical-align: middle;
    color: $color_gray_900;
  }

  &_icon {
    width: 18px;
    height: 18px;
  }

  &_group {
    display: flex;
    align-items: center;

    img {
      margin-right: $spacing_1x;
    }

    span {
      line-height: normal;
    }
  }
}
</style>
