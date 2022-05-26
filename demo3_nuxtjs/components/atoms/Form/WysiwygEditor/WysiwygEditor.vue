<template>
  <section>
    <client-only placeholder="loading...">
      <quill-editor
        ref="editor"
        v-model="formValues.htmlText"
        :options="editorOption"
        :disabled="disableQuill"
        @focus="disableQuill = false"
        @change="disableQuill = false"
      />
      <input
        id="getFile"
        ref="inputFile"
        type="file"
        style="display: none"
        @change="imageUploadHandler($event)"
      />
      <transition name="fade">
        <Modal v-if="isShowModal" header-align="left" @onClose="handleCloseModal">
          <template #header>{{ $t('spaceNew.form.label.WysiwygEditorCodeBlock') }}</template>
          <template #body>
            <TextArea
              row="10"
              col="150"
              :placeholder="$t('spaceNew.form.placeHolder.WysiwygEditorCodeBlock')"
              :model-value="formValues.htmlText"
              @update:modelValue="handleInputFieldSetChange($event, 'htmlTextInput')"
            />
            <Button
              bg-color="blue"
              :label="$t('form.button.save')"
              @onClick="handleFormHTMLDone"
            ></Button>
          </template>
        </Modal>
      </transition>
      <InputError :value="errorMessage" />
    </client-only>
  </section>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  useContext,
  watch,
  computed
} from '@nuxtjs/composition-api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'
import Modal from '~/components/atoms/Modal/Modal.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import { useFormValuesInit } from '~/composables'
import Button from '~/components/atoms/Button/Button.vue'

export default defineComponent({
  name: 'WysiwygEditor',

  components: {
    InputError,
    Modal,
    TextArea,
    Button
  },

  props: {
    errorMessage: {
      type: String,
      default: ''
    },
    value: {
      type: [Object, String],
      default: null
    },
    modelValue: {
      type: [Object, String],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },

  setup(props, { emit, refs }) {
    const { app, $axios, $config } = useContext()

    const { formValues, msgError } = useFormValuesInit({
      htmlText: props.value,
      htmlTextInput: props.value
    })
    const isShowModal = ref(false)
    const toggleModal = () => {
      isShowModal.value = !isShowModal
    }
    const handleCloseModal = () => {
      isShowModal.value = false
    }

    const imageUploadHandler = async (e) => {
      if (!e.target.files[0]) {
        return
      }

      // #getFileのファイル情報を取得
      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('file', file)
      formData.append('prefix', 'spaces')

      // 現在のカーソル位置
      const range = quill.value.getSelection(true)

      // ローディング（プレスホルダ）画像イメージ
      quill.value.insertEmbed(
        range.index,
        'image',
        require('@/assets/images/wysiwyg/loading_img.gif')
      )
      // 画像の右にカーソル移動
      quill.value.setSelection(range.index + 1)

      // 画像ファイルアップロード

      await $axios
        .$post('/file', formData, { 'Content-Type': 'multipart/form-data' })
        .then((response) => {
          // ローディング（プレスホルダ）画像イメージ削除
          quill.value.deleteText(range.index, 1)

          // 画像パス埋め込み（絶対パス）
          quill.value.insertEmbed(range.index, 'image', `${$config.frontURL}/${response.data.key}`)

          // #getFileをリセットして再度利用可能にする
          refs.inputFile.value = null
        })
        .catch(() => {
          // 画像アップロードエラー処理
          // TODO: i18（本番のメッセージ未確認）
          alert('画像の登録に失敗しました')
        })
    }

    const editorOption = {
      theme: 'snow',
      placeholder: props.placeholder,
      modules: {
        toolbar: {
          container: [
            [
              { header: [1, 2, 3, 4, 5, 6] }, // custom heading values
              { font: [] }, // custom font values
              { size: ['small', false, 'large', 'huge'] }, // custom font-size values
              'bold',
              'italic',
              'underline',
              'strike',
              'blockquote',

              { list: 'ordered' },
              { list: 'bullet' },
              { color: [] },
              { background: [] },
              { align: [] },
              'link',
              'image',
              'video',
              'code-block', // input HTML
              'clean'
            ]
          ],
          handlers: {
            image() {
              // #getFileのファイル選択ダイアログ表示
              document.getElementById('getFile').click()
            },
            'code-block': function () {
              isShowModal.value = true
            }
          }
        }
      }
    }

    const disableQuill = ref(true)

    const handleInputFieldSetChange = (value, fieldName) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    const handleFormHTMLDone = () => {
      formValues.htmlText = formValues.htmlTextInput
      isShowModal.value = false
    }

    watch(
      () => props.modelValue,
      () => {
        formValues.htmlText = props.modelValue
      }
    )

    watch(
      () => formValues.htmlText,
      () => {
        emit('update:modelValue', formValues.htmlText)
        formValues.htmlTextInput = formValues.htmlText
      }
    )

    const quill = computed(() => refs.editor.quill)
    return {
      imageUploadHandler,
      disableQuill,
      isShowModal,
      handleCloseModal,
      editorOption,
      formValues,
      handleInputFieldSetChange,
      quill,
      handleFormHTMLDone
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  margin-top: $spacing_2x;
  float: right;
}
/deep/ .quill-editor {
  overflow-y: auto;
  background-color: $color_white;
  border-radius: 5px;
}

/deep/ .ql-toolbar {
  border-radius: 5px 5px 0 0;
}

/deep/ .ql-container {
  border-radius: 0 0 5px 5px;
}

/deep/ .ql-editor {
  min-height: 300px;
}
/deep/ .ql-editing {
  margin-left: 145px;
  margin-top: -86px;
}
</style>
