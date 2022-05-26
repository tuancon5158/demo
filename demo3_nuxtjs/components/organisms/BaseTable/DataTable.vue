<template>
  <div class="dataTable">
    <client-only>
      <div class="dataTable_top">
        <slot v-if="select" name="select" />
        <slot v-if="filter" name="filter" />
      </div>
    </client-only>
    <div class="dataTable_wrapper">
      <client-only>
        <slot v-if="!loading" name="loading">
          <LoadingBar height="5" />
        </slot>
        <table class="dataTable_table">
          <thead class="dataTable_thead">
            <tr class="dataTable_thead_tr">
              <slot name="thead" :column="columns">
                <TableHeadCell
                  v-for="(label, key) in columns"
                  :key="`datatable-thead-th-${key}`"
                  scope="col"
                  class="dataTable_thead_th"
                ></TableHeadCell>
              </slot>
            </tr>
          </thead>
          <tbody v-if="isTableRows" class="dataTable_tbody">
            <tr
              v-for="(row, rowIndex) in tableRows"
              :key="`datatable-tbody-tr-${row.id}`"
              class="dataTable_tbody_tr"
            >
              <slot name="tbody" :index="rowIndex" :row="row">
                <TableBodyCell
                  v-for="(label, key) in row"
                  :key="`datatable-tbody-tr-${key}`"
                  :name="label"
                  class="dataTable_tbody_td"
                ></TableBodyCell>
              </slot>
            </tr>
            <div
              v-observe-visibility="{
                callback: visibilityChanged,
                once: false,
                intersection: {
                  rootMargin: '50px'
                }
              }"
            />
          </tbody>
        </table>
        <div v-if="loading && isNotTableRows" class="dataTable_table_noData">
          <slot name="empty"></slot>
        </div>
      </client-only>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, PropType } from '@nuxtjs/composition-api'
import { defineComponent } from '@vue/composition-api'
import TableHeadCell from '~/components/organisms/BaseTable/TableHeadCell.vue'
import LoadingBar from '~/components/atoms/LoadingBar/LoadingBar.vue'

interface I_User {
  user: object
  role: number
  createdAt: string
}

type DataTableProps = {
  rows: I_User[]
  columns: object
  loading: boolean
  filter: boolean
  select: boolean
  classTable: string
}

export default defineComponent({
  name: 'DataTable',

  components: {
    TableHeadCell,
    LoadingBar
  },

  props: {
    rows: { type: Array as PropType<I_User[]>, required: true },
    columns: { type: Object, default: null },
    loading: { type: Boolean, default: false },
    filter: { type: Boolean, default: false },
    select: { type: Boolean, default: false }
  },

  emits: ['visibilityChanged'],

  setup(props: DataTableProps, { emit }) {
    const tableRows = computed(() => props.rows)

    const isTableRows = computed(() => tableRows.value.length > 0)

    const isNotTableRows = computed(() => tableRows.value.length === 0)

    const visibilityChanged = (isVisible: boolean) => {
      emit('visibilityChanged', isVisible)
    }

    return {
      tableRows,
      isTableRows,
      isNotTableRows,
      visibilityChanged
    }
  }
})
</script>
<style lang="scss" scoped>
.dataTable {
  position: relative;
  overflow: hidden;

  @include mb() {
    position: unset;
  }

  &_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing_5x;

    @include mb() {
      flex-wrap: wrap-reverse;
      margin-bottom: $spacing_2x;
    }
  }
  &_search {
    height: 40px;
    width: 260px;
    font-style: normal;
    font-weight: $font_weight_normal;
    @include fz($font_size_s);
    line-height: 24px;
    color: $color_gray_600;
    border: 1px solid $color_light_blue_200;
    border-radius: 6px;
    padding: $spacing_2x $spacing_3x;
    &:focus {
      outline: none;
    }
  }

  &_wrapper {
    overflow: overlay;
    border-radius: 8px;
    max-height: calc(100vh - 32.6rem);
    height: calc(100vh - 32.6rem);

    @-moz-document url-prefix() {
      overflow: auto;
    }

    @include mb() {
      overflow: auto;
      max-height: calc(100vh - 25.6rem);
      height: auto;
      background: $color_white;
    }
  }

  &_table {
    min-width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    background-color: $color_white;
    border: 1px solid $color_gray_100;
    padding: $spacing_1x 0;

    @include mb() {
      width: 964px;
      height: 100%;
    }

    &_noData {
      text-align: center;
      background: $color_white;
      padding: $spacing_3x $spacing_5x;
    }
  }

  &_thead {
    height: 40px;
    border-bottom: 1px solid $color_gray_100;
    background-color: $color_white;
    position: sticky;
    top: -2px;
    z-index: 3;

    .th {
      &:nth-child(1) {
        width: 46%;
      }
      &:nth-child(2) {
        width: 20%;
      }
    }
  }

  &_tbody {
    &_tr {
      height: 64px;
      border-bottom: 1px solid $color_gray_100;
      &:last-child {
        border-bottom: none;
      }
    }

    &_td {
      padding: $spacing_3x $spacing_5x;
    }
  }
}

.baseTableStorybook {
  .dataTable_wrapper {
    max-height: 100%;
  }
}
</style>
