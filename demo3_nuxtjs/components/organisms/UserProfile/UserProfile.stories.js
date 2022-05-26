import UserProfile from './UserProfile.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/UserProfile',

  component: UserProfile,

  argTypes: {
    hasIcons: {
      control: 'boolean'
    }
  },

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
  components: { UserProfile },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template:
    '<div style="position: relative;max-width: 1920px;margin: auto;height: 100vh;display: flex;align-items: center; justify-content: center;"><UserProfile v-bind="args"/></div>'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  thumbnailUrl: require('@/assets/images/common/default-avator.png'),
  name: '建築家　山本直隆',
  companyName: 'LastmileWorks',
  description:
    '様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで         近未来のコンセプトを形にします。また、友達と仮想空間に入って交流したり                     イベントに参加したり、未来の都市空間を一足先に   体験することもできます。'
}

export const WithSocialMediaIcons = Template.bind({})
WithSocialMediaIcons.parameters = {
  backgrounds: { default: 'blackParameters' }
}
WithSocialMediaIcons.args = {
  hasIcons: true,
  thumbnailUrl: require('@/assets/images/common/default-avator.png'),
  name: '建築家　山本直隆',
  companyName: 'LastmileWorks',
  description:
    '様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで 様々な建築空間をメタバース内に構築することで         近未来のコンセプトを形にします。また、友達と仮想空間に入って交流したり                     イベントに参加したり、未来の都市空間を一足先に   体験することもできます。',
  companyUrl: 'companyUrl',
  facebookUrl: 'facebookUrl',
  twitterUrl: 'twitterUrl',
  instagramUrl: 'instagramUrl'
}
