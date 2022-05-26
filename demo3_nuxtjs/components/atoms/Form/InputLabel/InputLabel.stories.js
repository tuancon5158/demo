import InputLabel from './InputLabel.vue'

export default {
  title: 'atoms/Form/InputLabel',

  component: InputLabel,

  argTypes: {
    value: {
      control: 'input'
    },
    color: {
      control: 'select',
      options: ['black', 'gray', 'label', 'white']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    colorRequired: {
      control: 'select',
      options: ['black', 'white', 'notice']
    },
    required: {
      control: 'boolean'
    }
  }
}
const Template = (args) => ({
  components: { InputLabel },
  setup() {
    return { args }
  },
  template: '<InputLabel v-bind="args" />'
})

export const MediumWithBlackColor = Template.bind({})
MediumWithBlackColor.args = {
  value: 'InputLabel1',
  color: 'black',
  size: 'medium',
  required: true,
  colorRequired: 'notice'
}

export const LargeWithGrayColor = Template.bind({})
LargeWithGrayColor.args = {
  value: 'InputLabel2',
  color: 'gray',
  size: 'large',
  required: false
}
