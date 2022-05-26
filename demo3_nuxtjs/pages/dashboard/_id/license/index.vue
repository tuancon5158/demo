<template>
  <div class="dashboard_license">
    <DashboardHeading
      icon-type="license"
      :title="$t('license.title')"
      :subtitle="$t('license.subtitle')"
    />
    <div v-show="isDataExist" class="dashboard_license_list">
      <div
        v-for="(license, index) in licenseList"
        :key="'license' + index"
        class="dashboard_license_item"
      >
        <LicenseCard
          :name="license.name"
          :subtitle="license.subtitle"
          :name-link="license.nameLink"
          :link="license.link"
          :hash="license.hash"
          :date="license.date"
        />
      </div>
    </div>
    <div v-if="!isDataExist">
      <Spinner size="medium" color="secondary" bg-color="gray" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import LicenseCard from '~/components/molecules/LicenseCard/LicenseCard.vue'
import { useGetInfoPlan } from '~/composables'

export default defineComponent({
  name: 'ManageLicense',

  components: { LicenseCard, DashboardHeading, Spinner },

  layout: 'dashboard',

  setup() {
    const { getInfoPlan, licenseList, isDataExist } = useGetInfoPlan()

    onMounted(async () => {
      await getInfoPlan()
    })

    return {
      licenseList,
      isDataExist
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  &_license {
    @include mb() {
      padding: 0;
    }

    &_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &_item {
      flex: 0 0 auto;
      width: calc(50% - 1.6rem);
      margin-bottom: $spacing_8x;

      @include mb() {
        padding: $spacing_2x 0;
        width: 100%;
        margin-bottom: 0;
      }
    }
  }
}
</style>
