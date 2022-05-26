import Footer from './Footer.vue'

export default {
  title: 'organisms/Footer',

  component: Footer,

  argTypes: {}
}
/// nuxt-link auto match event click to storybook
const Template = (_, { argTypes }) => ({
  components: { Footer },
  props: Object.keys(argTypes),
  template: '<Footer v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {}
