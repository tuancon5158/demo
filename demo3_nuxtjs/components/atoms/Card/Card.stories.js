import Card from './Card.vue'

export default {
  title: 'atoms/Card',

  component: Card,

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {
    cardType: {
      control: 'select',
      options: ['default', 'horizon']
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { Card },
  props: Object.keys(argTypes),
  template:
    "<Card v-bind='$props'><template #title>Lorem Ipsum</template><template #subtitle>What is Lorem Ipsum?</template><template #body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</template></Card>"
})

export const Default = Template.bind({})
Default.args = {
  cardType: 'default'
}
