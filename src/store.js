import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      dialogStatus: false,
      dialogText: '',
      userInfo: null,
    }
  },
  mutations: {
    setUserInfo(state,value) {
      state.userInfo = value;
    },
    showDialog(state, data){
      state.dialogStatus = true;
      state.dialogText = data || '服务器错误请稍后重试';
    },
    hideDialog(state){
      state.dialogStatus = false;
    },
  },
  actions: {
  }
})
