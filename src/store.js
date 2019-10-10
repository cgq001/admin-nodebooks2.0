import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      token:'',
      isLogin:false,
      user:{

      }
  },
  mutations: {
      addToken(state,str){
        state.token=str
        state.isLogin=true
      },
      removeToken(state,str){
        state.token=null
        state.isLogin=false
      },
      setUser(state,str){
        state.user=str
      },
      setEmails(state,str){
        let user=state.user
            user.email=str
            state.user=user
      },
      setNames(state,str){
        let user=state.user
            user.name=str
            state.user=user
      },
      setImgs(state,str){
        let user=state.user
            user.imgs=str
            state.user=user
      }
  },
  actions: {

  }
})
