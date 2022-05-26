import AppLaunchModal from './AppLaunchModal.vue'

export default {
  title: 'organisms/Modal/AppLaunchModal',

  component: AppLaunchModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { AppLaunchModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><AppLaunchModal v-bind="$props" /></div>'
})

export const Default = Template.bind({})
