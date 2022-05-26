import SpaceGalleryType2 from './SpaceGalleryType2.vue'

export default {
  title: 'organisms/SpaceGalleryType2',

  component: SpaceGalleryType2,

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
  components: { SpaceGalleryType2 },
  setup() {
    return { args }
  },
  template: '<SpaceGalleryType2 v-bind="args" />'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  arrayData: [
    {
      path: 'gallery/gallery-1.png'
    },
    {
      path: 'gallery/gallery-2.png'
    },
    {
      path: 'gallery/gallery-3.png'
    },
    {
      path: 'gallery/gallery-4.png'
    },
    {
      path: 'gallery/gallery-5.png'
    },
    {
      path: 'gallery/gallery-1.png'
    },
    {
      path: 'gallery/gallery-6.png'
    },
    {
      path: 'gallery/gallery-1.png'
    },
    {
      path: 'gallery/gallery-2.png'
    },
    {
      path: 'gallery/gallery-3.png'
    },
    {
      path: 'gallery/gallery-4.png'
    },
    {
      path: 'gallery/gallery-5.png'
    },
    {
      path: 'gallery/gallery-6.png'
    },
    {
      path: 'gallery/gallery-1.png'
    },
    {
      path: 'gallery/gallery-2.png'
    }
  ]
}
