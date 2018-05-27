// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import BackspaceDisabler from 'backspace-disabler'
/* eslint-disable no-new */
export const EventBus = new Vue({})

BackspaceDisabler.disable()

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  mounted:
    [
      function() {
        window.addEventListener('keyup', (event) => {
          EventBus.$emit('calcKeyUp', event);
        })
      },
      function() {
        window.addEventListener('keypress', (event) => {
          EventBus.$emit('calcKeyDown', event);
          console.log(event)
        })
      },
    ]
})
