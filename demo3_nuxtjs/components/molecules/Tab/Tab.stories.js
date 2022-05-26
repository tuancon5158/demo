import Tab from './Tab.vue'

const tabOptions = [
  { label: 'abcabcabc', value: '0' },
  { label: 'abc1abc1abc1', value: '1' },
  { label: 'abc2abc2abc2', value: '2' }
]

export default {
  title: 'molecules/Tab',

  component: Tab,

  argTypes: {
    tabOptions: {
      control: 'array'
    }
  }
}

const Template = (args) => ({
  components: { Tab },
  setup() {
    return { args }
  },
  template: `<Tab
 v-bind="args"
>
  <template #0>
    <h1>Tab1</h1>
  </template>
  <template #1>
    <h1>Tab2</h1>
  </template>
  <template #2>
    <h1>Tab3</h1>
  </template>
</Tab>`
})

export const Default = Template.bind({})
Default.args = {
  tabOptions: tabOptions
}
