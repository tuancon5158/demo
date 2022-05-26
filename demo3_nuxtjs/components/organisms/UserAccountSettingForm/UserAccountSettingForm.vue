<template>
  <div>
    <FormContainer :title="$t('mypage.account.user.heading')" class="accountSetting">
      <template #formContents>
        <TableDataList
          :title="basicInfoTitles"
          class="tableDataList"
          :hide-item="isAvailablePasswordChange ? null : 2"
        >
          <template #data_1>
            <div v-if="$auth.user">{{ $auth.user.name }}</div>
          </template>
          <template #data_2>
            <div class="accountSetting_section_item">
              <div v-if="$auth.user">
                {{ $auth.user.email }}
              </div>
              <div v-if="isAvailableEmailChange" class="button">
                <Button
                  bg-color="secondary"
                  border-color="secondary"
                  size="xsmall"
                  :label="$t('mypage.account.changeButton')"
                  @onClick="openEmail"
                />
              </div>
            </div>
          </template>
          <template #data_3>
            <div class="accountSetting_section_item">
              <div>・・・・・・・・</div>
              <div v-if="isAvailablePasswordChange" class="button">
                <Button
                  bg-color="secondary"
                  border-color="secondary"
                  size="xsmall"
                  :label="$t('mypage.account.changeButton')"
                  @onClick="openPassword"
                />
              </div>
            </div>
          </template>
          <template #data_4>
            <div class="accountSetting_section_item">
              <div class="accountSetting_socialLinked">
                <!-- connectedFacebook -->
                <div
                  v-if="$auth.user && $auth.user.connectedFacebook === 1"
                  class="accountSetting_socialLinked_item"
                >
                  <img src="~/assets/images/icon/icon-facebook-blue.svg" alt="slider3" />
                  <span>{{ $t('mypage.account.user.isSNSLogin.facebook') }}</span>
                </div>
                <div
                  v-if="$auth.user && $auth.user.connectedGoogle === 1"
                  class="accountSetting_socialLinked_item"
                >
                  <img
                    src="~/assets/images/icon/icon-google.svg"
                    :alt="$t('mypage.account.user.isSNSLogin.google')"
                  />
                  <span>{{ $t('mypage.account.user.isSNSLogin.google') }}</span>
                </div>
                <!-- connectedApple -->
                <div
                  v-if="$auth.user && $auth.user.connectedApple === 1"
                  class="accountSetting_socialLinked_item"
                >
                  <img
                    src="~/assets/images/icon/icon-apple.svg"
                    :alt="$t('mypage.account.user.isSNSLogin.apple')"
                  />
                  <span>{{ $t('mypage.account.user.isSNSLogin.apple') }}</span>
                </div>
                <div
                  v-if="
                    $auth.user.connectedFacebook !== 1 &&
                    $auth.user.connectedGoogle !== 1 &&
                    $auth.user.connectedApple !== 1
                  "
                >
                  ー
                </div>
              </div>
            </div>
          </template>
        </TableDataList>

        <EmailPasswordChangeModal ref="modalWorkspace" />
      </template>
    </FormContainer>
    <UserDeleteForm
      class="userDelete"
      :heading="$t('mypage.account.user.membership.heading')"
      :content="$t('mypage.account.user.membership.text')"
      :button-text="$t('mypage.account.user.membership.link')"
      :dialogue="{
        title: $t('mypage.account.user.membership.modal.confimText'),
        backButton: $t('mypage.account.user.membership.modal.submit'),
        confirmButton: $t('mypage.account.user.membership.modal.close')
      }"
      @onDelete="handleDeleteAccount"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  useRouter,
  SetupContext,
  computed
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import UserDeleteForm from '~/components/molecules/DeleteForm/DeleteForm.vue'
import EmailPasswordChangeModal from '~/components/organisms/Modal/WorkSpaceSettingModal/EmailPasswordChangeModal.vue'
import { useErrorDisplay } from '~/composables'
// props type
export default defineComponent({
  name: 'UserAccountSettingForm',
  components: {
    Button,
    FormContainer,
    TableDataList,
    EmailPasswordChangeModal,
    UserDeleteForm
  },
  setup(_, context: SetupContext) {
    const { app, $auth } = useContext()
    const router = useRouter()
    const { setError } = useErrorDisplay()

    const basicInfoTitles = [
      {
        label: app.i18n.t('mypage.account.user.name'),
        required: false
      },
      {
        label: app.i18n.t('mypage.account.user.email'),
        required: false
      },
      {
        label: app.i18n.t('mypage.account.user.password'),
        required: false
      },
      {
        label: app.i18n.t('mypage.account.user.linkedSNS'),
        required: false
      }
    ]

    // hide password field
    // if ($auth.user?.connectedComony !== 1) {
    //   basicInfoTitles.splice(2, 1)
    // }

    const modalWorkspace = ref()
    const openEmail = () => {
      modalWorkspace.value.openEmail()
    }
    const openPassword = () => {
      modalWorkspace.value.openPassword()
    }

    const handleDeleteAccount = async () => {
      await app
        .$repository('users')
        .deleteAccount()
        .then(() => {
          context.root.$auth.logout().then(() => {
            router.push(app.localePath('/login'))
          })
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    // only login with email not sns
    const isAvailableEmailChange = computed(() => {
      return (
        $auth.user?.connectedFacebook === 0 &&
        $auth.user?.connectedGoogle === 0 &&
        $auth.user?.connectedApple === 0
      )
    })

    // if login with email
    const isAvailablePasswordChange = computed(() => {
      return $auth.user?.connectedComony === 1
    })

    return {
      modalWorkspace,
      basicInfoTitles,
      openEmail,
      openPassword,
      handleDeleteAccount,
      isAvailableEmailChange,
      isAvailablePasswordChange
    }
  }
})
</script>

<style scoped lang="scss">
.accountSetting {
  width: 100%;

  .tableDataList {
    background-color: $color_gray_50;
    padding: $spacing_5x;
  }

  &_section {
    &_item {
      display: flex;
      align-items: center;
      color: $color_gray_900;

      @include mb() {
        flex-wrap: wrap;
        word-break: break-word;
      }

      img {
        width: 24px;
        vertical-align: bottom;
      }

      .button {
        margin-left: auto;

        &_modal {
          &_email {
            height: auto;
          }
          &_delete {
            .button_actions {
              display: flex;
              justify-content: flex-end;
              * {
                margin-right: $spacing_1x;
              }
            }
          }
        }
      }
    }
  }

  &_socialLinked {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &_item {
      @include fz($font_size_xs);
      border: 1px solid $color_gray_200;
      background-color: $color_gray_200;
      padding: $spacing_2x;
      border-radius: 10px;
      margin-right: $spacing_2x;
      margin-bottom: $spacing_2x;

      @include mb() {
        @include fz($font_size_xxs);
      }

      span {
        vertical-align: text-bottom;
      }

      img {
        height: 24px;

        @include mb() {
          height: 18px;
        }
      }
    }
  }
}
.userDelete {
  margin: $spacing_8x 0;
  width: 100%;
}
</style>
