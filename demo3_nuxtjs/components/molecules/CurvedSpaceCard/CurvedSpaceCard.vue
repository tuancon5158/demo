<template>
  <a class="curvedSpaceCard" :class="isShowContent && '-animated'" @click="handleLinkUser">
    <CurvedImage type="gallery" class="curvedSpaceCard_image" :path="thumbnailUrl" :alt="alt" />
    <Label
      v-if="label"
      class="curvedSpaceCard_label"
      :label="label"
      rounded="none"
      size="auto"
      bg-color="black"
    />
    <div v-if="isShowContent" class="curvedSpaceCard_wrapper">
      <div class="curvedSpaceCard_content">
        <p v-if="title" class="curvedSpaceCard_content_title">
          {{ title }}
        </p>
        <div
          v-if="workspaceThumbnailUrl && workspaceName"
          class="curvedSpaceCard_content_thumbnail"
          :class="!label ? 'curvedSpaceCard_content_link' : false"
          @click.prevent="handleLink"
        >
          <UserAvatar
            :image-path="workspaceThumbnailUrl"
            size="xxsmall"
            :user-name="workspaceName"
            direction="horizontal"
            bg-color="black"
          />
        </div>
        <p
          v-if="descriptionText"
          class="curvedSpaceCard_content_description"
          v-html="descriptionText"
        />
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { computed, defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'
import UserAvatar from '~/components/molecules/UserAvatar/UserAvatar.vue'
import CurvedImage from '~/components/atoms/Image/CurvedImage.vue'
import Label from '~/components/atoms/Label/Label.vue'
import { StringDecoder } from 'string_decoder'

interface I_CurvedSpaceCardProps {
  thumbnailUrl: string
  alt: string
  label: string
  title: string
  workspaceName: string
  description: string
  workspaceThumbnailUrl: string
  isShowContent: boolean
  workspaceId: number
  to: string
  isKey: number
  size: string
}

export default defineComponent({
  name: 'CurvedSpaceCard',

  components: {
    UserAvatar,
    CurvedImage,
    Label
  },

  props: {
    thumbnailUrl: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    workspaceId: {
      type: [String, Number],
      default: null
    },
    workspaceName: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    workspaceThumbnailUrl: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    isShowContent: {
      type: Boolean,
      default: false
    },
    isKey: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    }
  },

  setup(props: I_CurvedSpaceCardProps, { emit }) {
    const router = useRouter()
    const { app, $auth } = useContext()
    const descriptionText = computed(() => {
      return props.description?.replace(/<[^>]*>/gm, '') || ''
    })

    const handleLink = (e) => {
      e.stopPropagation()

      if (!props.label && props.workspaceId) {
        router.push(
          app.localePath({
            name: 'profile-workspace-id',
            params: { id: props.workspaceId.toString() }
          })
        )
      }
    }

    const handleLinkUser = (e) => {
      // e.preventDefault()

      if (props.isKey === 1 && !$auth.loggedIn) {
        emit('onSignUp')

        return
      }

      router.push(props.to)
    }

    return {
      descriptionText,
      handleLink,
      handleLinkUser
    }
  }
})
</script>

<style lang="scss" scoped>
.curvedSpaceCard {
  position: relative;
  overflow: hidden;
  display: block;
  height: 100%;

  &.-animated {
    &:hover {
      .curvedSpaceCard_image {
        @include min-screen(map-get($breakpoints, md) + 1) {
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }

  @include min-screen(map-get($breakpoints, md) + 1) {
    &:hover {
      .curvedSpaceCard_content {
        opacity: 1;
      }
    }
  }

  &_image {
    height: 100%;

    &::after {
      opacity: 0;
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: $color_black_gradient_3;
      transition: opacity 0.3s;
    }
  }

  &_content {
    opacity: 0;
    max-width: 368px;
    max-height: 80%;
    overflow: hidden;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;

    @include mb() {
      max-width: 100%;
      width: 100%;
      padding: $spacing_11x $spacing_10x;
    }

    &_title {
      font-weight: $font_weight_bold;
      @include fz($font_size_large);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    &_thumbnail {
      transition: opacity 0.5s;
      margin-bottom: $spacing_6x;
    }

    &_link {
      &:hover {
        opacity: 0.75;
      }
    }

    &_description {
      @include fz($font_size_standard);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
  }

  &_label {
    display: inline-block;
    padding: $spacing_1x !important;
    position: absolute;
    top: $spacing_4x;
    left: $spacing_3x;

    @include mb() {
      top: $spacing_3x;
      left: $spacing_2x;
    }
  }

  &_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: $color_white;
    height: 100%;
    transition: opacity 0.3s;

    @include mb() {
      display: none;
    }

    p {
      margin: 0;
    }
  }
}
</style>
