import WorkSpaceRegisterForm from './WorkSpaceRegisterForm.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/WorkSpaceRegisterForm',

  component: WorkSpaceRegisterForm,

  argTypes: {
    isLink: {
      control: 'select',
      options: [true, false]
    }
  }
}
const Template = (args) => ({
  components: { WorkSpaceRegisterForm },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<WorkSpaceRegisterForm v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
