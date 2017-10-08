<template>
  <div>
    <this-dialog :is-show="isShowCheckOrder" @on-close="checkstatus">
      请检查你的支付状态！
      <div class="button" @click="checkstatus">
        支付成功
      </div>
      <div class="button" @click="checkstatus">
        支付失败
      </div>
    </this-dialog>

    <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
      购买成功
    </this-dialog>
    <this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
      购买失败
    </this-dialog>
  </div>
</template>

<script>
  import Dialog from './base/dialog'
  export default {
    components: {
      thisDialog: Dialog
    },
    props: {
      isShowCheckOrder: {
        type: Boolean,
        default: false
      },
      orderId: {
        type: [String, Number]
      }
    },
    data () {
      return {
        isShowSuccessDialog: false,
        isShowFailDialog: false
      }
    },
    methods: {
      checkstatus () {
        this.$http.post('/api/checkOrder', {
          orderId: this.order
        })
          .then(() => {
            this.isShowSuccessDialog = true
            this.$emit('on-close-check-dialog') // 子组件不能改父组件传来的变量
          }, () => {
            this.isShowFailDialog = true
            this.$emit('on-close-check-dialog')
          })
      },
      toOrderList () {
        this.$router.push({path: '/orderList'})
      }
    }
  }
</script>
