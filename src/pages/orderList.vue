<template>
  <div class="order-wrap">
    <div class="order-list-option">
      选择产品：
      <v-selection :selections="products" @on-change="onParamChange"></v-selection>
    </div>

    <div class="order-list-option">
      开始日期：
      <my-datepicker v-model="startDate" @on-change="getStartDate"></my-datepicker>
    </div>

    <div class="order-list-option">
      结束日期：
      <my-datepicker v-model="endDate" @on-change="getEndDate"></my-datepicker>
    </div>

    <div class="order-list-option">
      关键词：
      <input type="text" class="keywords" v-model.lazy="query">
    </div>

    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import VSelection from '../components/base/selection'
  import MyDatepicker from '../components/base/Datepicker'
  import _ from 'lodash'
  export default {
    components: {
      VSelection,
      MyDatepicker
    },
    data () {
      return {
        startDate: ['2017-05-01'],
        endDate: ['2017-06-01'],
        productId: 0,
        query: '茶叶',
        products: [
          {
            label: '数据统计',
            value: 0
          },
          {
            label: '数据预测',
            value: 1
          },
          {
            label: '流量分析',
            value: 2
          },
          {
            label: '广告发布',
            value: 3
          }
        ],
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          },
          {
            label: '购买产品',
            key: 'product'
          },
          {
            label: '版本类型',
            key: 'version'
          },
          {
            label: '有效时间',
            key: 'period'
          },
          {
            label: '购买日期',
            key: 'date'
          },
          {
            label: '数量',
            key: 'buyNum'
          },
          {
            label: '总价',
            key: 'amount'
          }
        ],
//        tableData: [],
        currentOrder: 'asc'
      }
    },
    computed: {
      tableData () {
        return this.$store.getters.getOrderList
      }
    },
    watch: {
      query (event) {
        console.log(event)
        this.$store.commit('updateParams', {
          key: 'query',
          val: event
        })
        this.$store.dispatch('fetchOrderList')
      }
    },
    methods: {
      onParamChange (obj) {
        console.log(obj.value)
        this.$store.commit('updateParams', {
          key: 'productId',
          val: obj.value
        })
        this.$store.dispatch('fetchOrderList')
//        this.productId = obj.value
//        this.getTableDate()
      },
      getStartDate (date) {
        this.$store.commit('updateParams', {
          key: 'startDate',
          val: date
        })
        this.$store.dispatch('fetchOrderList')
//        this.startDate = date
//        this.getTableDate()
      },
      getEndDate (date) {
        this.$store.commit('updateParams', {
          key: 'endDate',
          val: date
        })
        this.$store.dispatch('fetchOrderList')
//        this.endDate = date
//        this.getTableDate()
      },
//      getTableDate () {
//        let reqParam = {
//          startDate: this.startDate,
//          endDate: this.endDate,
//          productId: this.productId,
//          query: this.query
//        }
//        this.$http.post('/api/getOrderList', reqParam)
//          .then((res) => {
//            this.tableData = res.data.list
//          }, (err) => {
//            console.log(err)
//          })
//      },
      changeOrderType (headItem) {
        this.tableHeads.map((item) => {
          item.active = false
          return item
        })
        headItem.active = true
        if (this.currentOrder === 'asc') {
          this.currentOrder = 'desc'
        } else if (this.currentOrder === 'desc') {
          this.currentOrder = 'asc'
        }
        this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
      }
    },
    mounted () {
//      this.getTableDate()
      this.$store.dispatch('fetchOrderList')
    }
  }
</script>

<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }
  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }
  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }
  .order-list-option:first-child {
    padding-left: 0;
  }
  .order-list-table {
    margin-top: 20px;
  }
  .order-list-table table {
    width: 100%;
    background: #fff;
  }
  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }
  .order-list-table th.active {
    background: #35495e;
  }
  .keywords{
    color: #999;
  }
</style>
