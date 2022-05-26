import HeroImageSection from './HeroImageSection.vue'

export default {
  title: 'organisms/HeroImageSection',
  components: HeroImageSection,

  argTypes: {
    image: {
      control: 'text'
    },
    heading: {
      control: 'text'
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { HeroImageSection },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><HeroImageSection v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  image: 'gallery/banner.webp',
  heading: '空間ギャラリー'
}

export const WithNavigation = Template.bind({})
WithNavigation.args = {
  navigationList: [
    {
      id: '1',
      name: 'テスト1',
      nameEn: 'Nav Item 1'
    },
    {
      id: '2',
      name: 'テスト2',
      nameEn: 'Nav Item 2'
    },
    {
      id: '3',
      name: 'テスト3',
      nameEn: 'Nav Item 3'
    },
    {
      id: '4',
      name: 'テスト4',
      nameEn: 'Nav Item 4'
    },
    {
      id: '5',
      name: 'テスト5',
      nameEn: 'Nav Item 5'
    },
    {
      id: '6',
      name: 'テスト6',
      nameEn: 'Nav Item 6'
    }
  ],
  // hasNavigation: true,
  image: 'gallery/banner.webp',
  heading: '空間ギャラリー'
}

export const WithAnimation = Template.bind({})
WithAnimation.args = {
  image: 'gallery/banner.webp',
  heading: '空間ギャラリー',
  hasAnimation: true
}
