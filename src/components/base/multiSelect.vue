<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li
        v-for="(item, index) in selections"
        @click="toggleSelection(index)"
        :title="item.label"
        :class="{active: checkActive(index)}"
      >{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      }
    },
    data () {
      return {
        nowIndexes: [0]
      }
    },
    methods: {
      toggleSelection (index) {
        if (this.nowIndexes.indexOf(index) === -1) { // -1表示这个值在数组里不存在
          this.nowIndexes.push(index)
        } else {
          this.nowIndexes = _.remove(this.nowIndexes, (idx) => { // idx 表示数组中所有值
            return idx !== index  // index点击传进来的值 比如3 !== 3 结果为false 就会被删除 2 !== 3等于true就不被删除
          })
        }
        let nowObjArray = _.map(this.nowIndexes, (idx) => {
          return this.selections[idx]
        })
        this.$emit('on-change', nowObjArray)
      },
      checkActive (index) {
        return this.nowIndexes.indexOf(index) !== -1 // 如果this.nowIndex中的值被删除了 传进来的index就会等于 -1 结果为false
      }// 只有等于true时才会被加上效果
    }
  }
</script>

<style scoped>
  .chooser-component {
    position: relative;
    display: inline-block;
  }
  .chooser-list li{
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }

</style>
