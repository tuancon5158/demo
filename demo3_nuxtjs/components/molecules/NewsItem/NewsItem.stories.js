import NewsItem from './NewsItem.vue'

export default {
  title: 'molecules/NewsItem',

  component: NewsItem,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    linkColor: {
      control: 'select',
      options: ['white', 'primary', 'secondary']
    }
  }
}

const Template = (args) => ({
  components: { NewsItem },
  setup() {
    return { args }
  },
  template: '<div style="margin-top: 20px;"><NewsItem v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  linkColor: 'white',
  dateItem: '2021/07/08',
  content: 'comonyアプリケーション1.18.3をリリースしました。'
}
