import LoadMore from './LoadMore.vue'
import Dropdown from '~/components/molecules/Dropdown/Dropdown.vue'
import { provideWorkspace } from '~/composables'

export default {
  title: 'molecules/LoadMore',

  component: LoadMore,

  argTypes: {}
}

const Template = (args) => ({
  components: { LoadMore, Dropdown },
  setup() {
    provideWorkspace()

    return { args }
  },
  template:
    '<div style=" position: relative; width: fit-content"><LoadMore  @onClick="handleClick" v-bind="args"/><Dropdown position="bottom" :menu-items="menuItems" :menu-selected="menuSelected" @onClose="handleClose"/></div>',
  data() {
    return {
      menuSelected: false,
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
      ]
    }
  },
  methods: {
    handleClick() {
      this.menuSelected = !this.menuSelected
    },
    handleClose() {
      this.menuSelected = false
    }
  }
})

export const Default = Template.bind({})
Default.args = {}
