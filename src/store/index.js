import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      isLoggedIn: false,
      authUser: {},
    }
  },
  mutations: {
    // payload接入參數
    setLoggedState(state,payload) {
      state.isLoggedIn = payload;
    },
    setAuthUser(state,payload) {
      state.authUser = payload;
    },
  }
})

export default store;