import { action } from '@storybook/addon-actions'
import Dialogue from './Dialogue.vue'

export default {
  title: 'molecules/Dialogue',

  component: Dialogue
}

const Template = (_, { argTypes }) => ({
  components: { Dialogue },
  props: Object.keys(argTypes),
  methods: {
    clickBackButton: action('Clicked back'),
    clickConfirmButton: action('Clicked confirm')
  },
  template:
    '<Dialogue v-bind="$props" @onClose="clickBackButton" @onValidate="clickConfirmButton" />'
})

export const Default = Template.bind({})
Default.args = {}
