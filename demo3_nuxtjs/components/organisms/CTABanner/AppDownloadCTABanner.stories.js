import AppDownloadCTABanner from './AppDownloadCTABanner.vue'

export default {
  title: 'organisms/CTABanner/AppDownloadCTABanner',

  component: AppDownloadCTABanner,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { AppDownloadCTABanner },
  props: Object.keys(argTypes),
  template: '<AppDownloadCTABanner v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  image: 'CTABanner01.png'
}

export const WithText = Template.bind({})
WithText.args = {
  image: 'CTABanner02.png',
  text: '建築メタバースプラットフォーム'
}
