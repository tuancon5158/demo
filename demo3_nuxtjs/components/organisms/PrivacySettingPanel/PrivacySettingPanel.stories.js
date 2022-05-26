import { action } from '@storybook/addon-actions'
import PrivacySettingPanel from './PrivacySettingPanel.vue'

export default {
  title: 'organisms/PrivacySettingPanel',

  component: PrivacySettingPanel,

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { PrivacySettingPanel },
  props: Object.keys(argTypes),

  data() {
    return {
      selected: 1
    }
  },
  methods: {
    updateData(value) {
      this.selected = Number(value)
    },

    onSave: action('save')
  },
  template:
    '<PrivacySettingPanel @onSave="onSave" :modelValue="selected" @onInputFieldSetChange="updateData($event)" v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  listData: [
    {
      id: 1,
      value: '1',
      label: 'Public',
      subLabel: 'Available to all users'
    },
    {
      id: 2,
      value: '2',
      label: 'Limited',
      subLabel: 'Only users know the link can view'
    },
    {
      id: 3,
      value: '3',
      label: 'Private',
      subLabel: 'Only users in your workspace can view'
    }
  ]
}
