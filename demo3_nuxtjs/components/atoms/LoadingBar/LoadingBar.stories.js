import LoadingBar from './LoadingBar.vue'

export default {
  title: 'atoms/LoadingBar',

  component: LoadingBar,

  argTypes: {
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'black']
    },
    height: {
      control: { type: 'text' }
    }
  }
}
const Template = (args) => ({
  components: { LoadingBar },
  setup() {
    return { args }
  },
  template: '<LoadingBar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  bgColor: 'secondary',
  height: '7'
}
