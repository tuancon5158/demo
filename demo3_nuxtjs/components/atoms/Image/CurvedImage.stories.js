import CurvedImage from './CurvedImage.vue'

export default {
  title: 'atoms/CurvedImage',

  component: CurvedImage,

  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'gallery']
    }
  }
}

const Template = (args) => ({
  components: { CurvedImage },
  setup() {
    return { args }
  },
  template: '<div style="width: 500px"><CurvedImage v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  path: require('@/assets/images/common/gallery-slider/slider_01.png'),
  type: 'default'
}
