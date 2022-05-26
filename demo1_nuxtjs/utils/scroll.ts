interface ScrollEvent extends Event {
  direction: 'down' | 'up'
  last: boolean
}

export const handleScrollElement = (
  target: HTMLElement,
  callback: (event: ScrollEvent) => void
) => {
  let lastScrollTop = 0

  target.addEventListener('scroll', (e: any) => {
    const { scrollTop, offsetHeight, scrollHeight } = target

    if (scrollTop > lastScrollTop) {
      e.direction = 'down'
    } else {
      e.direction = 'up'
    }

    if (scrollTop + offsetHeight === scrollHeight) {
      e.last = true
    } else {
      e.last = false
    }

    lastScrollTop = scrollTop

    callback(e)
  })
}
