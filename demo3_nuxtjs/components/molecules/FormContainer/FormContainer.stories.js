import FormContainer from './FormContainer.vue'

export default {
  title: 'molecules/FormContainer',

  component: FormContainer,

  argTypes: {
    title: {
      control: 'text'
    },
    size: {
      control: 'select',
      options: ['large', 'medium']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { FormContainer },
  props: Object.keys(argTypes),
  template:
    '<div style="margin-top: 20px;"><FormContainer v-bind="$props" ><template #formContents>Contents here</template></FormContainer></div>'
})

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  size: 'large'
}
