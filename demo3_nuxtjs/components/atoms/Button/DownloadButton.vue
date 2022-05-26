<template>
  <a class="downloadButton" :href="createDownloadUrl(type)" download>
    <img
      class="downloadButton_icon"
      :src="require(`@/assets/images/icon/icon-${type}.svg`)"
      :alt="type"
    />
    <div>
      <div class="downloadButton_text">
        comony for
        <span>{{ type }}</span>
      </div>
      <span class="downloadButton_version">ダウンロード v{{ appVersion }}</span>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
// props type
type DownloadButtonProps = {
  appVersion: string
  type: string
}

export default defineComponent({
  name: 'DownloadButton',

  props: {
    appVersion: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'windows',
      validator: (value: string) => {
        return ['windows', 'mac'].includes(value)
      }
    }
  },

  setup(props: DownloadButtonProps, context: SetupContext) {
    const { $config } = context.root

    const createDownloadUrl = (type: string): string => {
      if (type === 'windows') {
        return `${$config.frontURL}/download/win/comony-${props.appVersion}.exe`
      }

      return `${$config.frontURL}/download/mac/comony-${props.appVersion}.dmg`
    }

    return {
      createDownloadUrl
    }
  }
})
</script>

<style scoped lang="scss">
.downloadButton {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0.5em 1em;
  position: relative;
  text-align: center;
  text-decoration: none;
  width: auto;
  touch-action: manipulation;
  letter-spacing: normal;
  color: $color_white;
  background: $color_gray_1000;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: all 0.2s ease 0s;

  &:hover {
    opacity: 0.75;
  }

  &_icon {
    width: 25px;
    height: 30px;
    margin-right: $spacing_3x;
  }

  &_text {
    @include fz($font_size_xxxs);
  }

  &_version {
    font-weight: $font_weight_bold;
    line-height: 1.55;
  }
}
</style>
