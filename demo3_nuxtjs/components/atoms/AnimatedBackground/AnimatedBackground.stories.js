import AnimatedBackground from './AnimatedBackground.vue'

export default {
  title: 'atoms/AnimatedBackground',

  component: AnimatedBackground,

  argTypes: {}
}
const Template = (args) => ({
  components: { AnimatedBackground },
  setup() {
    return { args }
  },
  template: '<AnimatedBackground style="height: 300vh;" v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
