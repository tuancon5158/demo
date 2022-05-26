import EmbedButtonModal from './EmbedButtonModal.vue'

export default {
  title: 'organisms/Modal/EmbedButtonModal',

  component: EmbedButtonModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { EmbedButtonModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><EmbedButtonModal v-bind="$props" /></div>'
})

export const Default = Template.bind({})
