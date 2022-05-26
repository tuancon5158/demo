import Modal from './Modal.vue'

export default {
  title: 'atoms/Modal',

  component: Modal,

  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large', 'medium']
    },
    bgColor: {
      control: 'select',
      options: ['white', 'gray']
    },
    headerAlign: {
      control: 'select',
      options: ['center', 'left']
    }
  }
}

const Template = (args) => ({
  components: { Modal },
  setup() {
    return { args }
  },
  template:
    '<Modal v-bind="args" > <template #header>Header</template><template #body>Contents</template></Modal>'
})

export const Default = Template.bind({})
Default.args = {
  size: 'default',
  bgColor: 'white',
  headerAlign: 'center'
}
