import { action } from '@storybook/addon-actions'
import Dropdown from './Dropdown.vue'
import { provideWorkspace, provideMember, provideNotification } from '~/composables'
import { provideLoginUser } from '@/store/login'

export default {
  title: 'molecules/Dropdown',

  component: Dropdown,

  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom']
    },
    borderColor: {
      control: 'select',
      options: ['none', 'gray']
    },
    hasImage: {
      control: 'boolean'
    }
  }
}

const Template = (args) => ({
  components: { Dropdown },
  setup() {
    provideNotification()
    provideLoginUser()
    provideWorkspace()
    provideMember()

    return { args }
  },
  template:
    '<div style="position: relative; width: 50%;top: 66px;" ><Dropdown v-bind="args" @onClose="handleClose"/></div>',
  methods: {
    handleClose: action('onClose')
  }
})

export const Default = Template.bind({})
Default.args = {
  menuItems: [
    {
      label: 'Delete',
      color: 'red',
      action: 'onClose'
    }
  ],
  menuSelected: true,
  position: 'top',
  hasImage: false,
  borderColor: 'none'
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  menuItems: [
    {
      label: 'Edit',
      icon: 'edit',
      action: 'onClose'
    },
    {
      label: 'Invitation Link',
      icon: 'link',
      action: 'onClose'
    },
    {
      label: 'Delete',
      color: 'red',
      icon: 'delete',
      action: 'onClose'
    }
  ],
  menuSelected: true,
  position: 'bottom',
  hasImage: false,
  borderColor: 'none'
}
