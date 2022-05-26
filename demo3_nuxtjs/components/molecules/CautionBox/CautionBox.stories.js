import CautionBox from './CautionBox.vue'

export default {
  title: 'molecules/CautionBox',

  component: CautionBox,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { CautionBox },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><CautionBox v-bind="$props" /></div>'
})

export const Default = Template.bind({})
