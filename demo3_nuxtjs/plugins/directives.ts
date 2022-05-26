import Vue from 'vue'
let handleOutsideClick

Vue.directive('closable', {
  bind(el, binding, vnode) {
    handleOutsideClick = (e) => {
      const { handler, exclude } = binding.value

      let clickedOnExcludedEl = false

      exclude.forEach((refName) => {
        if (!clickedOnExcludedEl) {
          const contextRef = vnode?.context?.$refs[refName]

          if (contextRef) {
            // eslint-disable-next-line dot-notation
            const excludedEl = contextRef['$el']

            if (excludedEl) {
              clickedOnExcludedEl = excludedEl.contains(e.target)
            } else {
              clickedOnExcludedEl = false
            }
          }
        }
      })

      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        const context = vnode.context

        if (context) {
          context[handler](e)
        }
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick, { passive: true })
  },
  unbind() {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})
