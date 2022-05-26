<template>
  <a-upload
    :action="$config.mediaBaseURL + '/v2/upload'"
    :data="{ folder }"
    :default-file-list="defaultFileList"
    multiple
    name="files[0]"
    @change="onChange"
  >
    <a-button>
      <a-icon type="upload" />
      Tải lên
    </a-button>
  </a-upload>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useConfig } from '@/composables'

export default defineComponent({
  name: 'BaseUpload',

  props: {
    fileList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    folder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const config = useConfig()

    const updateFileList = (data: string[]) => {
      emit('update:fileList', data)
    }

    const defaultFileList = computed(() => {
      return props.fileList?.map((item, index) => ({
        uid: 0 - index,
        name: item,
        status: 'done',
        url: `${config.mediaBaseURL}/${item}`,
      }))
    })

    const onChange = (request: {
      file: File & { status: string; response: string }
    }) => {
      const { file } = request

      if (file.status === 'removed') {
        return updateFileList(
          props.fileList?.filter(item => item !== file.name)
        )
      }

      if (file.status === 'done') {
        return updateFileList([...props.fileList, file.response])
      }
    }

    return { defaultFileList, onChange }
  },
})
</script>
