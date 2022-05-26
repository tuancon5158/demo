import { useContext } from '@nuxtjs/composition-api'

export default function useCreateCoverPath() {
  const { $config } = useContext()

  //  handle url gets from API
  const createIframeUrl = (path: string, coverType: number) => {
    if (coverType === 1) {
      return createYoutubeUrl(path)
    } else if (coverType === 2) {
      return createSketchfabUrl(path)
    } else return path
  }

  // get image url when cover type is 0
  const createThumbnailUrl = (imageKey: string) => {
    if (imageKey) {
      return `${$config.frontURL}/${imageKey}`
    } else return require('@/assets/images/spaceCover.png')
  }

  // get youtube url when cover type is 1
  const createYoutubeUrl = (path: string) => {
    let videoId = ''
    const formattedUrl = path
      .replace(/\s/g, '')
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

    if (formattedUrl[2] !== undefined) {
      videoId = formattedUrl[2].split(/[^0-9a-z_\-]/i)[0]
    } else {
      videoId = path
    }

    return `https://www.youtube.com/embed/${videoId}`
  }

  // get sketchfab url when cover type is 2
  const createSketchfabUrl = (path: string) => {
    let sketchfabId = ''

    sketchfabId = path.replace(/\s/g, '').split('/').slice(-1)[0].split('-').slice(-1)[0]

    if (sketchfabId !== undefined) {
      return `https://sketchfab.com/models/${sketchfabId}/embed?autospin=0&autostart=1&camera=0&ui_infos=0&ui_controls=0&ui_stop=0`
    }

    return path
  }

  return {
    createIframeUrl,
    createThumbnailUrl,
    createYoutubeUrl
  }
}
