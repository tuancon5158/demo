import LabelButton from './LabelButton.vue'

export default {
  title: 'atoms/Button/LabelButton',

  component: LabelButton,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    borderColor: {
      control: 'select',
      options: ['primary', 'secondary', 'white']
    },
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'transparent']
    },
    fontColor: {
      control: 'select',
      options: ['primary', 'secondary', 'white']
    }
  }
}

const Template = (args) => ({
  components: { LabelButton },
  setup() {
    return { args }
  },
  template: '<LabelButton v-bind="args" />'
})

export const FullsizePrimaryColorLabelButton = Template.bind({})
FullsizePrimaryColorLabelButton.args = {
  label: 'Fullsize PrimaryColor LabelButton',
  bgColor: 'primary',
  borderColor: 'primary',
  fontColor: 'white',
  link: ''
}

export const FullsizeSecondaryColorLabelButton = Template.bind({})
FullsizeSecondaryColorLabelButton.args = {
  label: 'Fullsize SecondaryColor LabelButton',
  bgColor: 'secondary',
  borderColor: 'secondary',
  fontColor: 'white',
  link: ''
}

export const AutosizeWhiteColorLabelButton = Template.bind({})
AutosizeWhiteColorLabelButton.args = {
  label: 'Autosize WhiteColor LabelButton',
  bgColor: 'transparent',
  borderColor: 'white',
  fontColor: 'white',
  size: 'auto',
  link: ''
}
