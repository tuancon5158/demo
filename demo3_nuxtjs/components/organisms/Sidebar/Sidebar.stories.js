import Sidebar from './Sidebar.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/Sidebar',

  component: Sidebar,

  parameters: {},

  argTypes: {}
}
const Template = (args) => ({
  components: { Sidebar },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<Sidebar v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
