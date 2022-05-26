import WorkSpaceIssueForm from './WorkSpaceIssueForm.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/WorkSpaceIssueForm',

  component: WorkSpaceIssueForm,

  argTypes: {}
}

const Template = (args) => ({
  components: { WorkSpaceIssueForm },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<WorkSpaceIssueForm v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
