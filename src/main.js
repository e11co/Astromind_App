// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
// import ElementUI from 'element-ui'
// import mint from 'mint-ui'
import Vuetify from "vuetify";
import VueCorvova from "vue-cordova";

// import VueResource from 'vue-resource'

// import 'element-ui/lib/theme-chalk/index.css'

import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/js/application.js";
import "../static/js/jquery-1.9.js";
import "./assets/icon/iconfont.css";

// import 'mint-ui/lib/style.css'

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import VueLocalStorage from "vue-localstorage";

// import IPFS from "ipfs";

// import './assets/css/neat-min.css'
// import './assets/css/style.css'

Vue.use(VueLocalStorage);
Vue.use(VueLocalStorage, {
  name: "ls",
  bind: true //created computed members from your variable declarations
});

// Vue.use(VueResource)
Vue.use(VueAxios, axios);
Vue.use(VueCorvova);
// Vue.use(ElementUI)
// Vue.use(mint)

Vue.use(Vuetify);
// Vue.use(IPFS);

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: {
//     App
//   },
//   template: '<App/>'
// })

// Vue.config.errorHandler = function (err, vm, info) {
//   // handle error
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
//   // 只在 2.2.0+ 可用
//   console.error("-------------i get the error-----------------");
// }

//  new Vue({
//    el: '#app',
//    router,
//    store,
//    render: h => h(App)
//  })

var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
// var isOpera = userAgent.indexOf("Chrome") > -1;
// var isOpera = false; // 在真机部署 设为false ；
var isOpera = true; // 在真机部署 设为false ；

if (!isOpera) {
  document.addEventListener(
    "deviceready",
    function() {
      new Vue({
        el: "#app",
        router,
        store,
        render: h => h(App)
      });
      // StatusBar.backgroundColorByHexString("#f5f5f5");
      StatusBar.backgroundColorByName("white");
      // 状态栏，黑色文本
      StatusBar.styleDefault();
    },
    false
  );
} else {
  new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
  });
}

// "deviceready" 当cordova 加载完才执行，在网页调试的时候无法完成加载，
// 只有打包为app后才可以实现。
/* 
document.addEventListener(
  "deviceready",
  function() {
    new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
    // StatusBar.backgroundColorByHexString("#f5f5f5");
    StatusBar.backgroundColorByName("white");
    // 状态栏，黑色文本
    StatusBar.styleDefault();
    //StatusBar.hide()

    //显示横幅广告
    // AdMob.createBanner({
    //   adId: admobid.banner, //横幅广告id
    //   position: AdMob.AD_POSITION.BOTTOM_CENTER, //广告位置，此为屏幕下方
    //   autoShow: true
    // });

    //显示全屏广告 在此处打开，则是设备准备就绪时就显示广告  在hatch.vue中也可调用
    // AdMob.prepareInterstitial({
    //   adId: admobid.interstitial, //全屏广告id
    //   autoshow: false
    // });

    // setInterval(AdMob.prepareInterstitial, 2*60*1000); //两分钟弹出一次广告
  },
  false
); */
