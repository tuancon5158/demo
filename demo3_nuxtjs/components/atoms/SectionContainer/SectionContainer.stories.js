import SectionContainer from './SectionContainer.vue'

export default {
  title: 'old/SectionContainer',

  component: SectionContainer,

  argTypes: {
    containerSize: {
      control: 'select',
      options: ['lg', 'xlg', 'xxlg', 'full']
    },
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'gray', 'black', 'transparent']
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { SectionContainer },
  props: Object.keys(argTypes),
  template: '<SectionContainer v-bind="$props">slot contents here</SectionContainer>'
})

export const PrimaryColorNormalSizeContainer = Template.bind({})
PrimaryColorNormalSizeContainer.args = {
  containerSize: 'lg',
  bgColor: 'primary'
}

export const SecondaryColorLargeSizeContainer = Template.bind({})
SecondaryColorLargeSizeContainer.args = {
  containerSize: 'xlg',
  bgColor: 'secondary'
}

export const GrayColorXlargeSizeContainer = Template.bind({})
GrayColorXlargeSizeContainer.args = {
  containerSize: 'xxlg',
  bgColor: 'gray'
}
