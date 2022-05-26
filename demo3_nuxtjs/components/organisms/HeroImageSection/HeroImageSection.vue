<template>
  <section class="heroImageSection">
    <div class="heroImageSection_image">
      <img
        :src="require(`~/assets/images/${image}`)"
        :alt="heading"
        @load="onLoad"
        width="1440"
        height="511"
      />
    </div>
    <div class="heroImageSection_head">
      <TextMainVisual
        v-if="show"
        :tag="tag"
        :id="`heroImageSection-head`"
        class="heroImageSection_head_text"
        type="heroTitle"
        :title="heading"
      />
    </div>
    <HorizontalNavigation
      v-if="navigationList.length > 1"
      class="heroImageSection_navigation"
      :params-id="paramsId"
      :navigation-list="navigationList"
      position="center"
      @onClick="onClick"
    />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, SetupContext } from '@nuxtjs/composition-api'
import TextMainVisual from '~/components/organisms/MainVisual/TextMainVisual.vue'
import HorizontalNavigation from '~/components/organisms/Navigation/HorizontalNavigation.vue'

export default defineComponent({
  name: 'HeroImageSection',

  components: {
    TextMainVisual,
    HorizontalNavigation
  },

  props: {
    tag: {
      type: String,
      default: 'h1'
    },
    heading: {
      type: [String, Array],
      default: ''
    },
    image: {
      type: String,
      required: true
    },
    navigationList: {
      type: Array,
      default: () => []
    },
    paramsId: {
      type: String,
      default: ''
    }
  },

  setup(_, context: SetupContext) {
    const show = ref(false)

    // handle finish loading
    const onLoad = () => {
      show.value = true
      context.emit('handleLoad')
    }

    // handle change category
    const onClick = (categoryId: number) => {
      context.emit('onClick', categoryId)
    }

    return {
      show,
      onLoad,
      onClick
    }
  }
})
</script>

<style scoped lang="scss">
.heroImageSection {
  position: relative;
  width: 100%;
  overflow: hidden;

  @include pc() {
    height: 511px;
  }

  @include mb() {
    height: 421px;
  }

  &_image {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;

    &::before {
      z-index: 2;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba($color_gray_1000, 0.4);
      backdrop-filter: blur(5px);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &_head {
    z-index: 3;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    color: $color_white;

    @include pc() {
      top: 50%;
      padding: 0 $spacing_6x;
    }

    @include mb() {
      top: 55%;
      max-width: 90%;
    }

    &_text {
      font-weight: $font_weight_bold;

      @include pc() {
        @include fz($font_size_hero);
      }

      @include mb() {
        @include fz($font_size_hero_mb);
      }
    }
  }

  &_navigation {
    position: absolute;
    bottom: 9.6rem;

    @include mb() {
      bottom: 5.6rem;
    }
  }
}
</style>
