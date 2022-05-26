import IconText from './IconText.vue'
import IconArrowLeft from '~/components/icons/IconArrowLeft.vue'
import IconArrowRight from '~/components/icons/IconArrowRight.vue'

export default {
  title: 'molecules/IconText',

  component: { IconText, IconArrowLeft, IconArrowRight },

  argTypes: {
    iconSide: {
      control: 'select',
      options: ['left', 'right']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'notice', 'darkblue', 'black', 'white']
    },
    space: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    fontSize: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge']
    },
    isLink: {
      control: 'select',
      options: [true, false]
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { IconText, IconArrowLeft, IconArrowRight },
  props: Object.keys(argTypes),
  template: `<div style="margin: 20px;"><IconText v-bind="$props">
  <template #icon>
  <IconArrowRight />
  </template>
  </IconText></div>`
})

export const Default = Template.bind({})
Default.args = {
  msg: 'default',
  color: 'primary',
  fontSize: 'medium',
  bgColor: 'white',
  space: 'small'
}

export const LargeWithRightIcon = Template.bind({})
LargeWithRightIcon.args = {
  msg: 'large',
  color: 'blue',
  fontSize: 'large',
  bgColor: 'white',
  space: 'small',
  iconSide: 'right'
}
