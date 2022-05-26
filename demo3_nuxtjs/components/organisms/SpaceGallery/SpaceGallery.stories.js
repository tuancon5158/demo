import SpaceGallery from './SpaceGallery.vue'

export default {
  title: 'organisms/SpaceGallery',

  component: SpaceGallery,

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
  components: { SpaceGallery },
  setup() {
    return { args }
  },
  template: '<SpaceGallery v-bind="args" />'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  arrayData: [
    {
      path: 'gallery/gallery-1.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-1.png',
      userSpace: '山田幸太郎',
      isShowContent: true,
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-2.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-2.png',
      userSpace: '山田幸太郎',
      isShowContent: true,
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-3.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-3.png',
      userSpace: '山田幸太郎',
      isShowContent: true,
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-4.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-4.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-5.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-5.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-1.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-1.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-6.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-6.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-1.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-1.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-2.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-2.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-3.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-3.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-4.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-4.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-5.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-5.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-6.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-6.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-1.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-1.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    },
    {
      path: 'gallery/gallery-2.png',
      label: '会員限定',
      title: 'xxxxxxxxxxxxxxxxxx宅',
      thumbnail: 'gallery/gallery-2.png',
      userSpace: '山田幸太郎',
      description:
        'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
    }
  ]
}
