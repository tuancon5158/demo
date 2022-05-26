import CircleLively from './CircleLively.vue'

export default {
  title: 'atoms/LivelyIcon/CircleLively',

  component: CircleLively,

  argTypes: {
    animated: {
      control: 'boolean'
    },
    width: {
      control: { type: 'text' }
    },
    height: {
      control: { type: 'text' }
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { CircleLively },
  props: Object.keys(argTypes),
  template: '<div style="background: black"><CircleLively v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  animated: true,
  width: '300',
  height: '300'
}
