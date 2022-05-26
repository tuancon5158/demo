import NotFound from './NotFound.vue'
export default {
  title: 'molecules/NotFound',

  component: NotFound,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { NotFound },
  props: Object.keys(argTypes),
  template: '<NotFound v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  title: '空間のアップロード権がありません。'
}
