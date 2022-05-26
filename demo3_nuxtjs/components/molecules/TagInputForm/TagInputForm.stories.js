import TagInputForm from './TagInputForm.vue'

const tagInputOptions = [
  { label: 'Tag 1', value: 'Tag 1' },
  { label: 'Tag 2', value: 'Tag 2' },
  { label: 'Tag 3', value: 'Tag 3' }
]

const tagInputValues = [{ name: 'Value 1', value: 'Value 1' }]

export default {
  title: 'molecules/TagInputForm',

  component: TagInputForm,

  argTypes: {
    options: {
      control: 'array'
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { TagInputForm },
  props: Object.keys(argTypes),
  template: '<TagInputForm v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  options: tagInputOptions,
  value: tagInputValues
}
