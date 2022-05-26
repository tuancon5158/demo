import GallerySlider from './GallerySlider.vue'

const Sliders = [
  {
    image: require('@/assets/images/common/gallery-slider/slider_01.png'),
    alt: 'スライダー1'
  },
  {
    image: require('@/assets/images/common/gallery-slider/slider_02.png'),
    alt: 'スライダー2'
  },
  {
    image: require('@/assets/images/common/gallery-slider/slider_03.png'),
    alt: 'スライダー3'
  },
  {
    image: require('@/assets/images/common/gallery-slider/slider_01.png'),
    alt: 'スライダー5'
  },
  {
    image: require('@/assets/images/common/gallery-slider/slider_01.png'),
    alt: 'スライダー6'
  }
]

export default {
  title: 'organisms/Slider/GallerySlider',

  component: GallerySlider,

  argTypes: {
    sliders: {
      control: 'array'
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { GallerySlider },
  props: Object.keys(argTypes),
  template: '<div style="background: black; padding: 1rem"><GallerySlider v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  sliders: Sliders
}

export const Reverse = Template.bind({})
Reverse.args = {
  sliders: Sliders,
  reverse: true
}
