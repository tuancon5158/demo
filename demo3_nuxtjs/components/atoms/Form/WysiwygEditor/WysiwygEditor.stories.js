import WysiwygEditor from './WysiwygEditor.vue'

export default {
  title: 'atoms/Form/WysiwygEditor',

  component: WysiwygEditor,

  argTypes: {
    errorMessage: {
      control: 'text'
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { WysiwygEditor },
  props: Object.keys(argTypes),
  template: '<WysiwygEditor v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  errorMessage: ''
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  errorMessage: 'error'
}
