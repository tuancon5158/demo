<template>
  <footer class="footer">
    <div class="footer_menu">
      <div class="footer_sitemap">
        <div class="footer_sitemap_items">
          <!-- First column -->
          <dl>
            <dt class="footer_sitemap_title">{{ $t('footer.first.title') }}</dt>
            <dd v-for="item in 4" :key="item">
              <nuxt-link :to="localePath($t(`footer.first.link${item}`))">
                {{ $t(`footer.first.name${item}`) }}
              </nuxt-link>
            </dd>
          </dl>

          <!-- Second column -->
          <dl>
            <dt class="footer_sitemap_title">{{ $t('footer.second.title') }}</dt>
            <dd v-for="item in 5" :key="item">
              <nuxt-link :to="localePath($t(`footer.second.link${item}`))">
                {{ $t(`footer.second.name${item}`) }}
              </nuxt-link>
            </dd>
          </dl>
        </div>
      </div>
      <div class="footer_actions">
        <div>{{ $t('footer.action') }}</div>
        <client-only>
          <div v-if="!$auth.loggedIn" class="footer_button">
            <CTAButton
              class="forCreatorBusinessCTABanner_button"
              type="outline"
              size="small"
              :label="$t('footer.login')"
              icon
              icon-color="white"
              :link="localePath('login')"
            />
          </div>
          <div v-else class="footer_button">
            <CTAButton
              type="outline"
              size="small"
              :label="$t('footer.contact')"
              icon
              icon-color="white"
              :link="localePath('contact')"
            />
          </div>
        </client-only>
      </div>
    </div>
    <div class="footer_copyright">
      <AppLogo size="xsmall" direction="vertical" icon-color="#fff" />
      <small class="footer_copyright_text">
        Copyright © LASTMILE WORKS Co., Ltd. All rights reserved.
      </small>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import CTAButton from '~/components/atoms/Button/CTAButton.vue'
import AppLogo from '~/components/atoms/AppLogo/AppLogo.vue'

export default defineComponent({
  name: 'Footer',

  components: {
    AppLogo,
    CTAButton
  },

  setup() {
    const navigation = reactive({
      isHumbergarOpen: false,
      isBusinessMenuOpen: false,
      isLanguageMenuOpen: false
    })

    const onClickHumbergerMenu = () => {
      navigation.isHumbergarOpen = !navigation.isHumbergarOpen
    }

    const onClickBusinessMenu = () => {
      navigation.isBusinessMenuOpen = !navigation.isBusinessMenuOpen
    }

    const onClickLanguageMenu = () => {
      navigation.isLanguageMenuOpen = !navigation.isLanguageMenuOpen
    }

    return {
      ...toRefs(navigation),
      onClickHumbergerMenu,
      onClickBusinessMenu,
      onClickLanguageMenu
    }
  }
})
</script>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  width: 100%;
  color: $color_white;
  background: $color_gray_1000;

  &_menu {
    @include pc() {
      display: flex;
      justify-content: space-between;
      padding: $spacing_14x $spacing_8x;
    }

    @include mb() {
      padding: $spacing_4x;
    }
  }

  &_sitemap {
    &_items {
      display: flex;

      dl {
        margin-right: $spacing_8x;

        @include mb() {
          margin: 0 0 $spacing_4x;
          border-bottom: 1px solid $color_gray_darken2;
          padding-bottom: $spacing_2x;
        }
      }

      dd {
        @include fz($font_size_xxs);
        margin-bottom: $spacing_1x;

        @include mb() {
          margin-bottom: $spacing_1x;
        }
      }

      @include mb() {
        @include fz($font_size_xxxs);
        flex-direction: column;
      }
    }

    &_title {
      margin-bottom: $spacing_4x;

      @include mb() {
        @include fz($font_size_xs);
        font-weight: $font_weight_bold;
      }
    }
  }

  &_actions {
    @include fz($font_size_s);
    text-align: center;

    @include mb() {
      margin: $spacing_4x auto 0;
      max-width: 30rem;
    }

    a {
      width: 100%;
    }
  }

  &_button {
    margin: $spacing_4x auto;
  }

  &_copyright {
    padding: $spacing_2x 2%;
    display: flex;
    align-items: center;
    border-top: 1px solid $color_gray_darken2;

    &_text {
      @include fz($font_size_label_m);
      margin: 0 $spacing_2x;
    }
  }
}
</style>
