import HorizontalNavigation from './HorizontalNavigation.vue'

export default {
  title: 'old/Navigation/HorizontalNavigation',

  component: HorizontalNavigation,

  argTypes: {
    navigationList: {
      control: 'array'
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { HorizontalNavigation },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><HorizontalNavigation v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  navigationList: [
    {
      id: '1',
      name: 'テスト1',
      name_en: 'Nav Item 1'
    },
    {
      id: '2',
      name: 'テスト2',
      name_en: 'Nav Item 2'
    },
    {
      id: '3',
      name: 'テスト3',
      name_en: 'Nav Item 3'
    }
  ]
}
