import dashboard from './dashboard'
import members from './members'
import newGuestNotifications from './newGuestNotifications'
import spaceList from './spaceList'
import spaceEdit from './spaceEdit'
import spaceNew from './spaceNew'
import spaceApplyUpload from './spaceApplyUpload'
import workSpaceNew from './workSpaceNew'
import workSpaceApply from './workSpaceApply'
import workSpaceSettings from './workSpaceSettings'
import avatars from './avatars'
import license from './license'
import accountSettings from './accountSettings'

export default {
  ...dashboard,
  ...members,
  ...newGuestNotifications,
  ...spaceList,
  ...spaceEdit,
  ...spaceNew,
  ...spaceApplyUpload,
  ...workSpaceNew,
  ...workSpaceApply,
  ...workSpaceSettings,
  ...avatars,
  ...license,
  ...accountSettings
}
