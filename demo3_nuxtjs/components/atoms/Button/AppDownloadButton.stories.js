import AppDownloadButton from './AppDownloadButton.vue'

export default {
  title: 'atoms/Button/AppDownloadButton',

  component: AppDownloadButton,

  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium']
    },
    hasLink: {
      control: 'boolean'
    }
  }
}

const Template = (args) => ({
  components: { AppDownloadButton },
  setup() {
    return { args }
  },
  template: '<div style="background: #ccc; padding: 4rem"><AppDownloadButton v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  size: 'small',
  hasLink: false
}

export const MediumWithLink = Template.bind({})
MediumWithLink.args = {
  size: 'medium',
  hasLink: true
}
