<template>
  <dl class="dlist">
    <div
      v-for="(item, id) in title"
      :key="id"
      class="dlist_item"
      :class="id === hideItem ? '-hide' : false"
    >
      <dt class="dlist_title">
        <InputLabel v-if="item.label" :value="item.label" color="black" :required="item.required" />
      </dt>
      <dd class="dlist_data">
        <slot :name="['data', id + 1].join('_')" />
      </dd>
    </div>
  </dl>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import InputLabel from '~/components/atoms/Form/InputLabel/InputLabel.vue'

interface I_Title {
  label: string
  required: boolean
}

export default defineComponent({
  name: 'TableDataList',

  components: {
    InputLabel
  },

  props: {
    title: {
      type: Array as PropType<I_Title[]>,
      default: () => []
    },
    hideItem: {
      type: Number,
      default: null
    }
  }
})
</script>

<style lang="scss" scoped>
.dlist {
  &_item {
    display: inline-flex;
    align-items: center;
    width: 100%;
    margin-bottom: $spacing_8x;

    &:last-child {
      margin-bottom: 0;
    }

    @include mb() {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing_4x;
    }

    &.-hide {
      display: none;
    }
  }

  &_title,
  &_data {
    @include fz($font_size_s);
    text-align: left;
  }

  &_title {
    flex: 0 0 auto;
    color: $font_color_base;
    font-weight: $font_weight_medium;
    align-self: flex-start;

    @include pc() {
      width: 200px;
    }

    @include mb() {
      width: 100%;
      margin-bottom: $spacing_2x;
    }
  }

  &_data {
    width: 100%;
  }
}
</style>
