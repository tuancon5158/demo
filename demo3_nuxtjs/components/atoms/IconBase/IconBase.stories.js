import IconBase from './IconBase.vue'
import IconLogo from '~/components/icons/IconLogo.vue'
export default {
  title: 'atoms/IconBase',

  component: IconBase,
  argTypes: {
    iconName: {
      control: 'text'
    },
    iconColor: {
      control: 'text'
    },
    width: {
      control: 'text'
    },
    height: {
      control: 'text'
    },
    viewBox: {
      control: 'text'
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { IconBase, IconLogo },
  props: Object.keys(argTypes),
  template: '<IconBase v-bind="$props"><IconLogo/></IconBase>'
})

export const SmallWithBlackColor = Template.bind({})
SmallWithBlackColor.args = {
  iconColor: '#222',
  width: '50',
  height: '50',
  viewBox: '0, 0, 50, 50',
  iconName: 'comony'
}

export const MediumWithRedColor = Template.bind({})
MediumWithRedColor.args = {
  iconName: 'comony 2',
  iconColor: 'red',
  width: '100',
  height: '50',
  viewBox: '0, 0, 50, 50'
}
