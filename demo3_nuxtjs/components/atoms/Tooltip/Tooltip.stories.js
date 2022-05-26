import Tooltip from './Tooltip.vue'

export default {
  title: 'atoms/Tooltip',

  component: Tooltip,

  argTypes: {
    bgColor: {
      control: 'select',
      options: ['primary', 'black']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right']
    }
  }
}
const Template = (args) => ({
  components: { Tooltip },
  setup() {
    return { args }
  },
  template: '<Tooltip v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  bgColor: 'black',
  size: 'medium',
  textAlign: 'center'
}
