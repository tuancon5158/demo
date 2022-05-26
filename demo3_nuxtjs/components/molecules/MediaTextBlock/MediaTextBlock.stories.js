import MediaTextBlock from './MediaTextBlock.vue'

export default {
  title: 'molecules/MediaTextBlock',

  component: MediaTextBlock,

  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal']
    }
  }
}

const Template = (args) => ({
  components: { MediaTextBlock },
  setup() {
    return { args }
  },
  template: '<div style="margin: 20px auto;"><MediaTextBlock v-bind="args"/></div>'
})

export const Default = Template.bind({})
Default.args = {
  imagePath: require('@/assets/images/dummy-lg.png'),
  reverse: false,
  direction: 'vertical',
  title: 'What is Lorem Ipsum?',
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  lineColor: 'primary'
}

export const Reverse = Template.bind({})
Reverse.args = {
  imagePath: require('@/assets/images/dummy-lg.png'),
  reverse: true,
  direction: 'vertical',
  title: 'What is Lorem Ipsum?',
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  lineColor: 'primary'
}
