import UserAvatar from './UserAvatar.vue'

export default {
  title: 'molecules/UserAvatar',

  component: UserAvatar,

  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge']
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { UserAvatar },
  props: Object.keys(argTypes),
  template: '<UserAvatar v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  imagePath: require('~/assets/images/dummy.png'),
  userName: 'test'
}
