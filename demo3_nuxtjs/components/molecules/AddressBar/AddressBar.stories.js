import AddressBar from './AddressBar.vue'

export default {
  title: 'molecules/AddressBar',

  component: AddressBar,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { AddressBar },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><AddressBar v-bind="$props" /></div>'
})

export const Default = Template.bind({})
