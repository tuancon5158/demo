import HeadingSet from './HeadingSet.vue'

export default {
  title: 'molecules/HeadingSet',

  component: HeadingSet,

  argTypes: {
    labelColor: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'white']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { HeadingSet },
  props: Object.keys(argTypes),
  template: '<HeadingSet v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'comony space list',
  note: 'おすすめの空間一覧',
  labelColor: 'primary',
  level: '1',
  align: 'center',
  headings: [
    { text: 'Set foot on a', color: 'black', spBreak: false },
    { text: ' virtual world', color: 'primary', spBreak: false }
  ]
}
