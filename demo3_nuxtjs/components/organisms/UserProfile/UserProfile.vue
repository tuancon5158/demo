<template>
  <div class="userProfile" :class="classes">
    <div class="userProfile_head">
      <component
        class="userProfile_headLeft"
        :class="link !== '' ? '-link' : false"
        :is="link !== '' ? 'nuxt-link' : 'div'"
        :to="link !== '' ? link : false"
      >
        <SquareImage
          v-if="size === 'medium'"
          class="is-pc userProfile_image"
          :path="thumbnailUrl"
          :alt="name"
          rounded="medium"
          height="103px"
          width="103px"
        />
        <SquareImage
          v-if="size === 'medium'"
          class="is-sp userProfile_image"
          :path="thumbnailUrl"
          :alt="name"
          rounded="small"
          height="74px"
          width="74px"
        />
        <SquareImage
          v-else
          class="userProfile_image"
          :path="thumbnailUrl"
          :alt="name"
          rounded="xsmall"
          height="49px"
          width="49px"
        />

        <div class="userProfile_info">
          <div class="userProfile_info_name">{{ name }}</div>
          <div class="userProfile_info_companyName">
            {{ companyName }}
          </div>
        </div>
      </component>
    </div>
    <div v-if="description" class="userProfile_introduction">{{ description }}</div>

    <!-- Social media icons -->
    <div v-if="hasIcons" class="userProfile_icons">
      <a v-if="companyUrl" :href="companyUrl" target="_blank" class="userProfile_icons_item">
        <img :src="require(`@/assets/images/icon/icon-web-link.svg`)" alt="Icon web link" />
      </a>
      <a v-if="facebookUrl" :href="facebookUrl" target="_blank" class="userProfile_icons_item">
        <img :src="require(`@/assets/images/icon/icon-facebook-circle.svg`)" alt="Icon Facebook" />
      </a>
      <a v-if="twitterUrl" :href="twitterUrl" target="_blank" class="userProfile_icons_item">
        <img :src="require(`@/assets/images/icon/icon-twitter-new.svg`)" alt="Icon Twitter" />
      </a>
      <a v-if="instagramUrl" :href="instagramUrl" target="_blank" class="userProfile_icons_item">
        <img :src="require(`@/assets/images/icon/icon-instagram.svg`)" alt="Icon Instagram" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  SetupContext,
  onMounted,
  computed,
  useRouter
} from '@nuxtjs/composition-api'
import SquareImage from '~/components/atoms/Image/SquareImage.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import { I_FollowSpace } from '~/types/schema/space'
import { useErrorDisplay } from '~/composables'

export default defineComponent({
  name: 'UserProfile',

  components: {
    SquareImage,
    LinkText
  },

  props: {
    name: {
      type: String,
      default: ''
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    companyName: {
      type: String,
      default: ''
    },
    companyUrl: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'black'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'single',
      validator: (value: string) => {
        return ['single', 'list'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    },
    hasIcons: {
      type: Boolean,
      default: false
    },
    facebookUrl: {
      type: String,
      default: ''
    },
    twitterUrl: {
      type: String,
      default: ''
    },
    instagramUrl: {
      type: String,
      default: ''
    }
  },

  setup(props, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color,
        [`-size--${props.size}`]: props.size
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.userProfile {
  max-width: $dashboard_contents_W;
  width: 100%;

  &.-size {
    &--small {
      & .userProfile_info {
        font-weight: $font_weight_bold;
        @include fz($font_size_medium);

        @include mb() {
          @include fz($font_size_xsmall);
        }
      }

      & .userProfile_introduction {
        margin-top: $spacing_8x;

        @include mb() {
          margin-top: $spacing_4x;
        }
      }
    }

    &--medium {
      & .userProfile_info {
        font-weight: $font_weight_black;
        @include fz($font_size_xlarge);

        @include mb() {
          @include fz($font_size_xlarge_mb);
          font-weight: $font_weight_bold;
        }
      }

      & .userProfile_introduction {
        margin-top: $spacing_6x;

        @include mb() {
          margin-top: $spacing_6x;
        }
      }
    }
  }

  &.-color {
    &--white {
      color: $color_white;
    }

    &--black {
      color: $color_gray_1000;
    }
  }

  &_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    word-break: break-word;
  }

  &_headLeft {
    display: flex;
    align-items: center;

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      flex-basis: 80%;
    }

    @include mb() {
      flex-basis: 100%;
    }

    &.-link {
      &:hover {
        opacity: 0.75;
      }
    }
  }

  &_headRight {
    @include mb() {
      width: 100%;
    }
  }

  &_info {
    @include fz($font_size_xlarge);
    font-weight: $font_weight_black;
    word-break: break-all;

    @include mb() {
      @include fz($font_size_xlarge_mb);
      font-weight: $font_weight_bold;
    }
  }

  &_image {
    margin-right: $spacing_6x;
    margin-top: $spacing_2x;
    @include mb() {
      margin-right: $spacing_4x;
      margin-top: 0;
    }
  }

  &_introduction {
    white-space: pre-wrap;
    word-wrap: break-word;
    // margin-bottom: $spacing_14x;

    @include fz($font_size_standard);

    @include mb() {
      @include fz($font_size_xsmall);
    }
  }

  &_followButton {
    @include mb() {
      margin: auto;
      margin-top: $spacing_6x;
    }
  }

  &_icons {
    margin-top: $spacing_6x;

    &_item {
      margin-right: $spacing_2x;
      cursor: pointer;
    }
  }
}
</style>
