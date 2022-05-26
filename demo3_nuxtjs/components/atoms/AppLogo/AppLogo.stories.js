import AppLogo from './AppLogo.vue'

export default {
  title: 'atoms/AppLogo',

  component: AppLogo,

  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal']
    },
    iconColor: {
      control: 'color'
    }
  }
}

const Template = (args) => ({
  components: { AppLogo },
  setup() {
    return { args }
  },
  template: '<AppLogo v-bind="args"/>'
})

export const Horizontal = Template.bind({})
Horizontal.args = {
  iconColor: '#222',
  size: 'medium',
  direction: 'horizontal'
}

export const Vertical = Template.bind({})
Vertical.args = {
  iconColor: '#222',
  size: 'medium',
  direction: 'vertical'
}
