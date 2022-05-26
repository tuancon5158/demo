import { action } from '@storybook/addon-actions'
import Button from './Button.vue'
export default {
  title: 'atoms/Button',

  component: Button,

  argTypes: {
    borderColor: {
      control: 'select',
      options: ['transparent', 'primary', 'secondary', 'white', 'gray', 'black', 'blue', 'red']
    },
    bgColor: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'white',
        'black',
        'facebook',
        'twitter',
        'blue',
        'red',
        'transparent'
      ]
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large']
    },
    rounded: {
      control: 'boolean'
    }
  }
}

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: '<Button @onClick="clickButton" v-bind="args" />',
  methods: {
    clickButton: action('Cliked')
  }
})

export const PrimarySmall = Template.bind({})
PrimarySmall.args = {
  borderColor: 'primary',
  bgColor: 'primary',
  size: 'small',
  label: 'Primary Color Button'
}

export const PrimaryBorderrRounded = Template.bind({})
PrimaryBorderrRounded.args = {
  borderColor: 'primary',
  bgColor: 'white',
  rounded: true,
  size: 'medium',
  label: 'PrimaryBorderr Rounded Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  borderColor: 'secondary',
  bgColor: 'secondary',
  size: 'medium',
  label: 'Secondary Color Button'
}

export const LargeRoundedWithIcon = Template.bind({})
LargeRoundedWithIcon.args = {
  bgColor: 'black',
  size: 'large',
  label: 'VR空間に入室する',
  rounded: true,
  icon: 'logo-white',
  iconWidth: '22',
  iconHeight: '22'
}

export const WithFacebookIcon = Template.bind({})
WithFacebookIcon.args = {
  bgColor: 'facebook',
  size: 'small',
  label: 'Facebookでログイン',
  icon: 'facebook',
  iconWidth: '12',
  iconHeight: '22'
}

export const WithTwitterIcon = Template.bind({})
WithTwitterIcon.args = {
  bgColor: 'twitter',
  size: 'small',
  label: 'Twitterでログイン',
  icon: 'twitter',
  iconWidth: '22',
  iconHeight: '22'
}

export const WithGoogleIcon = Template.bind({})
WithGoogleIcon.args = {
  bgColor: 'white',
  borderColor: 'gray',
  size: 'small',
  label: 'Googleでログイン',
  icon: 'google',
  iconWidth: '22',
  iconHeight: '22'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'Disabled Button'
}

export const BlueColor = Template.bind({})
BlueColor.args = {
  bgColor: 'blue',
  label: 'BlueColor Button'
}

export const TransparentBackgroundWithBlueBorder = Template.bind({})
TransparentBackgroundWithBlueBorder.args = {
  borderColor: 'blue',
  bgColor: 'transparent',
  label: 'BlueBorder Button'
}

export const DisabledWithBorder = Template.bind({})
DisabledWithBorder.args = {
  disabled: true,
  bgColor: 'transparent',
  borderColor: 'red',
  label: 'Disabled With Border Button'
}

export const SmallWithBlueLabelColor = Template.bind({})
SmallWithBlueLabelColor.args = {
  bgColor: 'transparent',
  labelColor: 'blue',
  label: 'Small With BlueLabelColor',
  size: 'small'
}

export const DisabledButtonText = Template.bind({})
DisabledButtonText.args = {
  bgColor: 'transparent',
  labelColor: 'blue',
  disabled: true,
  label: 'Disabled Button Text',
  size: 'small'
}
