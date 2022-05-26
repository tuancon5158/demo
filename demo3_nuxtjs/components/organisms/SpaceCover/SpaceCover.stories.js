import SpaceCover from './SpaceCover.vue'

export default {
  title: 'organisms/SpaceCover',
  components: SpaceCover,

  argTypes: {
    path: {
      control: 'text'
    },
    coverType: {
      control: 'select',
      options: [0, 1, 2, 3]
    },
    title: {
      control: 'text'
    },
    link: {
      control: 'text'
    }
  }
}

const Template = (args) => ({
  components: { SpaceCover },
  setup() {
    return { args }
  },
  template: '<div style="margin-top: 20px;"><SpaceCover v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  coverType: 0,
  path: ''
}

export const WithVideo = Template.bind({})
WithVideo.args = {
  coverType: 1,
  path: 'UWXxkT0Tgr4'
}
