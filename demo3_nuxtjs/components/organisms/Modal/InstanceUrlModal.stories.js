import InstanceUrlModal from './InstanceUrlModal.vue'

export default {
  title: 'organisms/Modal/InstanceUrlModal',

  component: InstanceUrlModal,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { InstanceUrlModal },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><InstanceUrlModal v-bind="$props"  /></div>'
})

export const Default = Template.bind({})
Default.args = {
  dataSource: {
    createdAt: '2021-10-01T10:45:32.439Z',
    expiredAt: '2021-10-08T01:45:32.430Z',
    id: 'qz8Q8h',
    spaceId: 'L7DGRgPM',
    updatedAt: '2021-10-01T10:45:32.439Z',
    uuid: 'ba14ac87-c612-44e0-83de-20bd52e2a919'
  }
}
