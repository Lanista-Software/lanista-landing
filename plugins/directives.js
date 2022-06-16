import Vue from 'vue'

Vue.directive('dialog-open', {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      vnode.context.$refs[binding.value].show = true
      document.body.style.overflowY = 'hidden'
    })
  },
})
Vue.directive('dialog-close', {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      vnode.context.$refs[binding.value].show = false
      document.body.style.overflowY = 'auto'
    })
  },
})
