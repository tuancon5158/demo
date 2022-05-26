import LinkText from './LinkText.vue'

export default {
  title: 'atoms/LinkText',

  component: LinkText,

  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white']
    },
    moveTo: {
      control: 'select',
      options: ['www.google.com', '#']
    },
    newTab: {
      control: 'select',
      options: ['_blank', '_self']
    },
    underline: {
      control: 'select',
      options: [true, false]
    }
  },

  parameters: {
    backgrounds: {
      default: 'whiteParameters',
      values: [
        { name: 'whiteParameters', value: '#ffffff' },
        { name: 'blackParameters', value: '#333333' }
      ]
    }
  }
}

const Template = (args) => ({
  components: { LinkText },
  setup() {
    return { args }
  },
  template: '<LinkText v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
  link: '#',
  underline: false,
  value: 'Link Text'
}

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
  link: '#',
  underline: false,
  value: 'Link Text'
}

export const White = Template.bind({})
White.args = {
  color: 'white',
  link: '#',
  underline: true,
  value: '空間をもっと見る',
  fontSize: 'standard'
}
White.parameters = {
  backgrounds: { default: 'blackParameters' }
}
