// composables/utilities/scroll.ts

import { ref } from '@nuxtjs/composition-api'

export function handleScroll() {
  const checkWindowSize = () => {
    const windowW = window.innerWidth
    const breakpoint = 768

    if (windowW > breakpoint) return true

    return false
  }

  const slideTwoItem = (isVisible: boolean, entry, time = 220, classes = 'is-active') => {
    if (isVisible) {
      const elm = entry.target || document
      const odd = elm.querySelector('.slide-in-item-odd')
      const even = elm.querySelector('.slide-in-item-even')

      if (odd) {
        const delay = checkWindowSize() ? time : 0

        setTimeout(() => {
          odd.classList.add(classes)
        }, delay)
      }

      if (even) {
        const delay = checkWindowSize() ? Number(time) * 2 : 0

        setTimeout(() => {
          even.classList.add(classes)
        }, delay)
      }
    }
  }

  const slideThreeItem = (isVisible: boolean, entry, _, classes = 'is-active') => {
    if (isVisible) {
      const elm = entry.target || document
      const item = elm.querySelector('.slide-in-item')

      if (item) {
        item.classList.add(classes)
      }
    }
  }

  const slideItems = (isVisible: boolean, entry, time = 220, classes = 'is-active') => {
    if (isVisible) {
      const elm = entry.target
      const items = elm.querySelectorAll('.slide-in-item')

      items.forEach((item, index) => {
        const order = index + 1
        const delay = order * time

        setTimeout(() => {
          item.classList.add(classes)
        }, delay)
      })
    }
  }

  const maskTxtAnimation = (isVisible, entry, delay = 0) => {
    if (isVisible) {
      setTimeout(() => {
        entry.target.classList.add('show-mask')
      }, delay)
    }
  }

  const handleScaleImage = (isVisible: boolean, id: string) => {
    if (isVisible) {
      const image = document.querySelector(`#${id}`)

      image?.classList.add('imageBox_wrapper_animated')
    }
  }

  // --------- Image Box animation ----------
  const visibleRotateImageBox = ref<boolean>(false)
  const visibilityChangedImageBoxTop = (isVisible: boolean, entry) => {
    visibilityChangedArrows(isVisible, entry)

    if (isVisible) visibleRotateImageBox.value = true
  }

  // --------- Creator animation ----------
  const visibleRotateCreatorBanner = ref<boolean>(false)
  const visibilityChangedCreatorBanner = (isVisible: boolean, entry) => {
    visibilityChangedArrows(isVisible, entry)

    if (isVisible) visibleRotateCreatorBanner.value = true
  }

  // --------- CircleLively animation ----------
  const visibleChangedCircle = ref<boolean>(false)
  const visibilityChangedCircle = (isVisible: boolean) => {
    if (isVisible) visibleChangedCircle.value = true
  }

  // --------- Direction animation ----------
  const visibilityChangedArrows = (isVisible: boolean, entry) => {
    if (isVisible) {
      const elm = entry.target || document

      const items = elm.querySelector('.animatedDirection')

      if (!items) {
        return
      }

      if (elm.querySelector('.-right') && !elm.querySelector('.-right--animated')) {
        items?.classList.add('-right--animated')
      } else if (elm.querySelector('.-left') && !elm.querySelector('.-left--animated')) {
        items?.classList.add('-left--animated')
      } else if (
        elm.querySelector('.-bottomToTop') &&
        !elm.querySelector('.-bottomToTop--animated')
      ) {
        items?.classList.add('-bottomToTop--animated')
      }
    }
  }

  // --------- Video animation ----------
  const visibleVideo = ref<boolean>(false)
  const visibilityChangedVideo = (isVisible: boolean) => {
    if (isVisible) visibleVideo.value = true
  }

  // --------- ImageBox content animation ----------
  const visibleImageBoxContent = ref(false)
  const visibleText = ref(false)
  const visibilityChangedImageBoxContent = (isVisible: boolean, entry) => {
    if (isVisible) {
      visibleImageBoxContent.value = true
      visibleText.value = true
      const elm = entry.target || document
      const items = elm.querySelector('.slideItems')

      items.classList.add('--animated')
    }
  }

  return {
    checkWindowSize,
    slideItems,
    maskTxtAnimation,
    handleScaleImage,
    visibilityChangedImageBoxTop,
    visibilityChangedCreatorBanner,
    visibilityChangedCircle,
    visibilityChangedArrows,
    visibilityChangedVideo,
    visibilityChangedImageBoxContent,
    slideTwoItem,
    slideThreeItem,
    visibleRotateImageBox,
    visibleRotateCreatorBanner,
    visibleChangedCircle,
    visibleVideo,
    visibleImageBoxContent,
    visibleText
  }
}
