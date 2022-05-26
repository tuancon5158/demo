import CTAButton from './CTAButton.vue'

export default {
  title: 'atoms/Button/CTAButton',

  component: CTAButton,

  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'outline']
    },
    size: {
      control: 'select',
      options: ['small', 'medium']
    },
    icon: {
      control: 'boolean'
    },
    iconColor: {
      control: 'select',
      options: ['black', 'white']
    }
  }
}

const Template = (args) => ({
  components: { CTAButton },
  setup() {
    return { args }
  },
  template: '<div style="background: #ccc; padding: 4rem"><CTAButton v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'この空間に入る',
  icon: true,
  type: 'default',
  size: 'medium'
}

export const OutlineWithIcon = Template.bind({})
OutlineWithIcon.args = {
  type: 'outline',
  iconColor: 'white',
  label: 'クリエイターページへ行く',
  icon: true,
  size: 'medium',
  externalLink: true
}

export const SmallWithoutIcon = Template.bind({})
SmallWithoutIcon.args = {
  label: 'この空間に入る',
  size: 'small'
}
