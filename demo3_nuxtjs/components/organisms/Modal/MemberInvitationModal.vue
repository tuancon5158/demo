<template>
  <Modal class="memberInvitationModal" :header-align="headerAlign" @onClose="handleClose">
    <!-- 招待URL発行 -->
    <template #header>
      <div class="memberInvitationModal_head">
        {{ $t('members.memberInvitationModal.heading') }}
      </div>
    </template>
    <template #body>
      <div class="memberInvitationModal_body">
        <FormMessage v-if="serverError" class="is-pc" :value="serverError" />
        <p class="memberInvitationModal_text">
          {{ $t('members.memberInvitationModal.note1') }}
          <span class="memberInvitationModal_text -small">
            {{ $t('members.memberInvitationModal.note2') }}
          </span>
        </p>
        <div class="memberInvitationModal_email" :class="errorClasses" @click="handleFocus">
          <Tag
            v-for="(item, index) in emailList"
            :key="index"
            class="memberInvitationModal_tag"
            bg-color="gray"
            icon-type="close"
            :label="item.value"
            @onDelete="deleteTag(index)"
          ></Tag>
          <input
            ref="lname"
            :value="inputValue"
            class="memberInvitationModal_input"
            @input="handleInput"
            @keydown.enter="handlePressEnter"
            @keyup.space="handlePressEnter"
            @keydown.delete="invokeDelete"
          />
        </div>
        <InputError
          v-if="errorMessage"
          class="memberInvitationModal_error"
          :value="errorMessage.email || errorMessage.limit || errorMessage.duplicate"
        />
      </div>
      <div class="memberInvitationModal_foot">
        <Button
          :label="$t('members.memberInvitationModal.button')"
          bg-color="blue"
          @onClick="handleClick"
        />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  useContext,
  reactive,
  onMounted
} from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import Button from '~/components/atoms/Button/Button.vue'
import Tag from '~/components/atoms/Tag/Tag.vue'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import {
  validateEmail,
  validateDuplicate,
  validateLimit
} from '~/composables/utilities/formValidate/validate'
import { injectNotification, injectWorkspace } from '~/composables'
import { debounce } from '~/composables/utilities/debounce'

const TIMER_DEBOUNCE = 500

export interface I_EmailListItem {
  value: string
}

export default defineComponent({
  name: 'MemberInvitationModal',

  components: {
    Modal,
    Button,
    Tag,
    InputError,
    FormMessage
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    deleteOnBackspace: {
      type: Boolean,
      default: true
    },
    maxTags: {
      type: Number,
      default: 20
    },
    headerAlign: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['center', 'left'].includes(value)
      }
    }
  },

  emits: ['onClose'],

  setup(props, { emit, refs }) {
    const inputValue = ref('')
    const emailList = ref<I_EmailListItem[]>([])
    const { getWorkspaceId } = injectWorkspace()
    const setNotiState = injectNotification()
    const serverError = ref('')

    const errorMessage = reactive({
      email: '',
      duplicate: '',
      limit: ''
    })
    const deletionMark = ref(-1)
    let deletionMarkTime

    watch(
      () => inputValue.value,
      (curr, prev) => {
        if (curr !== prev) {
          errorMessage.email = ''
          errorMessage.duplicate = ''
          errorMessage.limit = ''
        }
      }
    )

    onMounted(() => {
      handleFocus()
    })

    // return class error border
    const errorClasses = computed(() => {
      return {
        [`-border--error`]: errorMessage.email || errorMessage.limit || errorMessage.duplicate
      }
    })

    // return true if there is no error
    const isNotError = computed(
      () => emailList.value.length > 0 && Object.values(errorMessage).every((item) => item === '')
    )

    // handle close modal
    const handleClose = () => {
      emailList.value = []
      emit('onClose')
    }

    /**
     * handle create array tag value
     * @tag: <String> | tag input
     */
    const createTagValues = (tag: string) => {
      return tag.split(/;/).map((value) => {
        return { value: value.trim() }
      })
    }

    /**
     * handle delete item array tag based on index
     * @index: <Number> | index
     */
    const deleteTag = (index: number) => {
      if (inputValue.value) {
        return
      }

      deletionMark.value = -1
      clearTimeout(deletionMarkTime)
      emailList.value.splice(index, 1)
    }

    // delete item when user click key delete on keyboard
    const invokeDelete = () => {
      if (!props.deleteOnBackspace || emailList.value.length === 0) return

      const lastIndex = emailList.value.length - 1

      if (deletionMark.value === -1) {
        deletionMarkTime = setTimeout(() => (deletionMark.value = -1), 1000)
        deletionMark.value = lastIndex
      } else deleteTag(lastIndex)
    }

    const { app } = useContext()

    /**
     * add tag in array list
     * @objTag: <I_EmailListItem> | object tag input
     */
    const addTag = (objTag: I_EmailListItem) => {
      validateEmail(objTag.value, errorMessage, 'email', app)
      validateDuplicate(emailList.value, objTag.value, errorMessage, 'duplicate', app)
      validateLimit(emailList.value.length, props.maxTags, errorMessage, 'limit', app)

      const isFilter = Object.values(errorMessage).every((item) => item === '')

      if (isFilter) {
        errorMessage.duplicate = ''
        errorMessage.limit = ''
        inputValue.value = ''
        emailList.value.push(objTag)
      }
    }

    /**
     * add item when user click key enter or space on keyboard
     * @e: <KeyboardEvent> | event
     */
    const handlePressEnter = (e: KeyboardEvent) => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        let tags

        tags = createTagValues(inputValue.value)
        tags = tags.filter((tag) => tag.value.length > 0)
        tags.forEach((tag) => {
          addTag(tag)
        })
      }
    }

    // handle input will focus when show modal
    const handleFocus = () => {
      if (refs.lname) {
        const ele = refs.lname as HTMLElement
        ele.focus()
      }
    }

    // handle input change
    const handleInput = (event: { target: HTMLButtonElement }) => {
      inputValue.value = event.target.value
    }

    // handle submit add data when click button
    const handleClick = debounce(async () => {
      if (inputValue.value) {
        errorMessage.email = app.i18n.t('form.errorMessage.emailUnconfirm')
      }

      const emails = emailList.value.map((item) => item.value)

      if (!isNotError.value) return

      await app
        .$repository('members')
        .postMemberInvite({
          workspaceId: getWorkspaceId.value,
          emails
        })
        .then((response) => {
          const inviteExistUser = response?.data?.inviteExistUser
          const inviteNewUser = response?.data?.inviteNewUser

          if (inviteExistUser === 0 && inviteNewUser === 0) {
            setNotiState.setNotification(
              app.i18n.t('form.successMessage.inviteMember.alreadyRegistered'),
              'success'
            )
          } else {
            setNotiState.setNotification(
              `${inviteExistUser + inviteNewUser}${app.i18n.t(
                'form.successMessage.inviteMember.invited'
              )}`,
              'success'
            )
          }

          handleClose()
          emit('onAdded')
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          if (!errorKeyCode) {
            serverError.value = app.i18n.t('form.errorMessage.normal')
          } else if (errorKeyCode === 'workspaceUser.isLimit') {
            const { cnt, limit } = error.response?.data?.response?.args
            const exceedNum = cnt - limit

            serverError.value = `${app.i18n.t(
              'form.errorMessage.workspaceUser.isLimit.text1'
            )} ${limit} ${app.i18n.t(
              'form.errorMessage.workspaceUser.isLimit.text2'
            )}${exceedNum} ${app.i18n.t('form.errorMessage.workspaceUser.isLimit.text3')}`
          } else {
            errorKeyCode.value = serverError.value = app.i18n.t(`form.errorMessage.${errorKeyCode}`)
          }
        })
    }, TIMER_DEBOUNCE)

    return {
      handleClose,
      handlePressEnter,
      emailList,
      inputValue,
      errorMessage,
      deleteTag,
      invokeDelete,
      errorClasses,
      isNotError,
      handleFocus,
      handleInput,
      handleClick,
      serverError
    }
  }
})
</script>

<style lang="scss" scoped>
.memberInvitationModal {
  /deep/ .modal {
    min-width: 64rem;

    @include mb() {
      min-width: 90%;
    }
  }

  &_head {
    @include fz($font_size_xxl);
    font-weight: $font_weight_medium;
  }

  &_error {
    position: absolute;
    left: 0;
  }

  &_body {
    // border-top: 1px solid $color_gray_lighten1;
    border-bottom: 1px solid $color_gray_lighten1;
    padding-bottom: $spacing_6x;

    @include mb() {
      padding-bottom: $spacing_12x;
    }
  }

  &_text {
    @include fz($font_size_s);
    margin: 0 0 $spacing_6x 0;

    &.-small {
      display: block;
      @include fz($font_size_xs);
      margin-bottom: 0;
    }
  }

  &_foot {
    padding-top: $spacing_4x;
    text-align: right;
  }

  &_email {
    width: 100%;
    height: 76px;
    overflow: auto;
    background-color: $color_gray_50;
    border: 1px solid $color_gray_300;
    cursor: text;
    border-radius: $memberInvitation_BorderRadius;
    display: flex;
    flex-wrap: wrap;
    padding: $spacing_3x;
    align-items: stretch;

    &.-border--error {
      border: 1px solid $color_red_500;
    }
  }

  &_input {
    background: none;
    border: none;
    flex: 1;
    height: 24px;

    &:focus {
      outline: none;
    }
  }

  &_tag {
    align-self: flex-start;
    margin-right: $spacing_2x;
    margin-bottom: $spacing_2x;
    height: 24px;
    padding: $spacing_1x $spacing_2x !important;
  }
}
</style>
