import MemberInvitationModal from './MemberInvitationModal.vue'

export default {
  title: 'organisms/Modal/MemberInvitationModal',

  component: MemberInvitationModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { MemberInvitationModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><MemberInvitationModal v-bind="$props"  /></div>'
})

export const Default = Template.bind({})
Default.args = {}
