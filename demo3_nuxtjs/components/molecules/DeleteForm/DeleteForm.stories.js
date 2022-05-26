import DeleteForm from './DeleteForm.vue'

export default {
  title: 'molecules/DeleteForm',

  component: DeleteForm,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { DeleteForm },
  props: Object.keys(argTypes),
  template: '<DeleteForm v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {}
