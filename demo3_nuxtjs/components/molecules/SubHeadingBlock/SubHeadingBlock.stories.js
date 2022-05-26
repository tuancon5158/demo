import SubHeadingBlock from './SubHeadingBlock.vue'

export default {
  title: 'molecules/SubHeadingBlock',

  component: SubHeadingBlock,

  argTypes: {},

  parameters: {
    backgrounds: {
      default: 'whiteParameters',
      values: [
        { name: 'whiteParameters', value: '#ffffff' },
        { name: 'blackParameters', value: '#B8B8B8' }
      ]
    }
  }
}
const Template = (args) => ({
  components: { SubHeadingBlock },
  setup() {
    return { args }
  },
  template: '<SubHeadingBlock style="margin-top:60px" v-bind="args"/>'
})

export const Default = Template.bind({})
Default.parameters = {
  backgrounds: { default: 'blackParameters' }
}
Default.args = {
  title: '<span>リア</span>ルさにこだわった<br/>ハイパーリアリスティック空間',
  description:
    'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテ'
}
