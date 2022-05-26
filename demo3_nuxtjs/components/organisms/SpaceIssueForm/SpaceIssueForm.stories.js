import SpaceIssueForm from './SpaceIssueForm.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/SpaceIssueForm',

  component: SpaceIssueForm,

  argTypes: {}
}

const Template = (args) => ({
  components: { SpaceIssueForm },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<SpaceIssueForm v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
