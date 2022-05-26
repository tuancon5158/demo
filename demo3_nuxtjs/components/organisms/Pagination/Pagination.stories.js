import Pagination from './Pagination.vue'

export default {
  title: 'organisms/Pagination',

  component: Pagination,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    colorArrow: {
      control: 'select',
      options: ['black', 'white']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { Pagination },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><Pagination v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  colorArrow: 'white',
  totalItems: 20
}

export const Pagination_1 = Template.bind({})
Pagination_1.args = {
  colorArrow: 'white',
  totalItems: 50
}

export const Pagination_2 = Template.bind({})
Pagination_2.args = {
  colorArrow: 'black',
  totalItems: 100
}
