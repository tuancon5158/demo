import Breadcrumbs from './Breadcrumbs.vue'

export default {
  title: 'molecules/Breadcrumbs',

  component: Breadcrumbs,

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
  components: { Breadcrumbs },
  setup() {
    return { args }
  },
  template: '<Breadcrumbs v-bind="args"/>'
})

export const Default = Template.bind({})

Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}

Default.args = {
  isStorybook: true
}
