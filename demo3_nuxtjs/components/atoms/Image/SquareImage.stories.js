import SquareImage from './SquareImage.vue'

export default {
  title: 'atoms/SquareImage',

  component: SquareImage,

  argTypes: {
    rounded: {
      control: 'select',
      options: ['default', 'small', 'medium', 'xsmall']
    }
  }
}

const Template = (args) => ({
  components: { SquareImage },
  setup() {
    return { args }
  },
  template: '<SquareImage v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  path: require('@/assets/images/dummy-lg.png'),
  rounded: 'default',
  width: '50px',
  height: '50px'
}
