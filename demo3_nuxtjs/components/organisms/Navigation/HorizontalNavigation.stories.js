import HorizontalNavigation from './HorizontalNavigation.vue'

export default {
  title: 'organisms/Navigation/HorizontalNavigation',

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
  template:
    '<div style="margin-top: 20px;background: black"><HorizontalNavigation v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
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
  ]
}
