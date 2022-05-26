export interface CheckboxEvent {
  preventDefault: () => void
  stopPropagation: () => void
  target: {
    checked: boolean
    defaultChecked: boolean
    disabled: boolean
    name: string
    prefixCls: string
    type: 'checkbox'
    value: number
  }
}
export interface SelectOption {
  value?: number | string
  label: string
  detail?: string
}
