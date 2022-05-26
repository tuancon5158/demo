import TableDataList from './TableDataList.vue'

const tableTitle = [
  {
    label: 'Title 1',
    required: false
  },
  {
    label: 'Title 2',
    required: true
  }
]

export default {
  title: 'molecules/TableDataList',

  component: TableDataList,

  argTypes: {
    title: {
      control: 'array'
    }
  }
}

const Template = (args) => ({
  components: { TableDataList },
  setup() {
    return { args }
  },
  template:
    '<TableDataList v-bind="args" ><template #data_1>Data1</template><template #data_2>Data2</template></TableDataList>'
})

export const Default = Template.bind({})
Default.args = {
  title: tableTitle
}
