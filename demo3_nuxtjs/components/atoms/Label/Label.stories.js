import Label from './Label.vue'

export default {
  title: 'atoms/Label',

  component: Label,

  argTypes: {
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'darkblue', 'black', 'blue', 'green', 'red']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    rounded: {
      control: 'select',
      options: ['small', 'large']
    },
    labelColor: {
      control: 'select',
      options: ['blue', 'green', 'red']
    }
  }
}

const Template = (args) => ({
  components: { Label },
  setup() {
    return { args }
  },
  template: '<Label v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  bgColor: 'primary',
  size: 'medium',
  labelColor: 'white',
  label: 'Label',
  rounded: 'large'
}

export const SmallBlueLabelColor = Template.bind({})
SmallBlueLabelColor.args = {
  bgColor: 'blue',
  size: 'small',
  labelColor: 'blue',
  label: 'Label',
  rounded: 'large'
}

export const MediumRedLabelColor = Template.bind({})
MediumRedLabelColor.args = {
  size: 'medium',
  bgColor: 'red',
  labelColor: 'red',
  label: 'Label',
  rounded: 'large'
}

export const LargeGreenLabelColor = Template.bind({})
LargeGreenLabelColor.args = {
  size: 'large',
  bgColor: 'green',
  labelColor: 'green',
  label: 'Label',
  rounded: 'large'
}

export const AutoRedLabelColor = Template.bind({})
AutoRedLabelColor.args = {
  bgColor: 'red',
  size: 'auto',
  labelColor: 'red',
  label: 'Label',
  rounded: 'small'
}
