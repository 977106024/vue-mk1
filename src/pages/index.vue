<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>

        <template v-for="product in productList">
          <h3>{{product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{item.name}}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a href="item.url" class="new-item">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
      <div class="index-board-list">
        <div
          class="index-board-item"
          v-for="(item,index) in boardList"
          :class="[{'line-last' : index % 2 !== 0},'index-board-' + item.id]">
          <div class="index-board-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
              <a :href="item.toKey" class="button">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideShow from '../components/slideShow'

  export default{
    components: {
      slideShow
    },
    created: function () {
      this.$http.post('api/getNewsList')
        .then((res) => {
          this.newsList = res.data
        }, (err) => {
          console.log(err)
        })
    },
    data () {
      return {
        slideSpeed: 2000,
        slides: [
          {
            src: require('../assets/slideShow/carousel3.gif'),
            title: '001',
            href: 'detail/analysis'
          },
          {
            src: require('../assets/slideShow/carousel1.jpg'),
            title: 'xxx2',
            href: 'detail/count'
          },
          {
            src: require('../assets/slideShow/carousel8.jpg'),
            title: 'xxx3',
            href: 'detail/publish'
          },
          {
            src: require('../assets/slideShow/carousel7.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          }
        ],
        boardList: [
          {
            title: '黄仙洞',
            description: '洞之山为黄仙山，相传黄石公憩此，故名。',
            id: 'car',
            toKey: 'detail/forecast',
            saleout: false
          },
          {
            title: '天然硫磺温泉',
            description: '硫磺温泉又称为“黄金”温泉',
            id: 'earth',
            toKey: 'detail/count',
            saleout: false
          },
          {
            title: '香菇木耳',
            description: '客店镇农家种植',
            id: 'loud',
            toKey: 'detail/analysis',
            saleout: true
          },
          {
            title: '葛粉',
            description: '具有解热除烦，生津止渴之功效',
            id: 'hill',
            toKey: 'detail/publish',
            saleout: false
          }
        ],
        newsList: [],
        productList: {
          pc: {
            title: '纯天然土特产',
            list: [
              {
                name: '香菇木耳',
                url: 'detail/analysis'
              },
              {
                name: '云雾茶',
                url: 'detail/tea'
              },
              {
                name: '葛粉',
                url: 'detail/publish',
                hot: true
              },
              {
                name: '烟熏香肠',
                url: 'http://hearstone.com'
              }
            ]
          },
          app: {
            title: '旅游景点',
            last: true,
            list: [
              {
                name: '黄仙洞',
                url: 'detail/forecast',
                hot: true
              },
              {
                name: '娘娘寨',
                url: 'http://twitter.com'
              },
              {
                name: '八折河',
                url: 'http://maps.com'
              },
              {
                name: '天然硫磺温泉',
                url: 'detail/count'
              }
            ]
          }
        }
      }
    }
  }
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
