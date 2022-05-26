import DividerWithText from './DividerWithText.vue'

export default {
  title: 'molecules/DividerWithText',

  component: DividerWithText,

  argTypes: {
    msg: {
      control: 'text'
    },
    fontSize: {
      control: 'text'
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { DividerWithText },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><DividerWithText v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  fontSize: '1.5rem',
  msg: 'Default Text'
}
