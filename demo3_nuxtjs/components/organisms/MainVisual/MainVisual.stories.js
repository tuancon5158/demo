import MainVisual from './MainVisual.vue'

export default {
  title: 'organisms/MainVisual',

  component: MainVisual,

  argTypes: {}
}
const Template = (args) => ({
  components: { MainVisual },
  setup() {
    return { args }
  },
  template: '<MainVisual style="max-width:1440px;margin:auto" v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  mainVisualImage: [
    {
      image: 'mainVisualSlider.jpg',
      title: '過去と未来を創る建築メタバースの世界へ'
    }
  ]
}
