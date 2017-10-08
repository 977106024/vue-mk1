import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-resource'

import IndexPage from '../pages/index'
import DetailPage from '../pages/detail'
import orderListPage from '../pages/orderList'
import AnalysisPage from '../pages/detail/analysis'
import CountPage from '../pages/detail/count'
import ForecastPage from '../pages/detail/forecast'
import PublishPage from '../pages/detail/publish'
import TeaPage from '../pages/detail/tea'

Vue.use(Router)
Vue.use(VueRouter)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderList',
      component: orderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis', // 默认页面
      children: [
        {
          path: 'analysis',
          component: AnalysisPage
        },
        {
          path: 'count',
          component: CountPage
        },
        {
          path: 'forecast',
          component: ForecastPage
        },
        {
          path: 'publish',
          component: PublishPage
        },
        {
          path: 'tea',
          component: TeaPage
        }
      ]
    }
  ]
})
