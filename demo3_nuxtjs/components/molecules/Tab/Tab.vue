<template>
  <div class="tab">
    <div class="tab_header">
      <div v-for="tab in tabOptions" :key="tab.value">
        <div
          v-if="typeTab === 'internal'"
          :key="tab.value"
          :class="[tab.value == selectTab ? 'active' : '', 'tab_button']"
          @click="handleSelectTab(tab.value)"
        >
          {{ tab.label }}
        </div>
        <nuxt-link
          v-if="typeTab === 'external'"
          :key="tab.value"
          :class="[tab.value == selectTab ? 'active' : '', 'tab_button']"
          :to="localePath(tab.url)"
          @click.native="handleSelectTab(tab.value)"
        >
          {{ tab.label }}
        </nuxt-link>
      </div>
    </div>
    <div v-if="typeTab === 'internal'" class="tab_body">
      <slot :name="selectTab"></slot>
    </div>
    <div v-if="typeTab === 'external'" class="tab_body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from '@nuxtjs/composition-api'

interface I_tabsOptions {
  label: string
  value?: string
  url?: string
}

type TabProps = {
  tabOptions: I_tabsOptions[]
  typeTab: string
  defaultValue: string
}

export default defineComponent({
  name: 'Tab',
  components: {},
  props: {
    tabOptions: {
      type: Array as PropType<I_tabsOptions[]>,
      required: true
    },
    typeTab: {
      type: String,
      default: 'internal',
      validator: (value: string) => {
        return ['internal', 'external'].includes(value)
      }
    },
    defaultValue: {
      type: String,
      default: '0'
    }
  },
  setup(props: TabProps) {
    const selectTab = ref(props.defaultValue)
    const handleSelectTab = (value: string) => {
      selectTab.value = value
    }

    // noted
    watch(props, () => {
      selectTab.value = props.defaultValue
    })

    return { selectTab, handleSelectTab }
  }
})
</script>

<style scoped lang="scss">
.tab {
  max-width: 964px;

  &_header {
    display: flex;
    gap: 10px;
    border-bottom: 4px solid $color_gray_800;
    margin-bottom: $spacing_8x;
  }

  &_body {
    border-radius: 6px;
  }

  &_button {
    cursor: pointer;
    display: inline-block;
    margin: 0;
    position: relative;
    text-align: center;
    text-decoration: none;
    @include fz($font_size_base);
    padding: $spacing_2x $spacing_5x;
    width: auto;
    touch-action: manipulation;
    letter-spacing: normal;
    color: $color_white;
    transition: all 0.2s ease 0s;
    border-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: $color_gray_500;

    @include mb() {
      padding: $spacing_2x $spacing_3x;
    }
  }

  .active {
    color: $color_yellow_300;
    background-color: $color_gray_800;
    transition: all 0.5s;
  }
}
</style>
