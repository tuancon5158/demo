<template>
  <div>
    <div class="fileDropBox">
      <div
        class="fileDropBox_box"
        :class="classes"
        v-bind="attrs"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        v-on="dropEvents"
        @click.self="openInput"
        @keyup.enter="openInput"
      >
        <div v-if="isLoading" class="fileDropBox_loading">
          <p class="fileDropBox_text">
            {{ $t('mypage.uploadImage.titleLoading') }}
          </p>
          <progress class="fileDropBox_progress" :value="percentage" max="100"></progress>
        </div>
        <div v-else>
          <input ref="inputRef" type="file" hidden />
          <div v-if="imageUrl || uploadedFileImg">
            <img
              v-show="uploadedFileImg ? uploadedFileImg : imageUrl"
              :src="uploadedFileImg ? uploadedFileImg : imageUrl"
              class="fileDropBox_uploadedFiles"
            />
            <div
              :class="active ? 'fileDropBox_option--show' : 'fileDropBox_option--hide'"
              class="fileDropBox_option"
            >
              <Button
                icon="upload-light"
                :label="$t('mypage.uploadImage.button')"
                bg-color="blue"
                class="fileDropBox_option--upload"
                icon-width="16"
                icon-height="16"
                @click.native="openInput"
              />

              <Button
                icon="delete-light"
                :label="$t('mypage.uploadImage.button2')"
                bg-color="red"
                class="fileDropBox_option--delete"
                icon-width="16"
                icon-height="16"
                @click.native="onDelete"
              />
            </div>
          </div>
          <div v-else class="fileDropBox_noFiles" @click="openInput">
            <img
              class="fileDropBox_iconUpload"
              width="48"
              height="48"
              src="@/assets/images/icon/icon-upload.svg"
            />
            <p class="fileDropBox_text">
              {{ $t('mypage.uploadImage.title') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <InputError :value="errorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import useFileDnD from '~/composables/utilities/fileUpload/useFileDnD'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'

type FileDropBoxProps = {
  errorMessage: string
  value: string
  type: string
  imageUrl: string
  maxWidth: string
  maxSize: string
  canDelete: boolean
  isLoading: boolean
  percentage: number
  size: string
  disabled: number
}

export default defineComponent({
  name: 'FileDropBox',
  components: {
    Button,
    InputError
  },

  props: {
    errorMessage: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    imageUrl: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: null
    },
    maxSize: {
      type: String,
      default: null
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'full'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onSelectImage', 'onDeleteImage'],

  setup(props: FileDropBoxProps, { emit }) {
    const { app } = useContext()
    const inputRef = ref(null)
    const active = ref(false)
    const maxFileSize = ref(props.maxSize || '1048576') // 1MB
    const {
      attrs,
      reset,
      cancel,
      events: dropEvents,
      files,
      uploadedFileImg,
      hovering,
      open
    } = useFileDnD(
      inputRef,
      maxFileSize.value,
      ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      app
    )

    watch(files, (val) => {
      // 画像を画面表示後にFileオブジェクトを通知
      if (val[0]) {
        emit('onSelectImage', val[0])
      }
    })

    // click open image box
    const openDefault = () => {
      open()
    }

    // delete image
    const onDelete = () => {
      reset()
      emit('onDeleteImage')
    }

    // event occurs when a mouse pointer comes over an element
    const mouseOver = () => {
      active.value = true
    }

    // event occurs when a mouse leaves
    const mouseLeave = () => {
      active.value = false
    }

    // return classes
    const classes = computed(() => {
      return {
        'vue-filedrop-hovering': hovering.value,
        'vue-filedrop-no-files': !files,
        [`-size--${props.size}`]: props.size,
        [`-disabled`]: props.disabled
      }
    })

    return {
      attrs,
      cancel,
      reset,
      classes,
      dropEvents,
      files,
      inputRef,
      openInput: openDefault,
      onDelete,
      uploadedFileImg,
      active,
      mouseOver,
      mouseLeave
    }
  }
})
</script>

<style lang="scss" scoped>
$fileDropBox_H: 140px;
$fileDropBox_W: 100%;

.fileDropBox {
  width: 100%;
  @include pc() {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }

  &_option {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $fileDropDown_Overlay_Background;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;

    &--show {
      animation: in 300ms ease both;
    }

    &--hide {
      animation: out 300ms ease both;
    }

    &--upload {
      line-height: 24px;
      font-weight: $font_weight_medium;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      width: fit-content !important;
      margin: $spacing_2x 0;
      height: 36px;
    }

    &--delete {
      line-height: 24px;
      font-weight: $font_weight_medium;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      width: fit-content !important;
      margin: $spacing_2x 0;
      height: 36px;
    }
  }

  &_box {
    display: inline-flex;
    height: $fileDropBox_H;
    justify-content: center;
    align-items: center;
    border: 2px dashed $color_gray_400;
    background-color: $color_gray_50;
    border-radius: $fileDropBox_BorderRadius;
    position: relative;
    cursor: pointer;

    &.-disabled {
      pointer-events: none;
    }

    &.-size {
      &--full {
        width: 100%;
        height: 175px;
      }
    }

    @include pc() {
      width: $fileDropBox_W;
    }

    @include mb() {
      width: 100%;
      max-width: $fileDropBox_W;
    }
  }

  &:hover {
    cursor: inherit;

    &.vue-filedrop-no-files {
      cursor: pointer;
    }
  }

  &_iconUpload {
    margin-bottom: $spacing_4x;
  }

  &_noFiles {
    text-align: center;
  }

  &_uploadedFiles {
    width: auto;
    max-width: 90%;
    object-fit: contain;
    height: calc(#{$fileDropBox_H} - 4px);
  }

  &_text {
    margin: 0;
    color: $color_gray_600;
    @include fz($font_size_xs);
    font-weight: $font_weight_medium;
    text-align: center;
  }

  &_loading {
    text-align: center;
  }

  &_progress {
    width: 200px;
    height: 6px;
    margin-top: $spacing_6x;
  }

  &_select {
    @include mb() {
      text-align: center;
      margin-top: $spacing_5x;
    }

    @include ipad() {
      text-align: left;
    }
  }

  &.vue-filedrop-dragging {
    border-style: dashed;
    border-width: 2px;
  }

  &.vue-filedrop-hovering {
    border-color: #aaa;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.22);
  }
}

@keyframes in {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}

@keyframes out {
  0% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
