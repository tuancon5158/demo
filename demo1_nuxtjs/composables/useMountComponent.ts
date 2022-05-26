import { createApp } from 'vue-demi'

export const mountComponent = (RootComponent: any) => {
  const app = createApp(RootComponent)

  const root = document.createElement('div')

  document.body.appendChild(root)

  const instance = app.mount(root)

  return {
    instance,
    unmount() {
      app.unmount()
      document.body.removeChild(instance.$el)
    },
  }
}
