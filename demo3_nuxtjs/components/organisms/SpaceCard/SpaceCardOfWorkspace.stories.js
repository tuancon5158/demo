import SpaceCardOfWorkspace from './SpaceCardOfWorkspace.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/SpaceCardOfWorkspace',

  component: SpaceCardOfWorkspace,

  argTypes: {}
}
const Template = (args) => ({
  components: { SpaceCardOfWorkspace },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<SpaceCardOfWorkspace style="width:300px" v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  dataSource: {
    id: 1,
    role: 1,
    thumbnailUrl: 'comony_api/storage/upload/temp/image-20211117080022581-5398688542.59',
    title: 'title',
    uploadAt: '2021-11-05T08:54:16.965Z'
  }
}
