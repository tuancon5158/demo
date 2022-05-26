import EmailPasswordChangeModal from './EmailPasswordChangeModal.vue'

export default {
  title: 'organisms/Modal/EmailPasswordChangeModal',

  component: EmailPasswordChangeModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { EmailPasswordChangeModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><EmailPasswordChangeModal v-bind="$props" /></div>'
})

export const Default = Template.bind({})
