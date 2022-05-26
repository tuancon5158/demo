<template>
  <van-image
    v-if="isImage"
    width="20"
    height="20"
    :src="fullSrc"
    @click="$emit('click')"
  />

  <base-tooltip v-else :title="src">
    <a-icon
      class="text-xl"
      :type="typeIconUnknown"
      @click.native="handleClickUnknownFile"
    />
  </base-tooltip>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useConfig } from '@/composables'
import { REGEX_IMAGE, REGEX_PDF, REGEX_WORD, REGEX_EXCEL } from '@/utils/regex'

export default defineComponent({
  name: 'BaseFilePreview',
  props: {
    src: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: String,
      default: '4:3',
      validator(value) {
        const [width, height] = value.split(':').map(Number)

        if (!Number.isInteger(width) || !Number.isInteger(height)) {
          throw new TypeError("aspect-ratio prop is required 'width:height'")
        }

        return true
      },
    },
  },
  setup(props) {
    const config = useConfig()
    const fullSrc = computed(() => {
      return `${config.browserBaseURL}/${props.src}`
    })

    const isImage = computed(() => {
      return REGEX_IMAGE.test(fullSrc.value)
    })
    const isPdf = computed(() => {
      return REGEX_PDF.test(fullSrc.value)
    })
    const isWord = computed(() => {
      return REGEX_WORD.test(fullSrc.value)
    })
    const isExcel = computed(() => {
      return REGEX_EXCEL.test(fullSrc.value)
    })

    const typeIconUnknown = computed(() => {
      return isPdf.value
        ? 'file-pdf'
        : isWord.value
        ? 'file-word'
        : isExcel.value
        ? 'file-excel'
        : 'file-unknown'
    })

    const stylesContainer = computed(() => {
      const [width, height] = props.aspectRatio.split(':').map(Number)
      const ratio = (height / width) * 100

      return {
        paddingTop: `${ratio}%`,
      }
    })

    const handleClickUnknownFile = () => {
      window.open(fullSrc.value)
    }

    return {
      fullSrc,
      stylesContainer,
      isImage,
      typeIconUnknown,
      handleClickUnknownFile,
    }
  },
})
</script>
