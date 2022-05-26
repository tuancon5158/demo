import Vue from 'vue'
import { DirectiveOptions } from 'vue/types/options'
import { formatCurrency } from '@vt7/utils'

const DirectiveCurrency: DirectiveOptions = {
  bind(el, binding) {
    el.innerText = formatCurrency(binding.value)
  },
  update(el, binding) {
    el.innerText = formatCurrency(binding.value)
  },
}

Vue.directive('currency', DirectiveCurrency)
