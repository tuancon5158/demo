import Notification from './Notification.vue'
import { provideNotification } from '~/composables'

export default {
  title: 'molecules/Notification',

  component: Notification,

  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'success', 'default']
    },
    message: {
      control: 'text'
    },
    status: {
      control: 'boolean'
    },
    redirectTo: {
      control: 'text'
    }
  }
}

const Template = (args) => ({
  components: { Notification },
  setup() {
    provideNotification()

    return { args }
  },
  template: '<div style="margin-top: 20px;"><Notification v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  type: 'default',
  message: 'Default message',
  status: true
}

export const Warning = Template.bind({})
Warning.args = {
  type: 'error',
  message: 'Warning message',
  status: true
}

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  message: 'Success message',
  status: true
}
