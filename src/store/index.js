import Vue from "vue";
import Vuex from "vuex";
import image from "./modules/image.js";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    image
  },
  state: {
    //state
  },
  getters: {
    //getters
  },
  mutations: {
    // mutation
  },
  actions: {
    // actions
  }
});
export default store;
