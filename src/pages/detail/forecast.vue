<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>黄仙洞</h2>
      <p>黄仙洞面向西北，全长2500余米，洞口壁高100米，宽70米。洞内蜿蜒曲折，跌宕起伏，丰富的石灰岩石在天然水和地下水的溶蚀作用下，经过极其漫长的地质发展历史，从而形成了极其奇特的洞天石林景观和十分丰富的喀斯特地貌特征。</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
        </div>
        <div class="sales-board-line-right">
          <v-counter :max="100" :min="20"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          媒介：
        </div>
        <div class="sales-board-line-right">
          <v-mul-chooser :selections="versionList"></v-mul-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
        </div>
        <div class="sales-board-line-right">
          三个月
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
        </div>
        <div class="sales-board-line-right">
          500 元
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
        <div class="sales-board-line-right">
          <div class="button">
            立即购买
          </div>
        </div>
      </div>
    </div>
    <div class="sales-board-des clear">
      <h2>景点介绍</h2>
      <p>黄仙洞面向西北，全长2500余米，洞口壁高100米，宽70米。洞内蜿蜒曲折，跌宕起伏，丰富的石灰岩石在天然水和地下水的溶蚀作用下，经过极其漫长的地质发展历史，从而形成了极其奇特的洞天石林景观和十分丰富的喀斯特地貌特征。洞内钟乳石比比皆是，形态各异，石针、石矛、石笋、石柱、石塔、石幔、石瀑，分别呈红、黄、白、褐等色，如玉似翠，景致诱人，色彩绚丽，扑朔迷离，气势恢宏，波澜壮阔,是中国溶洞之奇观。</p>
      <h3>景点图片</h3>
      <div v-for="item in huangXian">
        <img :src="item.src" alt="" class="huangxian">
      </div>
    </div>
  </div>
</template>

<script>
  import VCounter from '../../components/base/counter'
  import VMulChooser from '../../components/base/multiSelect'
  export default {
    components: {
      VCounter,
      VMulChooser
    },
    props: {
      huangXian: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        versionList: [
          {
            label: '单票',
            value: 0
          },
          {
            label: '住宿',
            value: 1
          },
          {
            label: '三餐',
            value: 2
          },
          {
            label: '温泉',
            value: 3
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .huangxian{
    height:215px;
    width:165px;
    margin-left:25px;
    float: left;
  }
  .clear:after {
    content: '';
    display: block;
    clear: both;
  }
</style>
