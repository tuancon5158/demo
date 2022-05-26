import SpaceUploadCompletedModal from './SpaceUploadCompletedModal.vue'

export default {
  title: 'organisms/Modal/SpaceUploadCompletedModal',

  component: SpaceUploadCompletedModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { SpaceUploadCompletedModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><SpaceUploadCompletedModal v-bind="$props" /></div>'
})

export const Default = Template.bind({})
