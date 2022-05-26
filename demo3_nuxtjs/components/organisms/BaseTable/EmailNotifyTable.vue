<template>
  <div class="boxTable">
    <DataTable
      select
      filter
      :loading="isData"
      :rows="tableData"
      :columns="columns"
      :pagination="pagination"
      @visibilityChanged="visibilityChanged"
    >
      <template #select>
        <div class="tableFilter"></div>
      </template>
      <template #filter>
        <SearchBox
          class="boxTable_search"
          :model-value="filter.search"
          :placeholder="$t('members.table.placeHolder1')"
          @update:modelValue="handleInputSearch"
        />
      </template>
      <template #thead="{ column }">
        <TableHeadCell>
          <div>
            <label for="userChekcbox" v-text="column.user.title"></label>
          </div>
        </TableHeadCell>

        <TableHeadCell @clicked="handleSortBy('lastLoginDate', column.lastLoginAt)">
          <div class="boxTable_thead_col">
            <span class="boxTable_thead_col_text">
              {{ column.lastLoginAt.title }}
            </span>
            <IconBase
              :class="{ boxTable_thead_col_rotate: column.lastLoginAt.orderBy === ascend }"
              icon-color="#E0DFE2"
              width="12"
              icon-name="arrow-down"
              height="12"
              viewBox="0 0 12 12"
            >
              <IconArrowDown
                :fill="
                  column.lastLoginAt.orderBy === ascend || column.lastLoginAt.orderBy === descend
                    ? ' #000 '
                    : ''
                "
              />
            </IconBase>
          </div>
        </TableHeadCell>
      </template>
      <template #tbody="{ row, index }">
        <TableBodyCell :class="[currenUserId !== row.userId ? 'disable' : '']">
          <div class="boxTable_user">
            <div class="boxTable_user_checkbox">
              <CheckBox
                class="checkbox"
                :checked="row.isMailNotify"
                :id="index"
                :disabled="currenUserId !== row.userId"
                :typeCheckBox="row.isMailNotify || currenUserId == row.userId ? 'check' : 'empty'"
                @onCheck="handleUserItemSelect(row.id, row.isMailNotify)"
                @onUnCheck="handleUserItemSelect(row.id, row.isMailNotify)"
              />
            </div>
            <div class="boxTable_user_avatar">
              <CircleImage
                class="boxTable_user_image"
                size="32px"
                :path="convertFullPath(row.user.thumbnailUrl || '')"
                :alt="row.user.name"
              />
              <div class="boxTable_user_infomation">
                <p v-if="row.user.name" class="boxTable_user_name">
                  {{ row.user.name }}
                </p>
                <p v-if="row.user.email" class="boxTable_user_email">
                  {{ row.user.email }}
                </p>
              </div>
            </div>
          </div>
        </TableBodyCell>

        <TableBodyCell :class="[currenUserId !== row.userId ? 'disable' : '']">
          {{ row.user.lastLoginDate ? getYmdTime(row.user.lastLoginDate) : '' }}
        </TableBodyCell>
      </template>
      <template #loading>
        <transition name="fade">
          <div class="boxTable_wrapperLoading">
            <Spinner class="boxTable_loading" size="medium" color="black" bg-color="gray" />
          </div>
        </transition>
      </template>
      <template #empty>
        <span>{{ $t('members.table.emptyText') }}</span>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  useContext,
  PropType,
  SetupContext,
  watch
} from '@nuxtjs/composition-api'
// components
import DataTable from '~/components/organisms/BaseTable/DataTable.vue'
import CircleImage from '~/components/atoms/Image/CircleImage.vue'
import TableHeadCell from '~/components/organisms/BaseTable/TableHeadCell.vue'
import TableBodyCell from '~/components/organisms/BaseTable/TableBodyCell.vue'
import SearchBox from '~/components/atoms/Form/SearchBox/SearchBox.vue'
import IconArrowDown from '~/components/icons/IconArrowDown.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import CheckBox from '~/components/atoms/Form/CheckBox/CheckBox.vue'
import { dateFormat } from '~/composables/utilities/dateFormat'
import { I_MembersList } from '~/types/schema/members'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'

// Interface
interface I_Filter {
  sort: string
  direction: string
  sortAlias: string
  search: string
}

interface I_Sort {
  orderBy: string
  title: string
}

type BaseTableProps = {
  arrData: I_MembersList[]
  filter: I_Filter
  isData: boolean
}

export default defineComponent({
  name: 'EmailNotifyTable',

  components: {
    DataTable,
    CircleImage,
    TableHeadCell,
    TableBodyCell,
    SearchBox,
    IconArrowDown,
    IconBase,
    Spinner,
    CheckBox
  },

  props: {
    arrData: {
      type: Array as PropType<I_MembersList[]>,
      required: true
    },
    filter: {
      type: Object as PropType<I_Filter>,
      required: true
    },
    isData: {
      type: Boolean,
      default: false
    }
  },

  emits: ['onSearch', 'onFilter', 'visibilityChanged'],

  setup(props: BaseTableProps, context: SetupContext) {
    const { app, $auth } = useContext()
    const { $config } = context.root
    const pagination = ref({})
    const descend = 'DESC'
    const ascend = 'ASC'
    const { getYmdTime } = dateFormat()

    //columns table
    const columns = reactive({
      user: {
        title: app.i18n.t('newGuestNotifications.table.columns.user'),
        orderBy: ''
      },
      lastLoginAt: {
        title: app.i18n.t('newGuestNotifications.table.columns.lastLogin'),
        orderBy: ''
      }
    })

    //data each row
    //computed because props loose reactive when pass to setup, can use directly in template

    const tableData = computed(() => props.arrData)

    /**
     * get thumbnail url based on config domain
     * @imageKey: <String> | url image
     */
    const convertFullPath = (imageKey: string): string => {
      if (!imageKey) {
        return ''
      }
      return `${$config.frontURL}/${imageKey}`
    }

    const currenUserId = computed(() => $auth.user.id)

    // handle when user checkbox it row
    let currentNotify = 0
    const handleUserItemSelect = (userId: number, isMailNotify: boolean) => {
      currentNotify++
      const newiIsMailNotify = currentNotify % 2 === 0 ? isMailNotify : !isMailNotify
      context.emit('onSelectUser', { id: userId, isMailNotify: newiIsMailNotify })
    }

    // handle sort when user click filter
    const handleSortBy = (name: string, selectColumn: I_Sort) => {
      for (const property in columns) {
        if (columns[property].title !== selectColumn.title) {
          columns[property].orderBy = ''
        } else if (selectColumn.orderBy === '') {
          columns[property].orderBy = descend
          context.emit('onFilter', { sort: name, direction: descend })
        } else if (selectColumn.orderBy === descend) {
          columns[property].orderBy = ascend
          context.emit('onFilter', { sort: name, direction: ascend })
        } else {
          columns[property].orderBy = ''
          context.emit('onFilter', { sort: name, direction: '' })
        }
      }
    }

    /**
     * handle input search
     * @value: <String> | value of input search
     */
    const handleInputSearch = (value: string) => {
      if (value) context.emit('onSearch', value.trim())
      else context.emit('onSearch')
    }

    // -- WATCHER --//

    watch(
      props.filter,
      (value) => {
        if (value.sort === 'lastLoginDate') {
          columns.lastLoginAt.orderBy = value.direction
        } else {
          columns.lastLoginAt.orderBy = ''
        }
      },
      { deep: true }
    )

    const visibilityChanged = (isVisible: boolean) => {
      context.emit('visibilityChanged', isVisible)
    }

    return {
      descend,
      ascend,
      getYmdTime,
      columns,
      pagination,
      handleSortBy,
      handleUserItemSelect,
      handleInputSearch,
      convertFullPath,
      tableData,
      currenUserId,
      visibilityChanged
    }
  }
})
</script>
<style lang="scss" scoped>
.tableFilter {
  position: relative;

  &_button {
    padding-left: $spacing_4x !important;
    height: 40px;
    display: inline-flex;
    align-items: center;
    width: 141px;
    text-transform: uppercase;
    margin-bottom: $spacing_2x;

    @include mb() {
      width: 100%;
      margin-top: $spacing_2x;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid $color_white;
      top: 50%;
      transform: translateY(-50%);
      right: 11px;
    }
  }

  &_dropdown {
    z-index: 4;
    top: 85% !important;
  }
}

.boxTable {
  background-color: $color_light_blue_100;
  @include scrollbar(2);

  &_search {
    @include mb() {
      width: 100% !important;
    }
  }

  &_wrapperLoading {
    text-align: center;
    position: absolute;
    padding: $spacing_1x;
    border-radius: 5px;
    left: 50%;
    top: 50%;
    z-index: 9000;
    transform: translate(-50%, -50%);
  }

  &_thead {
    height: 40px;

    &_col {
      display: inline-flex;
      align-items: center;
      cursor: pointer;

      &_text {
        margin-right: $spacing_3x;
      }

      &_rotate {
        transform: rotate(180deg);
      }
    }
  }

  &_user {
    display: inline-flex;
    align-items: center;

    &_checkbox {
      height: inherit;
      display: inline-flex;
      align-items: center;
      .checkbox {
        margin-right: $spacing_4x;
        cursor: pointer;
      }

      input[type='checkbox']:checked:disabled {
        display: inline-block;
        width: 20px;
        height: 20px;
        content: '✓';
        text-align: center;
      }
    }

    &_image {
      margin-right: $spacing_3x;
    }

    &_avatar {
      display: inline-flex;
      align-items: center;
    }

    &_infomation {
      flex: 1;
      word-break: break-all;
    }

    &_name {
      margin: 0;
      font-weight: $font_weight_medium;
      @include fz($font_size_xs);
      line-height: 21px;
      color: $color_gray_900;
    }

    &_email {
      margin: 0;
      font-style: normal;
      font-weight: $font_weight_normal;
      @include fz($font_size_xxxs);
      line-height: 18px;
      color: $color_gray_700;
      @include ls(33);
    }
  }
}

.tableRole {
  position: relative;
  width: fit-content;

  &_textRole {
    color: $color_blue_400;
    margin: 0;
  }

  &_text {
    color: $color_blue_400;
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    &::after {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid $color_blue_400;
      display: inline-block;
      margin-left: $spacing_1x;
      content: '';
    }
  }

  &_dropdown {
    z-index: 3;
    &_bottom {
      bottom: 100%;
      top: unset !important;
    }
  }
}

.tableLoadMore {
  position: relative;

  &_dropdown {
    z-index: 3;
    right: 45px;
    &_bottom {
      bottom: 100%;
      top: unset !important;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.disable {
  pointer-events: none;
  background: $color_gray_200;
}
</style>
