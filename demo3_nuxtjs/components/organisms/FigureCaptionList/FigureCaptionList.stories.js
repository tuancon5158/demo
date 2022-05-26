import FigureCaptionList from './FigureCaptionList.vue'

export default {
  title: 'organisms/FigureCaptionList',

  component: FigureCaptionList,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { FigureCaptionList },
  props: Object.keys(argTypes),
  template:
    '<div style="background: #ccc; padding: 2rem"><FigureCaptionList v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  figureCaptionList: [
    {
      image: 'figureCaptionItem1.png',
      title: 'xxxxxを〇〇する',
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
    },
    {
      image: 'figureCaptionItem2.png',
      title: 'xxxxxを〇〇する',
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
    },
    {
      image: 'figureCaptionItem3.png',
      title: 'xxxxxを〇〇する',
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト'
    }
  ]
}
