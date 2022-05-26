import AccordionItem from './AccordionItem.vue'
import { handleScroll } from '~/composables/utilities/scroll'

export default {
  title: 'molecules/AccordionItem',

  component: AccordionItem,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    isScroll: {
      control: 'boolean'
    },
    color: {
      control: 'select',
      options: ['black', 'darkblue', 'transparent']
    },
    accordionItem: {
      control: 'object'
    }
  }
}

const Template = (args) => ({
  components: { AccordionItem },
  setup() {
    const { slideItems } = handleScroll()

    return { args, slideItems }
  },
  template:
    '<div style="margin-top: 20px;" v-observe-visibility="slideItems"><AccordionItem v-bind="args"/></div>'
})

export const Default = Template.bind({})
Default.args = {
  isScroll: false,
  color: 'transparent',
  accordionItem: {
    question: 'Question 1',
    answer: 'Answer 1 Answer 1 Answer 1 Answer 1 Answer 1 Answer 1 Answer 1 Answer 1'
  }
}
