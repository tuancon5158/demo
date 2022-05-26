import CheckBox from './CheckBox.vue'

export default {
  title: 'atoms/Form/CheckBox',

  component: CheckBox,

  argTypes: {
    disabled: {
      control: 'select',
      options: [true, false]
    },
    typeCheckBox: {
      control: 'select',
      options: ['check', 'empty', 'dash']
    }
  }
}
const Template = (args) => ({
  components: { CheckBox },
  setup() {
    return { args }
  },
  template: '<CheckBox v-bind="args"/>'
})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  id: '1'
}

export const UnDisabled = Template.bind({})
UnDisabled.args = {
  disabled: false,
  id: '2'
}
