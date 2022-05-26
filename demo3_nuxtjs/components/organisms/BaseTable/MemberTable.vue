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
        <div class="tableFilter">
          <div v-if="memberRole && memberRoleId !== memberRole.MEMBER">
            <Button
              ref="buttonDropdown"
              bg-color="blue"
              :label="$t('members.table.roleTitle')"
              :disabled="arrUserSelected.length === 0"
              class="tableFilter_button"
              @onClick="handleShowRole"
            />
            <Dropdown
              v-show="showRole"
              v-closable="{
                exclude: ['buttonDropdown'],
                handler: 'handleClickOutSizeRole'
              }"
              class="top tableFilter_dropdown"
              :menu-items="listRole"
              :menu-selected="true"
              position="bottom"
              @onClickOwner="handleRole(memberRole.OWNER)"
              @onClickAdmin="handleRole(memberRole.ADMIN)"
              @onClickMember="handleRole(memberRole.MEMBER)"
            />
          </div>
        </div>
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
          <div class="boxTable_thead_checkbox">
            <CheckBox
              :checked="allSelected"
              id="userChekcbox"
              ref="thCheckBoxElement"
              :disabled="isCheckBoxDisabled"
              @onCheck="handleSelectAll"
              @onUnCheck="handleSelectAll"
            />
          </div>
        </TableHeadCell>
        <TableHeadCell @clicked="handleSortBy('memberRole', column.role)">
          <div class="boxTable_thead_col">
            <span class="boxTable_thead_col_text" v-text="column.role.title"></span>
            <IconBase
              :class="{ boxTable_thead_col_rotate: column.role.orderBy === ascend }"
              icon-color="#E0DFE2"
              width="12"
              icon-name="arrow-down"
              height="12"
              viewBox="0 0 12 12"
            >
              <IconArrowDown
                :fill="
                  column.role.orderBy === ascend || column.role.orderBy === descend ? ' #000 ' : ''
                "
              />
            </IconBase>
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
        <TableHeadCell></TableHeadCell>
      </template>
      <template #tbody="{ row, index }">
        <TableBodyCell>
          <div class="boxTable_user">
            <div class="boxTable_user_checkbox">
              <CheckBox
                class="checkbox"
                :checked="!!arrUserSelected.find((item) => item.userId === row.user.id)"
                :value="{
                  memberRole: row.memberRole,
                  userId: row.user.id,
                  workspaceId: getWorkspaceId
                }"
                :id="row.user.id"
                :disabled="row.memberRole <= memberRoleId"
                :typeCheckBox="row.memberRole <= memberRoleId ? 'empty' : 'check'"
                @onCheck="(value) => handleUserItem(value, 'add')"
                @onUnCheck="(value) => handleUserItem(value, 'remove')"
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
        <TableBodyCell>
          <div class="tableRole">
            <div v-if="row.memberRole > memberRoleId">
              <a
                :id="'dropdownItem-' + row.id"
                :ref="'dropdownItem-' + row.id"
                class="tableRole_text"
                @click="handleOpenUserRoleDropDown(row.id)"
              >
                {{ objRole[row.memberRole] ? objRole[row.memberRole].label : '' }}
              </a>
              <Dropdown
                v-if="row.id === showUserRole"
                v-closable="{
                  exclude: [`dropdownItem-${row.id}`],
                  handler: 'handleCloseAllDropdown'
                }"
                :menu-items="listRole"
                :menu-selected="true"
                class="tableRole_dropdown"
                :class="
                  tableData.length > 2 &&
                  (index === tableData.length - 1 || index === tableData.length - 2)
                    ? 'tableRole_dropdown_bottom'
                    : ''
                "
                position="bottom"
                @onClickOwner="handleUserRole(memberRole.OWNER, row.user.id)"
                @onClickAdmin="handleUserRole(memberRole.ADMIN, row.user.id)"
                @onClickMember="handleUserRole(memberRole.MEMBER, row.user.id)"
              />
            </div>
            <p v-else class="tableRole_textRole">
              {{ objRole[row.memberRole] ? objRole[row.memberRole].label : '' }}
            </p>
          </div>
        </TableBodyCell>
        <TableBodyCell>
          {{ row.user.lastLoginDate ? getYmdTime(row.user.lastLoginDate) : '' }}
        </TableBodyCell>
        <TableBodyCell>
          <div v-if="row.memberRole > memberRoleId" class="tableLoadMore">
            <LoadMore
              :id="'deleteItem-' + row.id"
              :ref="'deleteItem-' + row.id"
              color="gray"
              @onClick="handleOpenUserDeleteDropDown(row.id)"
            />
            <Dropdown
              v-if="row.id === showUserDelete"
              v-closable="{
                exclude: [`deleteItem-${row.id}`],
                handler: 'handleCloseAllDropdown'
              }"
              :menu-items="menuMemberItems"
              :menu-selected="true"
              position="bottom"
              class="tableLoadMore_dropdown"
              :class="
                tableData.length > 2 &&
                (index === tableData.length - 1 || index === tableData.length - 2)
                  ? 'tableRole_dropdown_bottom'
                  : ''
              "
              @onClose="handleUserDelete(row.id)"
            />
          </div>
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
    <div>
      <Dialogue
        v-if="visibleDialogue"
        is-delete
        :title="dialogue.title"
        :back-button="dialogue.backButton"
        :confirm-button="dialogue.confirmButton"
        @onClose="handleConfirmModal"
        @onValidate="handleCloseModal('delete')"
      />
    </div>
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
import Button from '~/components/atoms/Button/Button.vue'
import CheckBox from '~/components/atoms/Form/CheckBox/CheckBox.vue'
import DataTable from '~/components/organisms/BaseTable/DataTable.vue'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'
import CircleImage from '~/components/atoms/Image/CircleImage.vue'
import TableHeadCell from '~/components/organisms/BaseTable/TableHeadCell.vue'
import TableBodyCell from '~/components/organisms/BaseTable/TableBodyCell.vue'
import SearchBox from '~/components/atoms/Form/SearchBox/SearchBox.vue'
import IconArrowDown from '~/components/icons/IconArrowDown.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import LoadMore from '~/components/molecules/LoadMore/LoadMore.vue'
import { dateFormat } from '~/composables/utilities/dateFormat'
import Dropdown from '~/components/molecules/Dropdown/Dropdown.vue'
import { I_MembersList, I_Patch_Members_Request } from '~/types/schema/members'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import { injectWorkspace, useOpenCloseToggle } from '~/composables'
import { memberRole } from '~/constants/userRole'

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
  memberRoleId: number
}

export default defineComponent({
  name: 'MemberTable',

  components: {
    CheckBox,
    Button,
    DataTable,
    CircleImage,
    TableHeadCell,
    TableBodyCell,
    SearchBox,
    IconArrowDown,
    IconBase,
    LoadMore,
    Dropdown,
    Spinner,
    Dialogue
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
    },
    memberRoleId: {
      type: Number,
      default: 0
    }
  },

  emits: ['onSearch', 'onFilter', 'onRole', 'onDelete', 'visibilityChanged'],

  setup(props: BaseTableProps, context: SetupContext) {
    const { app } = useContext()
    const { $config } = context.root
    const LIMIT = 10
    const pagination = ref({})
    const arrUserSelected = ref<I_Patch_Members_Request[]>([])
    const allSelected = ref(false)
    const descend = 'DESC'
    const ascend = 'ASC'
    const { getWorkspaceId } = injectWorkspace()
    const { getYmdTime } = dateFormat()
    const userDeleteId = ref(0)

    const {
      open: handleOpenDialogue,
      close: handleCloseDialogue,
      visible: visibleDialogue
    } = useOpenCloseToggle()

    const dialogue = reactive({
      title: app.i18n.t('members.confirm.delete'),
      backButton: app.i18n.t('members.confirm.deleteButton'),
      confirmButton: app.i18n.t('members.confirm.cancelButton')
    })

    const menuMemberItems = [
      {
        label: app.i18n.t('members.deleteUser'),
        color: 'red',
        action: 'onClose'
      }
    ]

    const columns = reactive({
      user: {
        title: 'User',
        orderBy: ''
      },
      role: {
        title: 'Role',
        orderBy: ''
      },
      lastLoginAt: {
        title: 'Last Login',
        orderBy: ''
      }
    })

    const listRole = ref([
      {
        value: memberRole.ADMIN,
        label: app.i18n.t('members.admin'),
        color: 'black',
        action: 'onClickAdmin'
      },
      {
        value: memberRole.MEMBER,
        label: app.i18n.t('members.member'),
        color: 'black',
        action: 'onClickMember'
      }
    ])

    // convert array role list to object role
    const objRole = computed(() => {
      const obj = listRole.value.reduce((prev, curr) => {
        prev[curr.value] = { label: curr.label }

        return prev
      }, {})

      obj[memberRole.OWNER] = {
        label: app.i18n.t('members.owner')
      }

      return obj
    })

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

    // handle when user checkbox it row
    const handleUserItem = (value, status = '') => {
      allSelected.value = false

      //handle add and remove item
      if (status === 'add') {
        arrUserSelected.value.push(value)
      } else {
        arrUserSelected.value = arrUserSelected.value.filter((item) => item.userId !== value.userId)
      }

      // Check button select all auto
      if (
        arrUserSelected.value.length ===
        props.arrData.filter((item) => item.memberRole > props.memberRoleId).length
      ) {
        allSelected.value = true
      }
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

    // handle when user change role all
    const handleButtonChangeRoleAll = () => {
      const showRole = ref(false)

      // open button select all role
      const handleShowRole = () => {
        showRole.value = !showRole.value
      }

      // close button select all role
      const handleClickOutSizeRole = () => {
        showRole.value = false
      }

      // handle change all role
      const handleRole = (memberRole: number) => {
        let arrUserSelectedCopy: I_Patch_Members_Request[] = []

        arrUserSelectedCopy = arrUserSelected.value.map((item) => {
          return { ...item, memberRole }
        })

        if (arrUserSelectedCopy.length > 0) {
          context.emit('onRole', arrUserSelectedCopy)
        }

        showRole.value = false
      }

      return { showRole, handleShowRole, handleClickOutSizeRole, handleRole }
    }

    /**
     * handle input search
     * @value: <String> | value of input search
     */
    const handleInputSearch = (value: string) => {
      if (value) context.emit('onSearch', value.trim())
      else context.emit('onSearch')
    }

    // handle when user checkbox all
    const handleCheckAll = () => {
      const thCheckBoxElement = ref()
      const isCheckBoxDisabled = ref(false)
      // click to select all
      const handleSelectAll = () => {
        allSelected.value = !allSelected.value
        arrUserSelected.value = []

        let arrData: I_MembersList[] = []

        if (props.memberRoleId !== memberRole.MEMBER) {
          arrData = props.arrData.filter((item) => item.memberRole > props.memberRoleId)
        }

        if (allSelected.value) {
          arrData.forEach((user) => {
            arrUserSelected.value.push({
              memberRole: user.memberRole,
              userId: user.userId,
              workspaceId: getWorkspaceId.value || ''
            })
          })
        }
      }

      watch(
        () => props.arrData,
        (newVal) => {
          // if all item cant modify, disabled checkbox select all
          const check = newVal.map((item) => item.memberRole > props.memberRoleId)

          if (check.includes(true)) {
            isCheckBoxDisabled.value = false
          } else {
            isCheckBoxDisabled.value = true
          }

          // // load more data, check with checkboxElement to get All or not
          // if (newVal.length > LIMIT && thCheckBoxElement.value.checked === true) {
          //   handleSelectAll()
          // } // load again
          if (newVal.length <= LIMIT) {
            thCheckBoxElement.value.$el.children[0].checked = false
            arrUserSelected.value = []
          }
        }
      )

      return { thCheckBoxElement, handleSelectAll, isCheckBoxDisabled }
    }

    // handle dropdown
    const handleDropDown = () => {
      const showUserRole = ref(-1)
      const showUserDelete = ref(-1)
      // --USER ROLE--//
      // click to show dropdown

      const handleOpenUserRoleDropDown = (value) => {
        showUserRole.value = showUserRole.value === value ? -1 : value
        showUserDelete.value = -1
      }

      // click to change
      const handleUserRole = (memberRole: number, userId: number) => {
        const userMember: I_Patch_Members_Request[] = [
          { memberRole, userId, workspaceId: getWorkspaceId.value || '' }
        ]

        context.emit('onRole', userMember)
        showUserRole.value = -1
      }

      // --USER DELETE--//
      // click to show dropdown
      const handleOpenUserDeleteDropDown = (value: number) => {
        showUserDelete.value = showUserDelete.value === value ? -1 : value
        showUserRole.value = -1
      }

      // check and toggle dropdown
      const handleCloseAllDropdown = (event: { target: HTMLInputElement }) => {
        if (
          showUserDelete.value &&
          (!event.target.id ||
            event.target.id === 'dataTable-table' ||
            event.target.id === 'dashboard-main')
        ) {
          showUserDelete.value = -1
        }

        if (
          showUserRole.value &&
          (!event.target.id ||
            event.target.id === 'dataTable-table' ||
            event.target.id === 'dashboard-main')
        ) {
          showUserRole.value = -1
        }
      }

      // click to change
      const handleUserDelete = (id: number) => {
        handleOpenDialogue()
        userDeleteId.value = id
        showUserDelete.value = -1
      }

      // computed because props loose reactive when pass to setup, can use directly in template
      const tableData = computed(() => props.arrData)

      watch(
        () => props.arrData,
        (newVal) => {
          if (newVal.length <= LIMIT) {
            showUserDelete.value = -1
            showUserRole.value = -1
          }
        }
      )

      return {
        tableData,
        showUserRole,
        showUserDelete,
        handleOpenUserRoleDropDown,
        handleOpenUserDeleteDropDown,
        handleCloseAllDropdown,
        handleUserDelete,
        handleUserRole
      }
    }

    // -- WATCHER --//

    watch(
      props.filter,
      (value) => {
        if (value.sort === 'lastLoginDate') {
          columns.lastLoginAt.orderBy = value.direction
        } else if (value.sort === 'memberRole') {
          columns.role.orderBy = value.direction
        } else {
          columns.lastLoginAt.orderBy = ''
          columns.role.orderBy = ''
        }
      },
      { deep: true }
    )

    // -- DIALOGUE --//
    // click confirm dialogue delete user
    const handleConfirmModal = () => {
      if (!userDeleteId.value) {
        return
      }

      context.emit('onDelete', userDeleteId.value)
      handleCloseModal()
    }

    // click close dialogue delete user
    const handleCloseModal = () => {
      handleCloseDialogue()
      userDeleteId.value = 0
    }

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
      handleUserItem,
      allSelected,
      arrUserSelected,
      handleInputSearch,
      listRole,
      objRole,
      menuMemberItems,
      convertFullPath,
      getWorkspaceId,
      memberRole,
      dialogue,
      visibleDialogue,
      handleConfirmModal,
      handleCloseModal,
      visibilityChanged,
      ...handleButtonChangeRoleAll(),
      ...handleCheckAll(),
      ...handleDropDown()
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
      border-top: 5px solid white;
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

  // &_loading {
  //   // background-color: $color_light_blue_100;
  // }

  &_thead {
    height: 40px;

    &_checkbox {
      height: 40px;
      display: inline-flex;
      align-items: center;
      input {
        width: 18px;
        height: 18px;
        margin-right: $spacing_3x;
        cursor: pointer;
      }
    }

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
</style>
