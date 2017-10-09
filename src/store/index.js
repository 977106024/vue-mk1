
import Vuex from 'vuex'
import Vue from 'vue'
import orderList from './modules/orderList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orderList
  },
  state: {
    user: {
      id: '',
      username: ''
    }
  },
  mutations: {
    initState (state, payload) {
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          Vue.set(state.resume, item.field, [])
        } else {
          Vue.set(state.resume, item.field, {})
          item.keys.map((key) => {
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      Object.assign(state, payload)  // 拷贝到目标对象state上，相同的属性会覆盖？
    },
    setUser (state, payload) {
      Object.assign(state.user, payload)
    },
    removeUser (state) {
      state.user.id = ''
    }
  }
})
