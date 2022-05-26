import IconCount from './IconCount.vue'

export default {
  title: 'molecules/IconCount',

  component: IconCount,

  argTypes: {
    type: {
      control: 'select',
      options: ['viewer', 'favorite']
    },
    countNumber: {
      control: 'number'
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { IconCount },
  props: Object.keys(argTypes),
  template: '<div style="margin: 20px;"><IconCount v-bind="$props" /></div>'
})

export const Viewer = Template.bind({})
Viewer.args = {
  type: 'viewer',
  countNumber: 7
}

export const Favorite = Template.bind({})
Favorite.args = {
  type: 'favorite',
  countNumber: 7
}
