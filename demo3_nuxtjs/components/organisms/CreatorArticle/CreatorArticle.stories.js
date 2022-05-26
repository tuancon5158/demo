import CreatorArticle from './CreatorArticle.vue'
import { handleScroll } from '~/composables/utilities/scroll'

const creatorImages = [
  { title: 'image1' },
  { title: 'image2' },
  { title: 'image3' },
  { title: 'image4' }
]

export default {
  title: 'organisms/CreatorArticle',

  component: CreatorArticle
}

const Template = (args) => ({
  components: { CreatorArticle },
  setup() {
    const { slideItems } = handleScroll()

    return { args, slideItems }
  },
  template:
    '<div v-observe-visibility="slideItems" style="margin-top: 20px;background: black"><CreatorArticle v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  backgroundPath: require('@/assets/images/gallery_bg1.webp'),
  imageList: creatorImages
}
