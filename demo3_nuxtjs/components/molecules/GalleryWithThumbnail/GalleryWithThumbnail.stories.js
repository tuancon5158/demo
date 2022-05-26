import GalleryWithThumbnail from './GalleryWithThumbnail.vue'

export default {
  title: 'molecules/GalleryWithThumbnail',

  component: GalleryWithThumbnail,

  argTypes: {}
}

const Template = (args) => ({
  components: { GalleryWithThumbnail },
  setup() {
    return { args }
  },
  template: '<GalleryWithThumbnail v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  backgroundPath: require('@/assets/images/gallery_bg1.webp'),
  imageList: [{ title: 'image1' }, { title: 'image2' }, { title: 'image3' }, { title: 'image4' }]
}
