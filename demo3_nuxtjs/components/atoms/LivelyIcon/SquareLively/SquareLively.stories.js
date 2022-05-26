import SquareLively from './SquareLively.vue'

export default {
  title: 'atoms/LivelyIcon/SquareLively',

  component: SquareLively,

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
  },

  parameters: {
    backgrounds: {
      default: 'whiteParameters',
      values: [
        { name: 'whiteParameters', value: '#ffffff' },
        { name: 'blackParameters', value: '#333333' }
      ]
    }
  }
}

const Template = (args) => ({
  components: { SquareLively },
  setup() {
    return { args }
  },
  template:
    '<div style="height:130vh"><SquareLively style="position:relative;top:150px" v-bind="args"/></div>'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  animated: true,
  width: '300',
  height: '300'
}
