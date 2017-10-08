import Vue from 'vue'

const state = {
  orderList: [],
  params: {
    startDate: ['2017-05-01'],
    endDate: ['2017-06-01'],
    productId: 0,
    query: ''
  }
}

const getters = {
  getOrderList: function (state) {
    return state.orderList
  }
}

const actions = {
  fetchOrderList ({commit, state}) {
    Vue.http.post('/api/getOrderList', state.params)
      .then((res) => {
        commit('updateOrderList', res.data.list)
      }, (err) => {
        console.log(err)
      })
  }
}

const mutations = {
  updateOrderList (state, payload) {
    state.orderList = payload
  },
  updateParams (state, {key, val}) {
    state.params[key] = val
    console.log(state.params)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
