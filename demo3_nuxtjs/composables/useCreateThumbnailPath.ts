import { ref, computed, useContext } from '@nuxtjs/composition-api'

export default function useCreateThumbnailPath() {
  const { $auth, $config } = useContext()
  const userThumbnailPath = ref('')

  const getAvatarThumbnailUrl = (imageKey: string | null, resize: number | null) => {
    if (imageKey && resize) {
      return `${$config.frontURL}/${imageKey}?w=${resize}`
    } else if (imageKey) {
      return `${$config.frontURL}/${imageKey}`
    } else {
      return require('~/assets/images/common/default-avator.png')
    }
  }

  const getSpaceThumbnailUrl = (imageKey: string | null, resize: number | null) => {
    if (imageKey && resize) {
      return `${$config.frontURL}/${imageKey}?w=${resize}`
    } else if (imageKey) {
      return `${$config.frontURL}/${imageKey}`
    } else {
      return require('~/assets/images/space.png')
    }
  }

  const getUserThumbnailUrl = (resize: number | null) => {
    if ($auth.user.thumbnailUrl !== null) {
      return `${$config.frontURL}/${$auth.user.thumbnailUrl}?w=${resize}`
    } else {
      return require('~/assets/images/common/default-avator.png')
    }
  }

  return {
    getAvatarThumbnailUrl,
    getSpaceThumbnailUrl,
    getUserThumbnailUrl,
    userThumbnailPath
  }
}
