<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>香菇木耳</h2>
      <p>香菇素有"山珍之王"之称，是高蛋白、低脂肪的营养保健食品。是延长寿命的珍宝。木耳，又名黑木耳、木菌、光木耳。另有形状相似的白木耳。</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
        </div>
        <div class="sales-board-line-right">
          <v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品类型：
        </div>
        <div class="sales-board-line-right">
          <v-selection :selections="buyTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
        </div>
        <div class="sales-board-line-right">
          <v-chooser
            :selections="periodList"
            @on-change="onParamChange('period', $event)"></v-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          运输类型：
        </div>
        <div class="sales-board-line-right">
          <v-mul-chooser
            :selections="versionList"
            @on-change="onParamChange('versions', $event)"></v-mul-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
        </div>
        <div class="sales-board-line-right">
          {{ price }} 元
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
        <div class="sales-board-line-right">
          <div class="button" @click="showPayDialog">
            立即购买
          </div>
        </div>
      </div>
    </div>
    <div class="sales-board-des clear">
      <h2>产品介绍</h2>
      <p>两类素食都是很高营养的食品，无论蒸煮还是煲汤都是很丰富的食材，加上都是低脂肪的保健食品更值得大家混搭一起吃，没有相克之说！木耳胶质可把残留在人体消化系统内的灰尘、杂质及放射性物质吸附，集中起来排出体外，从而起到清胃、涤肠、的作用。香菇则有气虚头晕、贫血、白血球减少，自身抵抗力下降以及年老体弱者宜食；高脂血症，高血压病，动脉硬化症 ，糖尿病，肥胖者宜食；癌症病人及癌症患者放疗、化疗后宜食；急慢性肝炎，脂肪肝，胆结石，便秘者 宜食；所以说两者是可以放在一起烹煮的，味道极佳！</p>

      <h3>产品图片</h3>
      <div v-for="item in XG">
        <img :src="item.src" alt="" class="huangxian">
      </div>
    </div>
    <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
      <table class="buy-dialog-table">
        <tr>
          <th>购买数量</th>
          <th>产品类型</th>
          <th>有效时间</th>
          <th>产品版本</th>
          <th>总价</th>
        </tr>
        <tr>
          <td>{{ buyNum }}</td>
          <td>{{ buyType.label }}</td>
          <td>{{ period.label }}</td>
          <td>
            <span v-for="item in versions">{{ item.label }}</span>
          </td>
          <td>{{ price }}</td>
        </tr>
      </table>
      <h3 class="buy-dialog-title">请选择银行</h3>
      <bank-chooser @on-change="onChangeBanks"></bank-chooser>
      <div class="button buy-dialog-btn" @click="confirmBuy">
        确认购买
      </div>
    </my-dialog>
    <check-order :is-show-check-order="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
  import VSelection from '../../components/base/selection'
  import VCounter from '../../components/base/counter'
  import VChooser from '../../components/base/chooser'
  import VMulChooser from '../../components/base/multiSelect'
  import Dialog from '../../components/base/dialog'
  import BankChooser from '../../components/bankChooser'
  import CheckOrder from '../../components/checkOrder'
  import _ from 'lodash'
  export default {
    components: {
      VSelection,
      VCounter,
      VChooser,
      VMulChooser,
      MyDialog: Dialog,
      BankChooser,
      CheckOrder
    },
    props: {
      XG: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        buyNum: 0,
        buyType: {},
        versions: [],
        period: {},
        price: 0,
        versionList: [
          {
            label: '自提',
            value: 0
          },
          {
            label: '中通',
            value: 1
          },
          {
            label: '顺丰',
            value: 2
          }
        ],
        periodList: [
          {
            label: '半月',
            value: 0
          },
          {
            label: '一月',
            value: 1
          },
          {
            label: '三月',
            value: 2
          }
        ],
        buyTypes: [
          {
            label: '香菇',
            value: 0
          },
          {
            label: '木耳',
            value: 1
          },
          {
            label: '香肠',
            value: 2
          }
        ],
        isShowPayDialog: false,
        bankId: null,
        orderId: null,
        isShowCheckOrder: false,
        isShowErrDialog: false
      }
    },
    methods: {
      onParamChange (attr, val) {
        this[attr] = val
        this.getPrice()
      },
      getPrice () {
        let buyVersionsArray = _.map(this.versions, (item) => {
          return item.value
        })
        let reqParams = {
          buyNumber: this.buyNum,
          buyType: this.buyType.value,
          period: this.period.value,
          version: buyVersionsArray.join(',')
        }
        this.$http.post('/api/getPrice', reqParams)
          .then((res) => {
            this.price = res.data.amount
          })
      },
      showPayDialog () {
        this.isShowPayDialog = true
      },
      hidePayDialog () {
        this.isShowPayDialog = false
      },
      hideCheckOrder () {
        this.isShowCheckOrder = false
      },
      onChangeBanks (bankObj) {
        this.bankId = bankObj.id
        console.log(this.bankId)
      },
      confirmBuy () {
        let buyVersionsArray = _.map(this.versions, (item) => {
          return item.value
        })
        let reqParams = {
          buyNumber: this.buyNum,
          buyType: this.buyType.value,
          period: this.period.value,
          version: buyVersionsArray.join(','),
          bankId: this.bankId.id
        }
        this.$http.post('/api/createOrder', reqParams)
          .then((res) => {
            this.orderId = res.data.orderId
            console.log(this.orderId)
            this.isShowCheckOrder = true
            this.isShowPayDialog = false
          }, (err) => {
            this.isShowPayDialog = false
            console.log(err)
          })
      }
    },
    mounted () {
      this.buyNum = 1
      this.buyType = this.buyTypes[0]
      this.versions = [this.versionList[0]]
      this.period = this.periodList[0]
      this.getPrice()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }
  .buy-dialog-btn {
    margin-top: 20px;
  }
  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .buy-dialog-table td,
  .buy-dialog-table th{
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }
  .buy-dialog-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
  }
  .huangxian{
    height:180px;
    width:230px;
    margin-left:25px;
    float: left;
  }
  .clear:after {
    content: '';
    display: block;
    clear: both;
  }
</style>
