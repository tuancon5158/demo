import InquiryForm from './InquiryForm.vue'

export default {
  title: 'organisms/InquiryForm',

  component: InquiryForm,

  argTypes: {}
}

const Template = (args) => ({
  components: { InquiryForm },
  setup() {
    return { args }
  },
  template: '<InquiryForm v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
