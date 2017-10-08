<template>
  <div @click="resetComponent">
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path: '/'}">
          <img src="../assets/kedian.png" alt="客店商城">
        </router-link>
        <div class="head-nav">
            <ul class="nav-list">
              <li>
                <div v-if="logined">
                你好,{{user.username}}
                </div>
              </li>
              <li>
                <div v-if="logined" @click.prevent="signOut">登出</div>
              </li>
              <li v-if="!logined" @click="logClick">登陆</li>
              <li v-if="!logined" class="nav-pile">|</li>
              <li v-if="!logined" @click="regClick">注册</li>
              <li class="nav-pile">|</li>
              <li @click="aboutClick">关于</li>
            </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
    <div class="app-foot">
      <p>© 2017 ahong </p>
    </div>
    <my-dialog :is-show="isShowLogDialog"  @on-close="closeDialog('isShowLogDialog')">
      <log-form @success="signIn($event)"></log-form>
    </my-dialog>

    <my-dialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <reg-form @success="signIn($event)"></reg-form>
    </my-dialog>

    <my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>山水客店，独家景点，纯天然土特产。
        <br>
        联系电话：18071597173</p>
    </my-dialog>
  </div>
</template>

<script>
  import { eventBus } from '../eventBus'
  import Dialog from './base/dialog'
  import LogForm from './logForm'
  import RegForm from './regForm'
  import AV from '../lib/leancloud'
  import getAVUser from '../lib/getAVUser'

  import store from '../store/index'
  export default{
    store,
    components: {
      MyDialog: Dialog,
      LogForm,
      RegForm
    },
    data () {
      return {
        isShowLogDialog: false,
        isShowRegDialog: false,
        isShowAboutDialog: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      logined () {
        return this.user.id
      }
    },
    created () {
      let state = localStorage.getItem('state')
      if (state) {
        state = JSON.parse(state)
      }
      this.$store.commit('initState', state) // 提交最终数据
      this.$store.commit('setUser', getAVUser())
    },
    methods: {
      aboutClick () {
        this.isShowAboutDialog = true
      },
      regClick () {
        this.isShowRegDialog = true
      },
      logClick () {
        this.isShowLogDialog = true
      },
      closeDialog (attr) {
        this[attr] = false
      },
      signOut () {
        AV.User.logOut()
        this.$store.commit('removeUser')
      },
      signIn (user) {
        this.isShowRegDialog = false
        this.isShowLogDialog = false
        this.$store.commit('setUser', user)
      },
      resetComponent () {
        eventBus.$emit('reset-component')
      }
    }
  }
</script>

<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-head {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }
  .head-logo {
    float: left;
  }
  .app-head-inner img {
    width: 100px;
    margin-top: 15px;
  }
  .head-nav {
    float: right;
  }
  .head-nav ul {
    overflow: hidden;
  }
  .head-nav li {
    cursor: pointer;
    float: left;
  }
  .nav-pile {
    padding: 0 10px;
  }
  .app-foot {
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .row{
    margin-bottom:10px;
  }
  .username{
    margin-left:16px;
  }
  .password{
    margin-left:30px;
  }
  .submit{
    background: #4fc08d;
    color: #fff;
    padding:5px 10px;
    margin-left:65px;
  }

</style>
