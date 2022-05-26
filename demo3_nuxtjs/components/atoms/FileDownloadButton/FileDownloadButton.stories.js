import FileDownloadButton from './FileDownloadButton.vue'

export default {
  title: 'atoms/FileDownloadButton',

  component: FileDownloadButton,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    iconType: {
      control: 'select',
      options: ['pdf', 'download', 'external-link']
    },
    link: {
      control: 'text'
    },
    type: {
      control: 'select',
      options: ['download', 'externalLink']
    },
    name: {
      control: 'text'
    }
  }
}
const Template = (args) => ({
  components: { FileDownloadButton },
  setup() {
    return { args }
  },
  template: '<FileDownloadButton v-bind="args" />'
})

export const PdfDownload = Template.bind({})
PdfDownload.args = {
  name: 'PDF資料',
  iconType: 'pdf',
  link: '/docs/upload-manual.pdf',
  type: 'download'
}

export const NormalDocDownload = Template.bind({})
NormalDocDownload.args = {
  name: 'アップロード用キット',
  iconType: 'download',
  link: '/docs/upload-manual.pdf',
  type: 'download'
}

export const ExternalLink = Template.bind({})
ExternalLink.args = {
  name: 'ExternalLink',
  iconType: 'external-link',
  link: '',
  type: 'externalLink'
}
