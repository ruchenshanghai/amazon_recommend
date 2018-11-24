import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    currentUser: (state) => state.user,
  },
  mutations: {
    changeUser(state, user) {
      state.user = user;
    },
  },
  actions: {

  },
});
