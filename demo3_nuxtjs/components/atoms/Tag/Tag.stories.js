import { action } from '@storybook/addon-actions'
import Tag from './Tag.vue'
export default {
  title: 'atoms/Tag',

  component: Tag,

  argTypes: {
    label: {
      control: 'text'
    },
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary', 'default', 'danger', 'blue', 'light-blue', 'gray']
    },
    labelColor: {
      control: 'select',
      options: ['blue', 'gray', 'white']
    },
    rounded: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    size: {
      control: 'select',
      options: ['small', 'medium']
    },
    iconType: {
      control: 'select',
      options: ['none', 'default', 'close-circle', 'close']
    }
  }
}

const Template = (args) => ({
  components: { Tag },
  setup() {
    return { args }
  },
  template: '<Tag @onClick="deleteTag" v-bind="args" />',
  methods: {
    deleteTag: action('delete tag')
  }
})

export const Default = Template.bind({})
Default.args = {
  label: 'Tag',
  bgColor: 'primary'
}

export const BlueLabelBackgroundWithIcon = Template.bind({})
BlueLabelBackgroundWithIcon.args = {
  label: 'Tag',
  bgColor: 'blue',
  rounded: 'large',
  iconType: 'close-circle',
  labelColor: 'blue'
}

export const LightBlueBackground = Template.bind({})
LightBlueBackground.args = {
  label: 'Tag',
  bgColor: 'light-blue',
  rounded: 'large',
  labelColor: 'gray'
}
