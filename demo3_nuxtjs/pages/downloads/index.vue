<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer
      bg-color="gray"
      columns="1"
      container-size="xlg"
      position="left"
      wrap-size="large"
    >
      <template #column-1>
        <div class="downloadTemp">
          <div class="downloadTemp_card">
            <div class="downloadTemp_head">
              <AppLogo size="large" direction="horizontal" icon-color="#222" />
              <p class="downloadTemp_heading">
                {{ $t('downloads.leadtext1') }}
                <br class="is-ipad" />
                {{ $t('downloads.leadtext2') }}
              </p>
            </div>
            <div class="downloadTemp_middle">
              <div class="downloadTemp_button">
                <AppDownloadButton size="medium" />
                <div class="downloadTemp_note">
                  {{ $t('downloads.note3') }}
                  <br class="is-pc" />
                  {{ $t('downloads.note4') }}
                </div>
              </div>
            </div>
            <div class="downloadTemp_foot">
              <strong>{{ $t('downloads.noteTitle') }}</strong>
              <dl class="downloadTemp_footList">
                <div>
                  <dt>【Windows】</dt>
                  <dd>{{ $t('downloads.windows.note1') }}</dd>
                  <dd>{{ $t('downloads.windows.note2') }}</dd>
                  <dd>{{ $t('downloads.windows.note3') }}</dd>
                </div>
                <div>
                  <dt>【Mac】</dt>
                  <dd>{{ $t('downloads.mac.note1') }}</dd>
                  <dd>{{ $t('downloads.mac.note2') }}</dd>
                  <dd>{{ $t('downloads.mac.note3') }}</dd>
                </div>
                <!-- TODO: モバイル再リリースまで非表示 -->
                <!-- <div>
                  <dt>
                    【Android】
                    <span class="downloadTemp_footList_version">
                      {{ $t('downloads.android.version') }}
                    </span>
                  </dt>
                  <dd>{{ $t('downloads.android.note1') }}</dd>
                  <dd>{{ $t('downloads.android.note2') }}</dd>
                </div>
                <div>
                  <dt>
                    【iOS】
                    <span class="downloadTemp_footList_version">
                      {{ $t('downloads.ios.version') }}
                    </span>
                  </dt>
                  <dd>{{ $t('downloads.ios.note1') }}</dd>
                  <dd>{{ $t('downloads.ios.note2') }}</dd>
                </div> -->
              </dl>
              <p class="downloadTemp_notice">
                <span>{{ $t('downloads.note1') }}</span>
                <span>{{ $t('downloads.note2') }}</span>
              </p>
            </div>
          </div>
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta, computed } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import AppLogo from '~/components/atoms/AppLogo/AppLogo.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import AppDownloadButton from '~/components/atoms/Button/AppDownloadButton.vue'

export default defineComponent({
  name: 'Downloads',

  components: {
    DefaultLayout,
    AppLogo,
    SectionContainer,
    AppDownloadButton
  },

  setup() {
    const { app } = useContext()
    const { title, meta } = useMeta()

    /*
     * set meta
     */
    title.value = `${app.i18n.t('meta.downloads.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.downloads.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.downloads.title')} | comony`
      }
    ]
  },

  head: {}
})
</script>

<style scoped lang="scss">
$appbadge_android_gap: 15px;
.downloadTemp {
  &_card {
    padding: $spacing_15x 5%;
    background-color: $color_white;
    border-radius: 5px;
  }

  &_head {
    text-align: center;
  }

  &_heading {
    font-weight: $font_weight_semiBold;
    @include fz($font_size_s);
    margin: $spacing_8x 0;

    @include mb() {
      text-align: left;
      @include fz($font_size_base);
    }
  }

  &_middle {
    text-align: center;
  }

  &_button {
    @include pc() {
      display: inline-block;
    }
  }

  &_note {
    position: relative;
    color: $color_gray_700;
    text-align: left;
    @include fz(14);
    margin-top: $spacing_2x;
    margin-left: 1.5rem;

    @include mb() {
      @include fz(12);
    }

    &::before {
      content: '※';
      position: absolute;
      top: 0;
      left: -1.5rem;
    }
  }

  &_foot {
    max-width: 835px;
    margin: $spacing_5x auto 0;
  }

  &_footList {
    margin-top: $spacing_2x;

    & div {
      margin-bottom: $spacing_1x;
    }

    &_version {
      @include fz($font_size_xxs);
    }
  }

  &_notice {
    @include fz($font_size_xxs);
    span {
      display: block;
      text-indent: -1.3rem;
      margin-left: $spacing_3x;
    }
  }
}
</style>
