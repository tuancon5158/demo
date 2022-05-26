import LineBreak from './LineBreak.vue'

export default {
  title: 'atoms/LineBreak',

  component: LineBreak,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    color: {
      control: 'select',
      options: ['white', 'darkblue']
    },
    size: {
      control: 'select',
      options: ['auto', 'sm', 'xs']
    },
    align: {
      control: 'select',
      options: ['left', 'right', 'center']
    }
  }
}
const Template = (args) => ({
  components: { LineBreak },
  setup() {
    return { args }
  },
  template: '<LineBreak v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  color: 'white',
  size: 'auto',
  align: 'left'
}

export const AlignRight = Template.bind({})
AlignRight.args = {
  color: 'darkblue',
  size: 'sm',
  align: 'right'
}
