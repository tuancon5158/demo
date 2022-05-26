import ButtonToTop from './ButtonTopTop.vue'

export default {
  title: 'atoms/Button/ButtonToTop',

  component: ButtonToTop,

  argTypes: {}
}

const Template = (args) => ({
  components: { ButtonToTop },
  setup() {
    return { args }
  },
  template:
    '<div style="position:relative; margin: 4rem"><ButtonToTop v-bind="args" style="opacity: 1 " /></div>'
})

export const Default = Template.bind({})
Default.args = {}
