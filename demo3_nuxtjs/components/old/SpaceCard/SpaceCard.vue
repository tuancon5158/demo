<template>
  <div class="spaceCard" :class="{ 'slide-in-item': isScroll }">
    <a class="spaceCard_thumbnail" @click="onClick(dataSource.id)">
      <ImageLoader
        v-if="dataSource.thumbnailUrl"
        width="100%"
        ratio-type="3"
        :alt="dataSource.title"
        :path="getThumbnailUrl(dataSource.thumbnailUrl)"
      />
    </a>
    <div class="spaceCard_info">
      <div class="spaceCard_info_head">
        <span
          v-if="dataSource.category && dataSource.category.colorCode"
          class="spaceCard_category"
          :style="{ color: dataSource.category.colorCode }"
        >
          {{ $i18n.locale !== 'en' ? dataSource.category.name : dataSource.category.nameEn }}
        </span>
        <a v-if="dataSource.title" class="spaceCard_title" @click="onClick(dataSource.id)">
          {{ dataSource.title }}
        </a>
      </div>
      <div class="spaceCard_info_foot">
        <nuxt-link
          v-if="dataSource.userSpaces[0] && dataSource.userSpaces[0].user"
          :to="localePath({ name: 'profile-id', params: { id: dataSource.userSpaces[0].userId } })"
          class="spaceCard_info_avator"
        >
          <UserAvatar
            size="xsmall"
            :user-name="dataSource.userSpaces[0].user.name"
            direction="horizontal"
            image-type="circle"
            :image-path="getUserThumbnailUrl(dataSource.userSpaces[0].user.thumbnailUrl)"
          />
        </nuxt-link>
        <div class="spaceCard_info_count">
          <IconCount type="favorite" :count-number="dataSource.numFavorites" />
          <IconCount :count-number="dataSource.numViewers" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, SetupContext } from '@nuxtjs/composition-api'
import IconCount from '~/components/molecules/IconCount/IconCount.vue'
import UserAvatar from '~/components/molecules/UserAvatar/UserAvatar.vue'
import ImageLoader from '~/components/atoms/Image/ImageLoader.vue'
import { truncateFilter } from '~/composables/utilities/filters/truncate'

export default defineComponent({
  name: 'SpaceCard',

  components: {
    IconCount,
    UserAvatar,
    ImageLoader
  },

  props: {
    dataSource: {
      type: Object,
      required: true
    },
    isLink: {
      type: Boolean,
      default: true
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },

  setup(_, context: SetupContext) {
    const router = useRouter()
    const { app } = useContext()
    const { $config } = context.root
    const truncateText = truncateFilter()

    const onClick = (spaceId: number) => {
      router.push(app.localePath(`/spaces/${spaceId}`))
    }

    const getThumbnailUrl = (imageKey: string): string => {
      return `${$config.frontURL}/${imageKey}`
    }

    const getUserThumbnailUrl = (imageKey: string): string => {
      if (imageKey) {
        return `${$config.frontURL}/${imageKey}`
      }

      return require('~/assets/images/common/default-avator.png')
    }

    return {
      truncateText,
      onClick,
      getThumbnailUrl,
      getUserThumbnailUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.spaceCard {
  background-color: $color_white;
  box-shadow: 0 0 2px rgba($color_gray_lighten1, 15%);
  border-radius: 5px;
  padding: $spacing_2x;
  height: 100%;

  &_title {
    @include fz($font_size_xs);
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  &_category {
    @include fz($font_size_label_m);
  }

  &_info {
    padding: $spacing_1x $spacing_1x 0;

    &_head {
      text-align: left;
      margin-bottom: $spacing_2x;
    }

    &_foot {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &_avator {
      display: inline-flex;
      align-items: center;
      flex: 1;
    }
  }
}
</style>
