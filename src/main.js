// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.directive('theme',{
  bind(el,binding,vnode){
    const theme=binding.value
    el.style.transitionDuration="0.5s";
    if(theme=="dark"){
      el.style.background='black';
      el.style.color='white';
    }else if(theme=="light"){
      el.style.background='yellowgreen';
      el.style.color='green';
    }
  },
  update(el,binding,vnode){
    const theme=binding.value
    el.style.transitionDuration="0.5s";
    if(theme=="dark"){
      el.style.background='black';
      el.style.color='white';
    }else if(theme=="light"){
      el.style.background='yellowgreen';
      el.style.color='green';
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
