// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import VueQrcode from 'vue-qrcode'
import api from './service/api'
import './global'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.component('qrcode', VueQrcode);

router.beforeEach((to, from, next) => {
  // var vConsole = new VConsole();
  // console.log('Vconsole ready!');

  //设置好全局的环境变量
  for(var key in global[process.env.NODE_ENV]){
    global[key] = global[process.env.NODE_ENV][key]
  }

  document.title = TITLE;
  var wxid = localStorage.getItem('wxid');
  // if(to.name == 'MyVisitors'){
    if(true){
      // 这里是判断哪些页面需要过免登流程
      if(!wxid){
        // 没有登录的情况则登录
        if(to.query.code){
          // 这是从微信redirect跳过来的情况
          var code = to.query.code;
          api.getUserInfo(code).then((res)=>{
            localStorage.setItem('wxid', res.userInfo.userid);
            localStorage.setItem('name', res.userInfo.name);
            next();
          });

        }else{
          var redirectUrl = G_SERVER_URL + to.fullPath;
          var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${CORP_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&agentid=${AGENT_ID}&state=STATE123#wechat_redirect`
          window.location.href = url;
        }
      }else{
        console.log('已登录:', wxid);
        next();
      }
    }else{
      next();
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
