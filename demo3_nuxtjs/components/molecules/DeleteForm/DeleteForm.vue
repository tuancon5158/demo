<template>
  <div class="deleteForm">
    <FormContainer :title="heading">
      <template #formContents>
        <div class="userDeleteForm_card_content">
          <div class="userDeleteForm_card_content_section">
            {{ content }}
            <br />
            <div>
              <Button
                class="userDeleteForm_card_content_section_button"
                bg-color="white"
                size="medium"
                :label="buttonText"
                @onClick="handleOpenModal('delete')"
              />
            </div>
          </div>
        </div>
        <div class="userDeleteForm_modal">
          <Dialogue
            v-if="modal.delete"
            is-delete
            :title="dialogue.title"
            :back-button="dialogue.backButton"
            :confirm-button="dialogue.confirmButton"
            @onClose="handleConfirmModal"
            @onValidate="handleCloseModal('delete')"
          />
        </div>
      </template>
    </FormContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'

// props type

export default defineComponent({
  name: 'UserDeleteForm',

  components: {
    FormContainer,
    Button,
    Dialogue
  },

  props: {
    heading: {
      type: String,
      default: 'heading'
    },
    content: {
      type: String,
      default: 'content'
    },
    buttonText: {
      type: String,
      default: 'buttonText'
    },
    dialogue: {
      type: Object,
      default: () => ({
        title: '',
        backButton: '',
        confirmButton: ''
      })
    }
  },

  setup(_, { emit }) {
    const { app } = useContext()
    const modal = reactive({
      delete: false
    })

    const serverError = reactive({
      value: ''
    })

    /**
     * handle open modal when click button
     * @name: <String> | name value
     */
    const handleOpenModal = (name: string) => {
      modal[name] = true
      document.documentElement.style.overflow = 'hidden'
    }

    /**
     * handle close modal when click button
     * @name: <String> | name value
     */
    const handleCloseModal = (name: string) => {
      modal[name] = false
      document.documentElement.style.overflow = 'auto'
    }

    // handle confirm and close modal when click button
    const handleConfirmModal = () => {
      emit('onDelete')
      handleCloseModal('delete')
    }

    return {
      app,
      modal,
      serverError,
      handleOpenModal,
      handleCloseModal,
      handleConfirmModal
    }
  }
})
</script>

<style scoped lang="scss">
.deleteForm {
  .userDeleteForm {
    width: 100%;

    &_card {
      display: flex;
      flex-direction: column;
      margin: $spacing_5x auto $spacing_10x;
      background-color: $color_white;
      border-radius: 8px;
      border: 1px solid $color_light_blue_200;
      box-sizing: border-box;

      &_content {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0 0 5px 5px;

        &_section {
          @include fz($font_size_s);
          display: flex;
          border-radius: $input_BorderRadius;
          flex-direction: column;
          color: $color_gray_900;
          ///noted, cant overlay child component when use &_button{}
          // but this is work ?
          .userDeleteForm_card_content_section_button {
            margin-top: $spacing_6x;
            @include fz($font_size_s);
            color: $color_red_500;
            border-color: $color_red_500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 48px;
          }
        }
      }
    }

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
</style>
