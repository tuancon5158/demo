import WorkSpaceSettingForm from './WorkSpaceSettingForm.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/WorkSpaceSettingForm',

  component: WorkSpaceSettingForm,

  argTypes: {}
}

const Template = (args) => ({
  components: { WorkSpaceSettingForm },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<WorkSpaceSettingForm v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
