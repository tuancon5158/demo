import FAQ from './FAQ.vue'
import { handleScroll } from '~/composables/utilities/scroll'

export default {
  title: 'organisms/FAQ',

  component: FAQ,

  argTypes: {}
}

const Template = (args) => ({
  components: { FAQ },
  setup() {
    const { slideItems } = handleScroll()

    return { args, slideItems }
  },
  template: '<div v-observe-visibility="slideItems"><FAQ v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  listItem: [
    {
      question: 'question',
      answer:
        'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
    },
    {
      question: 'question',
      answer: 'テキストテキストテキストテ'
    },
    {
      question: 'question',
      answer:
        'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
    }
  ]
}
