import SpaceRegisterForm from './SpaceRegisterForm.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/SpaceRegisterForm',

  component: SpaceRegisterForm,

  argTypes: {}
}
const Template = (args) => ({
  components: { SpaceRegisterForm },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<SpaceRegisterForm style="width: 63.2rem" v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
