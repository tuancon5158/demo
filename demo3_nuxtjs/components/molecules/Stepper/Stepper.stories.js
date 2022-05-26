import Stepper from './Stepper.vue'
const stepperOptions = {
  headers: [
    {
      title_pc: 'お問い合わせ情報の入力',
      title_sp: '入力'
    },
    {
      title_pc: 'お問い合わせ内容の確認',
      title_sp: '確認'
    },
    {
      title_pc: 'お問い合わせ完了',
      title_sp: '完了'
    }
  ],
  prevText: 'Previous',
  nextText: 'Next'
}

export default {
  title: 'molecules/Stepper',

  component: Stepper,

  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'center', 'right']
    }
  }
}

const Template = (_, { argTypes }) => ({
  components: { Stepper },
  props: Object.keys(argTypes),
  template: '<Stepper v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  options: stepperOptions,
  position: 'left',
  currentNumber: 1
}
