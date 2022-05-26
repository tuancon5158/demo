<template>
  <section-layout-content v-bind="content">
    <div class="p-6">
      <a-steps
        v-model="step"
        class="custom-steps"
        size="small"
        type="navigation"
        @change="onChangeStep"
      >
        <a-step v-for="item in steps" :key="item.href" :title="item.label" />
      </a-steps>

      <nuxt-child></nuxt-child>
    </div>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRouter,
  useRoute,
  onMounted,
  watch,
} from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'
interface I_Step {
  label: string
  href: string
  step: number
}
export default defineComponent({
  name: 'ThuNhapNhanSu',

  components: {
    SectionLayoutContent,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()

    const step = ref<number>(0)

    const steps = computed(() => {
      return [
        {
          label: 'Đang trong kỳ',
          href: '/thu-nhap-nhan-su/dang-trong-ky?status=APPROVED',
          step: 0,
        },
        {
          label: 'Chờ duyệt',
          href: '/thu-nhap-nhan-su/cho-duyet?status=APPROVED',
          step: 1,
        },
        {
          label: 'Đã duyệt',
          href: '/thu-nhap-nhan-su/da-duyet?status=APPROVED',
          step: 2,
        },
        {
          label: 'Sẵn sàng thanh toán',
          href: '/thu-nhap-nhan-su/san-sang-thanh-toan',
          step: 3,
        },
      ]
    })

    const activatedStep = computed(() => {
      return steps.value[step.value]
    })

    const onChangeStep = () => {
      if (activatedStep.value) {
        router.push(activatedStep.value.href)
      }
    }

    watch(
      () => route.value.fullPath,
      () => {
        const currentStep = steps.value.find(
          (item: I_Step) =>
            item.href.replace('?status=APPROVED', '') === route.value.path
        )?.step

        step.value = currentStep || 0
      }
    )

    onMounted(() => {
      const currentStep = steps.value.find(
        (item: I_Step) => item.href === route.value.fullPath
      )?.step

      step.value = currentStep || 0
    })

    return {
      step,
      steps,
      activatedStep,
      onChangeStep,
      content: computed(() => {
        const title = activatedStep.value?.label

        return {
          breadcrumbs: ['Thu nhập nhân sự', title],
          title,
        }
      }),
    }
  },
})
</script>

<style lang="postcss" scoped>
.custom-steps >>> {
  .ant-steps-item-container {
    padding-bottom: 28px;
  }

  .ant-steps-item-icon {
    display: none;
  }

  .ant-steps-item::before {
    height: 2px;
  }

  .ant-steps-item-active .ant-steps-item-content > * {
    @apply text-primary;
  }

  .ant-steps-item-content > * {
    @apply text-black;
  }
}
</style>
