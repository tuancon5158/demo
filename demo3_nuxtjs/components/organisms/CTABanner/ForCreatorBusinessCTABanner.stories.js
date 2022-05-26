import ForCreatorBusinessCTABanner from './ForCreatorBusinessCTABanner.vue'

export default {
  title: 'organisms/CTABanner/ForCreatorBusinessCTABanner',

  component: ForCreatorBusinessCTABanner,

  argTypes: {}
}

const Template = (args) => ({
  components: { ForCreatorBusinessCTABanner },
  setup() {
    return { args }
  },
  template: '<ForCreatorBusinessCTABanner v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  image: 'for-creator-business-CTABanner01.png',
  title: '建築メタバースプラットフォーム',
  buttonLabel: 'クリエイターページへ行く',
  description:
    '背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です背景は仮です'
}
