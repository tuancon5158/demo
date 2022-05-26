import CircleImage from './CircleImage.vue'

export default {
  title: 'atoms/CircleImage',

  component: CircleImage,

  argTypes: {
    type: {
      control: 'select',
      options: ['image', 'icon']
    },
    borderColor: {
      control: 'select',
      options: ['primary', 'secondary', 'gray', 'none']
    }
  }
}

const Template = (args) => ({
  components: { CircleImage },
  setup() {
    return { args }
  },
  template: '<CircleImage v-bind="args"/>'
})

export const IconWithPrimaryColorBorder = Template.bind({})
IconWithPrimaryColorBorder.args = {
  type: 'icon',
  size: '240px',
  borderColor: 'primary',
  path: require('@/assets/images/dummy.png')
}

export const ImageWithGrayColorBorder = Template.bind({})
ImageWithGrayColorBorder.args = {
  type: 'image',
  size: '280px',
  borderColor: 'gray',
  path: require('@/assets/images/dummy.png')
}

export const Avator = Template.bind({})
Avator.args = {
  type: 'image',
  size: '35px',
  borderColor: 'none',
  path: require('@/assets/images/dummy.png')
}
