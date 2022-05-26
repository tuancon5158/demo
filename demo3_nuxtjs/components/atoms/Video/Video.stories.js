import Video from './Video.vue'
import { onMounted, ref } from '@nuxtjs/composition-api'

export default {
  title: 'atoms/Video',

  component: Video,

  argTypes: {}
}

const Template = (args) => ({
  components: { Video },
  setup() {
    const isLoad = ref(false)

    onMounted(() => {
      var tag = document.createElement('script')

      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]

      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)

      setTimeout(() => {
        isLoad.value = true
      }, 0)
    })

    return { args, isLoad }
  },

  template: '<Video v-if="isLoad" v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
