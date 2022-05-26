import Heading from './Heading.vue'

export default {
  title: 'atoms/Heading',

  component: Heading,

  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    level: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6']
    },
    fontWeight: {
      control: 'text'
    },
    headings: { control: { separator: ',' } }
  }
}

const Template = (args) => ({
  components: { Heading },
  setup() {
    return { args }
  },
  template: '<Heading v-bind="args" />'
})

export const H1Heading = Template.bind({})
H1Heading.args = {
  level: '1',
  align: 'center',
  fontWeight: '400',
  headings: [{ text: 'Heading text', color: 'black', spBreak: false }]
}

export const H2TwiceColorHeading = Template.bind({})
H2TwiceColorHeading.args = {
  level: '2',
  align: 'center',
  fontWeight: '400',
  headings: [
    { text: 'Set foot on a', color: 'black', spBreak: false },
    { text: ' virtual world', color: 'primary', spBreak: false }
  ]
}

export const H3LeftalignBoldHeading = Template.bind({})
H3LeftalignBoldHeading.args = {
  level: '3',
  align: 'left',
  fontWeight: 'bold',
  headings: [{ text: 'News', color: 'black', spBreak: false }]
}
