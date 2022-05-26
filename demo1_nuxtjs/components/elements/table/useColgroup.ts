import { inject } from '@nuxtjs/composition-api'

export interface Colgroup {
  width: number
  align: string
}

interface ColStyle {
  [index: string]: any
}

export default function () {
  const colgroup = inject<Colgroup[]>('colgroup', [])

  const genStyleCol = (col: Colgroup) => {
    const styles = {} as ColStyle

    if (col.width) {
      const width = `${col.width}px`

      styles.width = width
      styles['min-width'] = width
      styles['max-width'] = width
    }

    if (col.align) styles['text-align'] = col.align

    return styles
  }

  return { colgroup, genStyleCol }
}
