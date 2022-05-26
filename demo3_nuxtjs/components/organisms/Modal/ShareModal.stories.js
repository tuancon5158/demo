import ShareModal from './ShareModal.vue'

export default {
  title: 'organisms/Modal/ShareModal',

  component: ShareModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { ShareModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><ShareModal v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  shareText: 'https://comony.net'
}
