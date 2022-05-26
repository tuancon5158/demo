import ImageCard from './ImageCard.vue'

export default {
  title: 'organisms/ImageCard',

  component: ImageCard,

  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'whiteParameters',
      values: [
        { name: 'whiteParameters', value: '#ffffff' },
        { name: 'blackParameters', value: '#333333' }
      ]
    }
  }
}

const Template = (args) => ({
  components: { ImageCard },
  setup() {
    return { args }
  },
  template: '<ImageCard style="max-width:684px" v-bind="args" />'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  path: 'image-card.png',
  name: '山田幸太郎',
  title: 'MrマリックのVRマジック',
  thumbnail: 'image-card.png',
  content:
    'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
}
