<template>
  <div>
    <a-upload
      :action="$config.mediaBaseURL + '/v2/upload'"
      :data="{ folder }"
      :default-file-list="defaultFileList"
      :multiple="multiple"
      :list-type="type"
      name="files[0]"
      @change="onChange"
    >
      <div v-if="defaultFileList.length < max">
        <div v-if="type">
          <a-icon type="plus" />
          <div class="ant-upload-text">{{ title }}</div>
        </div>
        <a-button v-else>
          <a-icon type="upload" />
          Tải lên
        </a-button>
      </div>
    </a-upload>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useConfig } from '@/composables'

export default defineComponent({
  name: 'BaseUploadV2',

  props: {
    type: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: `Tải lên`,
    },
    max: {
      type: Number,
      default: 2,
    },
    fileList: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    folder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: true,
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
        thumbUrl: `${config.mediaBaseURL}/${item.path}`,

        ...item,
        status: 'done',
        url: `${config.mediaBaseURL}/${item.path}`,
      }))
    })

    const onChange = (request: {
      file: File & { status: string; response: string }
    }) => {
      const { file } = request

      if (file.status === 'removed') {
        return updateFileList(
          props.fileList?.filter(item => item.name !== file.name)
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
