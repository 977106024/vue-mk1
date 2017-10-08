<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>天然硫磺温泉</h2>
      <p>硫磺泉，矿泉的一种，泉水中含有硫化氢，通常形成天然的温泉，用这种泉水洗澡，有治疗皮肤病的作用。 又称硫化氢泉，因为硫磺泉的主要成分为硫化氢。其显著特点是走近温泉，即可闻到臭蛋气味。</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品类型：
        </div>
        <div class="sales-board-line-right">
          <v-chooser :selections="buyTypes"></v-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          预约：
        </div>
        <div class="sales-board-line-right">
          <v-selection :selections="districts"></v-selection>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
        </div>
        <div class="sales-board-line-right">
          半年
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
      <p>硫磺泉具有软化皮肤、溶解角质、灭菌、杀虫作用，对种种皮肤病有较好的治疗效果；可使植物性神经系统兴奋活跃，用于需要兴奋的患者，如神经损伤、神经炎、肌肉瘫痪等；能促进关节浸润物的吸收，缓解关节韧带的紧张，适用于各种慢性关节疾病；因泉水中所含胶状硫磺分子微小，易进入体内组织，起类似触媒作用，使体内的废物由皮肤和肾脏排出体外，所以，硫磺泉对代谢性疾病也有一定作用。</p>

      <h3>景点图片</h3>
      <div v-for="item in WQ">
        <img :src="item.src" alt="" class="huangxian">
      </div>

      <table class="sales-board-table">
        <tbody>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>酒店</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>梧桐树大酒店</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>梨树湾大酒店</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>黄仙洞大酒店</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>汉庭</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>海星酒店</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>露营</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>民宿</label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>景点</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label></label>
            </div>
          </td>
        </tr>
        <tr class="ui-table-row">
          <td class="col-first">
            <div class="intro-pic">
              <label>黄仙洞</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>梨树湾</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>八折河</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>免费垂钓</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>娘娘寨</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>西游记公园</label>
            </div>
          </td>
          <td>
            <div class="intro-pic">
              <label>天然硫磺温泉</label>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import VSelection from '../../components/base/selection'
  import VChooser from '../../components/base/chooser'
  export default {
    components: {
      VChooser,
      VSelection
    },
    props: {
      WQ: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        buyTypes: [
          {
            label: '小泉',
            value: 0
          },
          {
            label: '中泉',
            value: 1
          },
          {
            label: '大泉',
            value: 2
          }
        ],
        districts: [
          {
            label: '周一',
            value: 0
          },
          {
            label: '周二',
            value: 1
          },
          {
            label: '周三',
            value: 2
          },
          {
            label: '周四',
            value: 3
          },
          {
            label: '周五',
            value: 4
          },
          {
            label: '礼拜',
            value: 5
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .huangxian{
    height:180px;
    width:230px;
    margin-left:25px;
    margin-bottom:25px;
    float: left;
  }
  .clear:after {
    content: '';
    display: block;
    clear: both;
  }
</style>
