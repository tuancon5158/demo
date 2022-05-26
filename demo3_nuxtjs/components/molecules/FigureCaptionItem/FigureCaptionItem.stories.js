import FigureCaptionItem from './FigureCaptionItem.vue'

export default {
  title: 'molecules/FigureCaptionItem',

  component: FigureCaptionItem,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { FigureCaptionItem },
  props: Object.keys(argTypes),
  template:
    '<div style="background: #ccc; padding: 2rem"><FigureCaptionItem v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  image: 'figureCaptionItem1.png',
  title: 'xxxxxを〇〇する',
  text: 'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
}
