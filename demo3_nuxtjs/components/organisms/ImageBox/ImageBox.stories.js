import ImageBox from './ImageBox.vue'

export default {
  title: 'organisms/ImageBox',

  component: ImageBox,

  argTypes: {}
}
const Template = (args) => ({
  components: { ImageBox },
  setup() {
    return { args }
  },
  template: '<ImageBox v-bind="args"/>'
})

export const PositionLeft = Template.bind({})
PositionLeft.args = {
  src: 'https://www.w3schools.com/css/img_5terre.jpg',
  number: '1',
  title: '過去/現代/未来の建築メタバーで空間をつなぐ体験を',
  position: 'left',
  description:
    'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキスト'
}

export const PositionRight = Template.bind({})
PositionRight.args = {
  src: 'https://www.w3schools.com/css/img_5terre.jpg',
  number: '1',
  title: '過去/現代/未来の建築メタバーで空間をつなぐ体験を',
  position: 'right',
  description:
    'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキスト'
}
