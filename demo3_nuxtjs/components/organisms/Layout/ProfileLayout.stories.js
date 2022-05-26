import ProfileLayout from './ProfileLayout.vue'
import UserProfile from '~/components/organisms/UserProfile/UserProfile.vue'
export default {
  title: 'organisms/ProfileLayout',

  component: { ProfileLayout, UserProfile },

  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },

  argTypes: {}
}
/// create mock data api -> go page -> network to get modals
const userDetail = {
  name: 'name',
  companyName: 'companyName',
  companyUrl: 'companyUrl',
  facebookUrl: 'facebookUrl',
  twitterUrl: 'twitterUrl',
  instagramUrl: 'instagramUrl',
  desciption:
    'introduction introduction introduction introduction introduction introduction introduction introduction introduction'
}
const Template = (args) => ({
  components: { ProfileLayout, UserProfile },
  /// data pass to setup, bind to template
  setup() {
    return { userDetail, args }
  },
  template: `<ProfileLayout v-bind="args"
  :user-name="userDetail.name"
  :company-name="userDetail.companyName"
  :company-url="userDetail.companyUrl"
  :instagram-url="userDetail.instagramUrl"
  :facebook-url="userDetail.facebookUrl"
  :twitter-url="userDetail.twitterUrl"
  :description="userDetail.desciption"
  imagePath = "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"/>`
})

export const Default = Template.bind({})
Default.args = {}
