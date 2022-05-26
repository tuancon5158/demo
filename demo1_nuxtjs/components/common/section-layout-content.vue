<template>
  <a-layout style="z-index: 2">
    <a-layout-header class="header">
      <div class="flex flex-col">
        <a-breadcrumb>
          <a-breadcrumb-item
            v-for="(breadcrumb, index) in breadcrumbs"
            :key="index"
          >
            {{ breadcrumb }}
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="activatedTab">
            {{ activatedTab.label }}
          </a-breadcrumb-item>
        </a-breadcrumb>

        <h1 class="title">{{ title }}</h1>

        <a-tabs
          v-if="tabs.length"
          :default-active-key="withoutTrailingSlash($route.path)"
          class="!-mt-4"
          @change="changeTab"
        >
          <a-tab-pane
            v-for="tab in tabs"
            :key="tab.href"
            :tab="tab.label"
          ></a-tab-pane>
        </a-tabs>
      </div>
    </a-layout-header>

    <a-layout-content class="layout-content">
      <div class="main">
        <slot></slot>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRoute,
} from '@nuxtjs/composition-api'
import { withoutTrailingSlash, isSamePath } from 'ufo'

interface Tab {
  label: string
  href: string
}

export default defineComponent({
  name: 'SectionLayoutContent',

  props: {
    tabs: {
      type: Array as PropType<Tab[]>,
      default: () => [],
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const route = useRoute()

    const activatedTab = computed(() => {
      return props.tabs?.find(tab => {
        return isSamePath(tab.href, route.value.path)
      })
    })

    return { activatedTab, withoutTrailingSlash }
  },

  methods: {
    changeTab(href: string) {
      this.$router.push(href)
    },
  },
})
</script>

<style lang="postcss" scoped>
.header {
  @apply flex justify-between items-center py-0;
  @apply bg-white px-6 pt-4 !important;
  height: auto;
  line-height: initial;
}

.title {
  @apply mt-4 mb-0 pb-4;
  font-size: 20px;
  line-height: 28px;
}

.header ::v-deep .ant-tabs-bar.ant-tabs-top-bar {
  margin-bottom: 0;
}

.layout-content {
  @apply flex-1 overflow-hidden p-4 rounded;
}

.main {
  @apply h-full overflow-auto bg-white rounded;
}
</style>
