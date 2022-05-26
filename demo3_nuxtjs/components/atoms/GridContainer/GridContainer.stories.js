import GridContainer from './GridContainer.vue'

export default {
  title: 'atoms/GridContainer',

  component: GridContainer,

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { GridContainer },
  props: Object.keys(argTypes),
  template:
    '<GridContainer v-bind="$props"><template #column-1><div style="border:1px solid red">slot contents here</div></template><template #column-2><div style="border:1px solid red">slot contents here</div></template><template #column-3><div style="border:1px solid red">slot contents here</div></template></GridContainer>'
})

export const Default = Template.bind({})
Default.args = {}

export const TwoColumns = Template.bind({})
TwoColumns.args = {
  columns: '2'
}

export const ThreeColumns = Template.bind({})
ThreeColumns.args = {
  columns: '3'
}
