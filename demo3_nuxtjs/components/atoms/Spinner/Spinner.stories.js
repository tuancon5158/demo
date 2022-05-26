import Spinner from './Spinner.vue'

export default {
  title: 'atoms/Spinner',

  component: Spinner,

  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'black', 'white']
    },
    bgColor: {
      control: 'select',
      options: ['gray', 'white', 'transparent']
    }
  }
}

const Template = (args) => ({
  components: { Spinner },
  setup() {
    return { args }
  },
  template: '<Spinner v-bind="args" />'
})

export const PrimaryMediumSizeGrayBackground = Template.bind({})
PrimaryMediumSizeGrayBackground.args = {
  size: 'medium',
  color: 'primary',
  bgColor: 'gray'
}

export const SecondarySmallSizeWhiteBackground = Template.bind({})
SecondarySmallSizeWhiteBackground.args = {
  size: 'small',
  color: 'secondary',
  bgColor: 'white'
}

export const BlackLargeSizeTransparentBackground = Template.bind({})
BlackLargeSizeTransparentBackground.args = {
  size: 'large',
  color: 'black',
  bgColor: 'transparent'
}
