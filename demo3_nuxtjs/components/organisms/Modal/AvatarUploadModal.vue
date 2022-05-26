<template>
  <Modal :header-align="headerAlign" @onClose="handleClose">
    <template #header>
      <div class="avatarUploadModal_head">
        <p>{{ $t('avatars.avatarUploadModal.heading') }}</p>
      </div>
    </template>
    <template #body>
      <div class="avatarUploadModal_body">
        <InputFieldSet
          class="avatarUploadModal_body_name"
          :label="$t('avatars.avatarUploadModal.label.name')"
          :model-value="formValues.name"
          :place-holder="$t('avatars.avatarUploadModal.placeHolder.name')"
          @update:modelValue="handleInputFieldSetChange($event, 'name')"
        />
        <div class="avatarUploadModal_body_file">
          <InputLabel :value="$t('avatars.avatarUploadModal.label.VRNFile')" color="gray" />
          <FileDropBox
            :image-url="formValues.imagePath ? convertFullPath(formValues.imagePath) : ''"
            :percentage="currentProgressFile"
            :is-loading="isLoadingFile"
            :max-size="limitFile"
            @onSelectImage="handleSelectImage($event, 'coverDataValue')"
            @onDeleteImage="handleDeleteImage($event)"
          />
        </div>
        <div class="avatarUploadModal_body_fileImage">
          <InputLabel :value="$t('avatars.avatarUploadModal.label.thumbnail')" color="gray" />
          <FileDropBox
            :image-url="formValues.imageThubnail ? convertFullPath(formValues.imageThubnail) : ''"
            :percentage="currentProgressFileThumbnail"
            :is-loading="isLoadingFileThumbnail"
            :max-size="limitFile"
            @onSelectImage="handleSelectImageThumbnail($event, 'coverDataValue')"
            @onDeleteImage="handleDeleteImageThumbnail($event)"
          />
        </div>
        <div class="avatarUploadModal_body_type">
          <p class="avatarUploadModal_body_start">
            {{ $t('avatars.avatarUploadModal.label.format') }}
          </p>
          <p class="avatarUploadModal_body_end">{{ fileType }}</p>
        </div>
        <div class="avatarUploadModal_body_type">
          <p class="avatarUploadModal_body_start">
            {{ $t('avatars.avatarUploadModal.label.limit') }}
          </p>
          <p class="avatarUploadModal_body_end">{{ limitFileToMb }}</p>
        </div>
      </div>
      <div class="avatarUploadModal_foot">
        <Button
          class="avatarUploadModal_foot_exit"
          border-color="blue"
          bg-color="transparent"
          :label="$t('avatars.avatarUploadModal.button1')"
          @click="handleExit"
        />
        <Button
          class="avatarUploadModal_foot_upload"
          :label="$t('avatars.avatarUploadModal.button2')"
          bg-color="blue"
          @click="handleUpload"
        />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  SetupContext,
  computed,
  useContext,
  reactive
} from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import Button from '~/components/atoms/Button/Button.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import InputLabel from '~/components/atoms/Form/InputLabel/InputLabel.vue'
import FileDropBox from '~/components/molecules/Form/FileDropBox/FileDropBox.vue'

export default defineComponent({
  name: 'AvatarUploadModal',

  components: {
    Modal,
    Button,
    InputFieldSet,
    InputLabel,
    FileDropBox
  },

  props: {
    headerAlign: {
      type: String,
      default: 'center',
      validator: (value: string) => {
        return ['center', 'left'].includes(value)
      }
    }
  },

  emits: ['onClose'],

  setup(_, context: SetupContext) {
    const { app } = useContext()
    const { $config } = context.root
    const limitFile = '67108864'
    const fileType = 'VRM'

    const limitFileToMb = computed(() => {
      return `${parseFloat(limitFile) / (1024 * 1024)}MB`
    })

    const convertFullPath = (imageKey: string): string => {
      return `${$config.frontURL}/${imageKey}`
    }
    const formValues = reactive({
      name: '',
      imagePath: '',
      imageThubnail: ''
    })

    const handleClose = () => {
      context.emit('onClose')
    }

    const handleInputFieldSetChange = (e: string, field: string) => {
      formValues[field] = e
    }

    // image file
    const isLoadingFile = ref(false)
    const currentProgressFile = ref(0)

    const handleSelectImage = async (fileData: Blob, _name: string) => {
      isLoadingFile.value = true
      await fileUpload(fileData)
    }
    // eslint-disable-next-line require-await
    const handleDeleteImage = async () => {
      formValues.imagePath = ''
    }
    const fileUpload = async (fileData: Blob) => {
      const formData = new FormData()

      formData.append('file', fileData)
      await app
        .$repository('file')
        .upload(formData, (progressEvent) => {
          const { loaded, total } = progressEvent
          const progressPercent = Math.round((loaded * 100) / total)

          currentProgressFile.value = progressPercent

          return progressPercent
        })
        .then((response) => {
          formValues.imagePath = response.data.key
        })
        .catch(() => {})
        .finally(() => {
          isLoadingFile.value = false
          currentProgressFile.value = 0
        })
    }

    // image file thumbnail
    const isLoadingFileThumbnail = ref(false)
    const currentProgressFileThumbnail = ref(0)

    const handleSelectImageThumbnail = async (fileData: Blob, _name: string) => {
      isLoadingFileThumbnail.value = true
      await fileUploadThumbnail(fileData)
    }
    // eslint-disable-next-line require-await
    const handleDeleteImageThumbnail = async () => {
      formValues.imageThubnail = ''
    }
    const fileUploadThumbnail = async (fileData: Blob) => {
      const formData = new FormData()

      formData.append('file', fileData)
      await app
        .$repository('file')
        .upload(formData, (progressEvent) => {
          const { loaded, total } = progressEvent
          const progressPercent = Math.round((loaded * 100) / total)

          currentProgressFileThumbnail.value = progressPercent

          return progressPercent
        })
        .then((response) => {
          formValues.imageThubnail = response.data.key
        })
        .catch(() => {})
        .finally(() => {
          isLoadingFileThumbnail.value = false
          currentProgressFileThumbnail.value = 0
        })
    }

    // exit
    const handleExit = () => {
      context.emit('onClose')
    }

    // upload
    const handleUpload = () => {}

    return {
      formValues,
      handleInputFieldSetChange,
      handleClose,
      convertFullPath,
      isLoadingFile,
      currentProgressFile,
      handleSelectImage,
      handleDeleteImage,
      fileUpload,
      isLoadingFileThumbnail,
      currentProgressFileThumbnail,
      handleSelectImageThumbnail,
      handleDeleteImageThumbnail,
      fileUploadThumbnail,
      handleExit,
      handleUpload,
      limitFile,
      limitFileToMb,
      fileType
    }
  }
})
</script>

<style lang="scss" scoped>
.avatarUploadModal {
  &_head {
    width: 100%;
    p {
      margin: 0;
      @include fz($font_size_xxl);
      font-weight: $font_weight_medium;
      line-height: 3.2rem;
    }
  }

  &_body {
    border-top: 1px solid $color_gray_lighten1;
    border-bottom: 1px solid $color_gray_lighten1;
    padding-bottom: $spacing_3x;

    &_name {
      margin: $spacing_3x 0;
    }

    &_file {
      margin-bottom: $spacing_3x;
    }

    &_fileImage {
      margin-bottom: $spacing_2x;
    }

    &_type {
      display: flex;
      flex-wrap: wrap;
    }

    &_start {
      flex: 0 0 auto;
      width: 30%;
      margin: $spacing_2x 0;
    }

    &_end {
      flex: 0 0 auto;
      width: 70%;
      margin: $spacing_2x 0;
    }
  }
  &_foot {
    display: flex;
    justify-content: space-between;
    margin-top: $spacing_3x;

    &_exit {
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      @include fz($font_size_s);
    }

    &_upload {
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      @include fz($font_size_s);
    }
  }
}
</style>
