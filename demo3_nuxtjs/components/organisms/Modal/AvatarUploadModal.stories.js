import AvatarUploadModal from './AvatarUploadModal.vue'

export default {
  title: 'organisms/Modal/AvatarUploadModal',

  component: AvatarUploadModal,

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { AvatarUploadModal },
  props: Object.keys(argTypes),
  template: '<AvatarUploadModal v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  headerAlign: 'left'
}
