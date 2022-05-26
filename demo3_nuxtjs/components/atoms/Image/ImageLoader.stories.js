import ImageLoader from './ImageLoader.vue'

export default {
  title: 'atoms/ImageLoader',

  component: ImageLoader,

  argTypes: {
    ratioType: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6']
    }
  }
}

const Template = (args) => ({
  components: { ImageLoader },
  setup() {
    return { args }
  },
  template: '<ImageLoader v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  path: require('@/assets/images/dummy-lg.png'),
  width: '300px',
  alt: 'dummy image',
  ratioType: '1'
}
