import VideoModal from './VideoModal.vue'

export default {
  title: 'old/VideoModal',

  component: VideoModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { VideoModal },
  props: Object.keys(argTypes),
  template: '<VideoModal v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  size: 'large',
  visible: true
}
