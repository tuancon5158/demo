import UserDirectory from './UserDirectory.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/UserDirectory',

  component: UserDirectory,

  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'whiteParameters',
      values: [
        { name: 'whiteParameters', value: '#ffffff' },
        { name: 'blackParameters', value: '#333333' }
      ]
    }
  }
}
const Template = (args) => ({
  components: { UserDirectory },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template:
    '<div style="position: relative;max-width: 1920px;margin: auto;height: 100vh"><UserDirectory  v-bind="args"/></div>'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  userDirectoryData: [
    {
      imagePath: 'https://www.w3schools.com/howto/img_avatar.png',
      userName: '建築家',
      companyName: 'Lastmile Works'
    },
    {
      imagePath: 'https://www.w3schools.com/howto/img_avatar.png',
      userName: '建築家',
      companyName: 'Lastmile Works'
    },
    {
      imagePath: 'https://www.w3schools.com/howto/img_avatar.png',
      userName: '建築家',
      companyName: 'Lastmile Works'
    }
  ]
}
