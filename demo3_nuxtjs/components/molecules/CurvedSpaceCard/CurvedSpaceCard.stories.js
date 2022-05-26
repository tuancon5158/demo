import CurvedSpaceCard from './CurvedSpaceCard.vue'

export default {
  title: 'molecules/CurvedSpaceCard',

  component: CurvedSpaceCard,

  argTypes: {}
}

const Template = (args) => ({
  components: { CurvedSpaceCard },
  setup() {
    return { args }
  },
  template: '<CurvedSpaceCard style="max-width:684px" v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  thumbnailUrl: require('@/assets/images/gallery/gallery-1.png'),
  isShowContent: false
}

export const WithContent = Template.bind({})
WithContent.args = {
  label: '会員限定',
  title: 'xxxxxxxxxxxxxxxxxx宅',
  thumbnailUrl: require('@/assets/images/gallery/gallery-1.png'),
  userName: '山田幸太郎',
  userThumbnailUrl: require('@/assets/images/gallery/gallery-1.png'),
  isShowContent: true,
  description:
    'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
}
