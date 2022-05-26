import FlashLively from './FlashLively.vue'

export default {
  title: 'atoms/LivelyIcon/FlashLively',

  component: FlashLively,

  argTypes: {}
}

const Template = (args) => ({
  components: { FlashLively },
  setup() {
    return { args }
  },
  template:
    '<div style="background: black;height: 100vh;position: relative;"><div style="position: absolute;left: -360px;bottom: -100px;z-index: 1;"><FlashLively v-bind="$props" /></div></div>'
})

export const Default = Template.bind({})
Default.args = {
  animated: true,
  width: '300',
  height: '300'
}
