import DownloadButton from './DownloadButton.vue'

export default {
  title: 'atoms/Button/DownloadButton',

  component: DownloadButton,

  argTypes: {
    type: {
      control: 'select',
      options: ['windows', 'mac']
    }
  }
}

const Template = (args) => ({
  components: { DownloadButton },
  setup() {
    return { args }
  },
  template: '<DownloadButton v-bind="args" />'
})

export const WindowsDownloadButton = Template.bind({})
WindowsDownloadButton.args = {
  type: 'windows',
  appVersion: '1.10.0'
}

export const MacDownloadButton = Template.bind({})
MacDownloadButton.args = {
  type: 'mac',
  appVersion: '1.10.0'
}
