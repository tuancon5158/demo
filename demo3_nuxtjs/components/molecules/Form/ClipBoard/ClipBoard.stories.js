import ClipBoard from './ClipBoard.vue'

export default {
  title: 'molecules/Form/ClipBoard',

  component: ClipBoard,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { ClipBoard },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><ClipBoard v-bind="$props" /></div>'
})

export const Input = Template.bind({})
Input.args = {
  value: 'test value',
  textArea: false
}

export const TextArea = Template.bind({})
TextArea.args = {
  value: 'test value',
  textArea: true
}
