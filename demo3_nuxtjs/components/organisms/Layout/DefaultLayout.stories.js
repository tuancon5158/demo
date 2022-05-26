import DefaultLayout from './DefaultLayout.vue'

export default {
  title: 'organisms/DefaultLayout',

  component: DefaultLayout,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    bgColor: {
      control: 'select',
      options: ['white', 'gray']
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { DefaultLayout },
  props: Object.keys(argTypes),
  template: `<DefaultLayout v-bind="$props">
  <div :style="{ border: '2px solid red'}">slot here</div><div :style="{ border: '2px solid red'}">slot here</div>
  <div :style="{ border: '2px solid red'}">slot here</div><div :style="{ border: '2px solid red'}">slot here</div>
  </DefaultLayout>`
})

export const Default = Template.bind({})
Default.args = {}
