<template>
  <div class="spaceGalleryType2">
    <div class="spaceGalleryType2_wrapper">
      <div v-for="(item, index) in list" :key="index" class="spaceGalleryType2_wrapper_item">
        <CurvedSpaceCard
          :thumbnail-url="getSpaceThumbnailUrl(item.thumbnailUrl, imageSizes.spaceGallery.small)"
          :title="item.title"
          :description="item.description"
          :to="`/spaces/${item.id}`"
          is-show-content
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// components
import { defineComponent, PropType, SetupContext } from '@nuxtjs/composition-api'
import CurvedSpaceCard from '~/components/molecules/CurvedSpaceCard/CurvedSpaceCard.vue'
// composables
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
// constants
import { imageSizes } from '~/constants/image-size'

interface I_SpaceGalleryList {
  path: string
  to: string
}

export default defineComponent({
  name: 'SpaceGalleryType2',

  components: {
    CurvedSpaceCard
  },

  props: {
    list: {
      type: Array as PropType<I_SpaceGalleryList[]>,
      default: () => []
    },
    to: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'user'
    }
  },

  setup(_, context: SetupContext) {
    const { getAvatarThumbnailUrl, getSpaceThumbnailUrl } = useCreateThumbnailPath()

    return {
      imageSizes,
      getAvatarThumbnailUrl,
      getSpaceThumbnailUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.spaceGalleryType2 {
  max-width: $space_contents_W;
  margin: auto;

  &_wrapper {
    display: grid;
    grid-auto-flow: dense;

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: $spacing_6x;
    padding: $spacing_6x $spacing_6x;

    @include mb() {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: $spacing_4x;
      padding: $spacing_4x $spacing_4x 0;
    }
  }
}
</style>
