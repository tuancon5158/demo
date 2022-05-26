import ImageTextBlock from './ImageTextBlock.vue'

export default {
  title: 'molecules/ImageTextBlock',

  component: ImageTextBlock,

  argTypes: {
    lineColor: {
      control: 'select',
      options: ['primary', 'secondary', 'white']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { ImageTextBlock },
  props: Object.keys(argTypes),
  template: '<div style="margin: 20px;"><ImageTextBlock v-bind="$props"/></div>'
})

export const Default = Template.bind({})
Default.args = {
  imagePath: require('@/assets/images/dummy-img.png'),
  reverse: false,
  title: 'What is Lorem Ipsum?',
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  lineColor: 'primary'
}
