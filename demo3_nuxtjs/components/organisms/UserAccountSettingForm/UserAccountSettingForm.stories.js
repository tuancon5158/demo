import UserAccountSettingForm from './UserAccountSettingForm.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/UserAccountSettingForm',

  component: UserAccountSettingForm,

  parameters: {
    backgrounds: {
      default: 'white'
    }
  },

  argTypes: {}
}
const Template = (args) => ({
  components: { UserAccountSettingForm },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<UserAccountSettingForm v-bind="args" />'
})

export const UserAccountSettingFormDefault = Template.bind({})
UserAccountSettingFormDefault.args = {}
