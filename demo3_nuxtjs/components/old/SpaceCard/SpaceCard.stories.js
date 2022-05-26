import SpaceCard from './SpaceCard.vue'
// import { options } from './../../../.nuxt-storybook/nuxt-i18n/options'

export default {
  title: 'old/SpaceCard',

  component: SpaceCard,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    isLink: {
      control: 'select',
      options: [true, false]
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { SpaceCard },
  props: Object.keys(argTypes),
  template: '<SpaceCard v-bind="$props"/>'
})

export const Default = Template.bind({})
Default.args = {
  dataSource: {
    id: 1,
    thumbnailUrl: '',
    title: 'title',
    numFavorites: '10',
    numViewers: '1',
    category: {
      colorCode: 'colorCode',
      name: 'name',
      nameEn: 'nameEn'
    },
    userSpaces: [
      {
        user: {
          thumbnailUrl: 'thumbnailUrl'
        }
      }
    ]
  }
}
