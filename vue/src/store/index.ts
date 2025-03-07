import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wishList: [],
  },
  mutations: {
    pushWish(state, item) {
      state.wishList = state.wishList.concat(item);
    },
  },
  actions: {},
  modules: {},
});
