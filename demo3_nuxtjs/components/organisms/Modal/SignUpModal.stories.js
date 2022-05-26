import SignUpModal from './SignUpModal.vue'

export default {
  title: 'organisms/Modal/SignUpModal',

  component: SignUpModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { SignUpModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><SignUpModal v-bind="$props"  /></div>'
})

export const Default = Template.bind({})
Default.args = {}
