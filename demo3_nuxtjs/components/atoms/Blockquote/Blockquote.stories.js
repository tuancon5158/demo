import Blockquote from './Blockquote.vue'

export default {
  title: 'atoms/Blockquote',

  component: Blockquote,

  argTypes: {
    color: {
      control: 'select',
      options: ['black', 'gray']
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right']
    }
  }
}
const Template = (args) => ({
  components: { Blockquote },
  setup() {
    return { args }
  },
  template: '<Blockquote v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  color: 'gray',
  cite: 'https://cite.test.com',
  position: 'left',
  msg: '出展：日本経済社（新型コロナウイルス感染拡大が注文住宅購入検討層に与えた影響の把握）'
}
export const RightPosition = Template.bind({})
RightPosition.args = {
  color: 'gray',
  cite: 'https://cite.test.com',
  position: 'right',
  msg: '出展：日本経済社（新型コロナウイルス感染拡大が注文住宅購入検討層に与えた影響の把握）'
}
