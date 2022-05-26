<template>
  <div class="appDownload">
    <!-- hide mobile for now -->
    <!-- TODO: モバイル再リリースまで非表示 -->
    <!-- <div class="appDownload_mobile">
      <a href="https://apps.apple.com/jp/app/comony/id1535896291"" target="_blank">
        <img src="../../../assets/images/app-download/apple.png" alt="Download app from App Store" width="88" />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.LastmileWorks.Comony" target="_blank">
        <img
          src="../../../assets/images/app-download/google.png"
         alt="Download app from Google Play"
          width="104"
        />
      </a>
    </div> -->
    <div class="appDownload_pc">
      <!-- Mac Button -->
      <a class="appDownload_button" :href="appInstallerPath('mac')" download :class="classes">
        <div class="appDownload_button_inner">
          <img src="~/assets/images/icon/icon-mac-home.svg" alt="Mac App" width="18" height="19" />
          <div class="appDownload_button_label">
            {{ $t('downloads.osAppHome') }}
            <br />
            {{ $t('downloads.dl') }}
          </div>
        </div>
      </a>
      <!-- Windows Button -->
      <a class="appDownload_button" :href="appInstallerPath('win')" download :class="classes">
        <div class="appDownload_button_inner">
          <img
            src="~/assets/images/icon/icon-windows-home.svg"
            alt="Windows App"
            width="18"
            height="18"
          />
          <div class="appDownload_button_label">
            {{ $t('downloads.winAppHome') }}
            <br />
            {{ $t('downloads.dl') }}
          </div>
        </div>
      </a>
    </div>
    <LinkText
      v-if="hasLink"
      class="appDownload_link"
      color="white"
      :link="localePath('downloads')"
      underline
      :value="!$device.isMobile ? $t('mainVisual.linkText') : $t('mainVisual.linkTextSp')"
      font-size="medium"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import constants from '~/constants'

export default defineComponent({
  name: 'AppDownloadButton',

  components: {
    LinkText
  },

  props: {
    size: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    },
    hasLink: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size
      }
    })

    const { app } = useContext()

    /*
     * create s3 path for installing comony application
     */
    const appConstants = computed(() => constants)
    const appInstallerPath = (pctype) => {
      const extensions = pctype === 'win' ? 'exe' : 'dmg'

      if (app.$config.frontURL.includes('stg')) {
        return `${appConstants.value.S3_APP_FOLDER_PATH}/download/${pctype}/comonydev-installer.${extensions}`
      }

      return `${appConstants.value.S3_APP_FOLDER_PATH}/download/${pctype}/comony-installer.${extensions}`
    }

    return {
      appInstallerPath,
      classes
    }
  }
})
</script>
<style lang="scss" scoped>
.appDownload {
  &_mobile,
  &_pc {
    display: flex;
    justify-content: center;

    @include mb() {
      margin-bottom: $spacing_1x;
      text-align: center;
      justify-content: center;
      flex-flow: wrap;
    }
  }

  &_mobile {
    margin-bottom: $spacing_4x;

    a {
      display: inline-block;
      padding: $spacing_1x;
    }
    img {
      width: auto;
      height: 40px;
    }
  }

  // custom desktop button download
  &_button {
    display: block;
    color: $color_white;
    text-align: center;
    background-color: $color_gray_1000;
    border-radius: $appDownLoadButton_BorderRadius;
    margin: 0 $spacing_1x;
    border: 1px solid $color_border;
    @include mb() {
      margin-bottom: $spacing_1x;
    }

    &_inner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &_label {
      font-weight: $font_weight_medium;
      flex: 1;
      word-break: keep-all;
    }

    // Button Size
    &.-size {
      &--small {
        min-width: 16.8rem;
        padding: 0.08rem $spacing_3x;
        @include fz($font_size_xxs);

        img {
          height: 25px;
          margin-right: $spacing_1x;
        }
      }

      &--medium {
        min-width: 26rem;
        padding: $spacing_1x $spacing_4x;
        @include fz($font_size_standard);

        img {
          height: 32px;
          margin-right: $spacing_1x;
        }
      }
    }
  }

  &_link {
    margin-top: $spacing_2x;
    display: block;
    text-align: center;
  }
}
</style>
