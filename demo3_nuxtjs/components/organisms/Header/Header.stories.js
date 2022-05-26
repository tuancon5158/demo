import Header from './Header.vue'
import { provideWorkspace, provideMember } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'organisms/Header',

  component: Header,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    bgColor: {
      control: 'select',
      options: ['black', 'white']
    }
  }
}
const Template = (args) => ({
  components: { Header },
  setup() {
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template: '<Header v-bind="args" />'
})

// Nuxt Link auto detect action click, no need to add
export const Default = Template.bind({})
Default.args = {
  bgColor: 'white'
}

export const WithBlackBackground = Template.bind({})
WithBlackBackground.args = {
  bgColor: 'black'
}
