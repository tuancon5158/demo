import FileDropBox from './FileDropBox.vue'

export default {
  title: 'molecules/Form/FileDropBox',

  component: FileDropBox,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { FileDropBox },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><FileDropBox v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  errorMessage: 'Error Message'
}
