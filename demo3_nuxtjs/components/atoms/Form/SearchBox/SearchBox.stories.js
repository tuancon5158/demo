import SearchBox from './SearchBox.vue'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'atoms/Form/SearchBox',

  component: SearchBox,

  argTypes: {
    modelValue: {
      control: 'text'
    }
  }
}

const Template = (args) => ({
  components: { SearchBox },
  setup() {
    const inputValue = ref('')

    const onInputChange = (value) => {
      inputValue.value = value
    }

    return { args, onInputChange }
  },
  template: '<SearchBox :modelValue="inputValue" @update:modelValue="onInputChange" v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  placeholder: '検索'
}
