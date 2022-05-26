import LicenseCard from './LicenseCard.vue'

export default {
  title: 'molecules/LicenseCard',

  component: LicenseCard,

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { LicenseCard },
  props: Object.keys(argTypes),
  template: '<LicenseCard v-bind="$props" />'
})

export const LicenseCardDate = Template.bind({})
LicenseCardDate.args = {
  name: '現在加入中のプラン',
  description: 'エンタープライズプラン',
  date: '2021/10/28'
}

export const LicenseCardLink = Template.bind({})
LicenseCardLink.args = {
  name: '現在加入中のプラン',
  description: 'エンタープライズプラン',
  nameLink: 'プランの変更',
  link: '/'
}
