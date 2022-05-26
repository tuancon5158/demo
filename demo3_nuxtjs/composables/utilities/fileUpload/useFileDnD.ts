import { ref, computed, watch } from '@nuxtjs/composition-api'

export default function useFileDnD(inputRef, maxFileSize: string, fileType: Array<string>, app) {
  const files = ref()
  const uploadedFileImg = ref()
  let open

  if (inputRef) {
    const handler = (event) => {
      if (event.target.files[0]) {
        files.value = event.target.files

        const validation1: boolean = fileSizeCheck(maxFileSize)
        const validation2: boolean = fileTypeCheck(fileType)

        if (validation1 && validation2) createImage(files.value[0])
        else reset()
      }
    }

    open = () => {
      let ele = document.getElementsByClassName('fileDropBox_option--upload')[0] as HTMLInputElement
      if (ele) ele.disabled = true
      document.body.onfocus = onFocus

      inputRef.value && inputRef.value.click()
    }

    watch(inputRef, (newEl: HTMLInputElement, oldEl: HTMLInputElement) => {
      oldEl && oldEl.removeEventListener('change', handler)
      newEl && newEl.addEventListener('change', handler)
    })

    const createImage = (file) => {
      const reader = new FileReader()

      reader.onload = () => {
        uploadedFileImg.value = reader.result
      }
      reader.readAsDataURL(file)
    }
  }

  const onFocus = () => {
    let ele = document.getElementsByClassName('fileDropBox_option--upload')[0] as HTMLInputElement
    if (ele) ele.disabled = false
    document.body.onfocus = null
  }

  const reset = () => {
    files.value = []
    uploadedFileImg.value = ''
  }

  const first = ref(false)
  const second = ref(false)

  const cancel = () => {
    first.value = false
    second.value = false
  }

  const events = {
    dragover(e) {
      e.preventDefault()
    },

    dragenter() {
      if (first.value) {
        second.value = true
      } else {
        first.value = true
      }
    },

    dragleave() {
      if (second.value) {
        second.value = false
      } else if (first) {
        first.value = false
      }
    },

    drop(e) {
      e.preventDefault()
      const newFiles = [...e.dataTransfer.files]

      files.value = newFiles

      const validation1: boolean = fileSizeCheck(maxFileSize)
      const validation2: boolean = fileTypeCheck(fileType)

      if (validation1 && validation2) {
        const reader = new FileReader()

        reader.onload = () => {
          uploadedFileImg.value = reader.result
        }
        reader.readAsDataURL(files.value[0])

        cancel()
      } else {
        reset()
      }
    }
  }

  const fileSizeCheck = (maxFileSize: string): boolean => {
    if (files.value[0].size > parseInt(maxFileSize)) {
      alert(
        `${app.i18n.t('form.errorMessage.fileSize.line1')}${convertedBytes()}MB${app.i18n.t(
          'form.errorMessage.fileSize.line2'
        )}`
      )

      return false
    }

    return true
  }

  const fileTypeCheck = (fileType: Array<string>): boolean => {
    if (!fileType.includes(files.value[0].type)) {
      alert(`${app.i18n.t('form.errorMessage.fileType')}`)

      return false
    }

    return true
  }

  // KB to MB
  const convertedBytes = () => {
    const bytes = 1000000

    return Math.floor(Number(maxFileSize) / bytes)
  }

  const attrs = {
    tabindex: 0,
    'aria-role': 'button',
    'aria-label': 'Click to select a file to upload'
  }

  return {
    attrs,
    reset,
    cancel,
    events,
    files,
    uploadedFileImg,
    hovering: computed(() => first.value),
    open
  }
}
