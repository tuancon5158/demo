<template>
  <div class="iconCount">
    <div class="iconCount_tooltip">
      <Tooltip :text="$t(`${type}`)" bg-color="black" size="small" />
    </div>
    <div class="iconCount_item">
      <IconBase
        v-if="type === 'viewer'"
        icon-color="#222"
        width="18"
        height="13"
        viewBox="0, 0, 18, 12"
      >
        <IconViewer />
      </IconBase>
      <IconBase
        v-else-if="type === 'favorite'"
        icon-color="#fff"
        width="16"
        height="14"
        viewBox="0, 0, 17, 14"
      >
        <IconFavorite />
      </IconBase>
      <span class="iconCount_number">{{ countNumber }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Tooltip from '~/components/atoms/Tooltip/Tooltip.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconViewer from '~/components/icons/IconViewer.vue'
import IconFavorite from '~/components/icons/IconFavorite.vue'

export default defineComponent({
  name: 'IconCount',

  components: {
    Tooltip,
    IconBase,
    IconViewer,
    IconFavorite
  },

  props: {
    type: {
      type: String,
      default: 'viewer',
      validator: (value: string) => {
        return ['viewer', 'favorite'].includes(value)
      }
    },
    countNumber: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.iconCount {
  position: relative;
  display: inline-block;

  &_tooltip {
    display: none;
    position: absolute;
    bottom: 110%;
    right: 50%;
    white-space: nowrap;
    transform: translateX(50%);
  }

  &:hover {
    .iconCount_tooltip {
      display: block;
    }
  }

  &_number {
    margin-left: 0.2rem;
  }

  &_item {
    display: inline-flex;
    align-items: center;
    @include fz($font_size_xs);
    line-height: 25px;
    height: 25px;
  }
}
</style>

<i18n>
{
  "ja": {
    "viewer": "閲覧数",
    "favorite": "お気に入り"
  },
  "en": {
    "viewer": "viewer",
    "favorite": "favorite"
  }
}
</i18n>
