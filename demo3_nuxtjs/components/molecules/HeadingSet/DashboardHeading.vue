<template>
  <div class="dashboardHeading">
    <div class="dashboardHeading_groupTitle">
      <div>
        <IconText
          v-if="backLink"
          class="dashboardHeading_iconText"
          :is-event="true"
          :msg="$t('back')"
          color="blue"
          space="small"
          font-size="small"
          is-link
          :to="backLink"
        >
          <template #icon>
            <IconArrowBack />
          </template>
        </IconText>
        <div class="dashboardHeading_titleIcon">
          <img
            v-if="iconType"
            class="dashboardHeading_icon"
            :src="require(`@/assets/images/icon/icon-${iconType}.svg`)"
            :alt="title"
          />
          <h3 class="dashboardHeading_title">{{ title }}</h3>
          <span v-if="isBetaVersion" class="dashboardHeading_sub">{{ $t('beta') }}</span>
        </div>
      </div>
      <div v-if="isButton" class="dashboardHeading_button">
        <Button
          bg-color="blue"
          :label="infoButton.label"
          :link="infoButton.link ? infoButton.link : ''"
          :disabled="infoButton.disabled"
          @onClick="handleClick"
        />
      </div>
    </div>
    <div v-if="subtitle" class="dashboardHeading_description">
      {{ subtitle }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import IconArrowBack from '~/components/icons/IconArrowBack.vue'
import IconText from '~/components/molecules/IconText/IconText.vue'
import Button from '~/components/atoms/Button/Button.vue'

export default defineComponent({
  name: 'DashboardHeading',

  components: {
    IconArrowBack,
    IconText,
    Button
  },

  layout: 'dashboard',

  props: {
    iconType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    isBetaVersion: {
      type: Boolean,
      default: false
    },
    backLink: {
      type: String,
      default: ''
    },
    isButton: {
      type: Boolean,
      default: false
    },
    infoButton: {
      type: Object,
      default: () => {
        return {
          label: '',
          link: '',
          event: '',
          disabled: false
        }
      }
    }
  },

  emits: ['onClick'],

  setup(_, { emit }) {
    const handleClick = () => {
      emit('onClick')
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
.dashboardHeading {
  border-bottom: 1px solid $color_light_blue_200;
  padding-bottom: $spacing_6x;
  margin-bottom: $spacing_8x;

  @include mb() {
    margin-bottom: $spacing_3x;
  }

  &_groupTitle {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &_title {
    font-weight: $font_weight_medium;
    @include fz($font_size_xxl);
    color: $color_gray_900;
  }

  &_sub {
    @include fz($font_size_xxxs);
    vertical-align: bottom;
    color: $color_gray_700;
    position: relative;
    top: 0.4rem;
    margin-left: 0.4rem;
  }

  &_titleIcon {
    display: flex !important;
    align-items: center;
  }

  &_button {
    @include mb() {
      height: auto;
      margin-left: auto;
      // margin-top: $spacing_2x;
      padding: 0 !important;
    }
  }

  &_icon {
    margin-right: $spacing_3x;
  }

  &_description {
    @include fz($font_size_xs);
    color: $color_gray_900;
    margin-top: $spacing_3x;
  }

  &_iconText {
    display: inline-flex;
    margin-bottom: $spacing_6x;
  }
}
</style>
