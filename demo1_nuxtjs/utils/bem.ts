/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

export type Modifier = string | { [key: string]: any }
export type Modifiers = Modifier | Modifier[]

function gen(name: string, modifiers?: Modifiers): string {
  if (!modifiers) {
    return ''
  }

  if (typeof modifiers === 'string') {
    return ` ${name}--${modifiers}`
  }

  if (Array.isArray(modifiers)) {
    return modifiers.reduce<string>((ret, item) => ret + gen(name, item), '')
  }

  return Object.keys(modifiers).reduce(
    (ret, key) => ret + (modifiers[key] ? gen(name, key) : ''),
    ''
  )
}

export function createBEM(name: string) {
  return function (element?: Modifiers, modifiers?: Modifiers): Modifiers {
    if (element && typeof element !== 'string') {
      modifiers = element
      element = ''
    }

    element = element ? `${name}__${element}` : name

    return `${element}${gen(element, modifiers)}`
  }
}

export type BEM = ReturnType<typeof createBEM>
