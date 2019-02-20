<template>
  <v-container fluid grid-list-xs>
    <v-layout align-space-between justify-space-between column fill-height>
      <v-flex xs12>
        <!-- 全局通知 -->
        <v-alert :value="alert.isShow" :type="alert.alertType">{{alert.content}}</v-alert>
        <!-- home 标题部分 -->
        <!-- <v-card :color="contentColor" width="100%" :height="(this.$store.state.screenHeight - 56) +'px' "> -->
        <div v-if="displayFlag === 0">
          <!-- 向子组件传递参数 -->
          <babyHome_titile
            :showMenu="true"
            :titleContent="`Astromind`"
            v-on:exitApp="exitApp"
            v-on:logout="logout"
          />
          <!-- <babyHome_titile :themeColor="contentColor"/> -->
        </div>
      </v-flex>
      <!-- <v-btn @click="updateMarketDisplay" >dd</v-btn> -->
      <!-- <v-subheader>Window Size</v-subheader> -->
      <!-- {{ windowSize }} -->
      <!-- 通知消息部分 -->
      <v-flex xs12>
        <div
          v-if="(JSON.stringify(this.$store.state.userInfo.userMessage) == '[]' 
          || this.$store.state.userInfo.babyCount > 0) && displayFlag === 0"
        >
          <!-- 向子组件传递参数 -->
          <babyHome_message :messages=" this.$store.state.userInfo.userMessage"/>
          <!-- 消息部分占位 -->
          <!-- <v-subheader>Window Size</v-subheader>
          {{ windowSize.y }}-->
        </div>
        <div v-else-if="displayFlag === 0">
          <!-- <v-card flat :height="( windowHeight /11) * 1.0"></v-card> -->
          <!-- <v-card flat :height="( windowHeight /8) * 1.0"></v-card> -->
        </div>
      </v-flex>
      <!-- camreteTest 
      需要引入cameraTest.js，相机方法都在里面
      -->
      <!-- <v-btn @click="openCarmare">carmere</v-btn>
      <img id="myImage">-->
      <!--  -->
      <!-- home内容 -->
      <v-flex xs12 mt-2 v-if="displayFlag === 0">
        <v-card flat width="100%">
          <!-- <v-card flat :color="contentColor" width="100%"> -->
          <!-- <v-card :color="contentColor" width="100%" :height="contentHeight +'px' "> -->
          <div>
            <!-- 向子组件传递参数 并监听子组件回传值-->
            <babyHome_content v-on:needJump="jumpTo" ref="babyHome_content"/>
            <!-- <babyHome_content
            :displayHeight="windowHeight"
            v-on:needJump="jumpTo"
            ref="babyHome_content"
            />-->
          </div>
          <!-- 父组件调用子组件函数Test -->
          <!-- <button v-on:click="clickParent">点击</button> -->
        </v-card>
        <!-- <v-btn @click="bottomNav += 1">store </v-btn> -->
      </v-flex>
      <!-- <v-subheader>Swipe Direction</v-subheader>
      {{ swipeDirection }}-->
      <!-- market内容 -->
      <v-flex xs12 v-if="displayFlag === 1">
        <market_title/>
        <!-- <market_title :displayHeight="windowHeight"/> -->
        <!-- <market_title :displayHeight="windowSize" v-on:updateLottery="updateMarketDisplay"/> -->
        <!-- <market_title :displayHeight="windowSize" ref="market_title"/> -->
      </v-flex>
      <!-- chat内容 -->
      <v-flex xs12 v-if="displayFlag === 2">
        <chat_title :des="bottomNav"/>
      </v-flex>
      <!-- forecast内容 -->
      <v-flex xs12 v-if="displayFlag === 3">
        <forecast :des="bottomNav"/>
      </v-flex>
      <!-- task内容 -->
      <!-- <v-flex xs12 v-if="displayFlag === 4">
      <task_title :des="bottomNav"/>
      </v-flex>-->
      <!-- <v-card height="650px" flat > -->
      <!-- 底部导航栏 -->
      <v-bottom-nav :active.sync="bottomNav" color="white" :value="true" app :ripple="false">
        <!-- <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute shift> -->
        <v-btn dark color="black" flat value="Home" :ripple="false">
          <span>Home</span>
          <v-icon color="#2be7aa" small>face</v-icon>
        </v-btn>
        <v-btn dark color="black" flat value="Market" :ripple="false">
          <span>Market</span>
          <v-icon color="#2be7aa" small>store</v-icon>
          <!-- <v-icon color="#2be7aa" small>business_center</v-icon> -->
        </v-btn>
        <!-- 角标消息提示 -->
        <v-badge overlap color="orange" v-model="badgeShow">
          <v-icon slot="badge" dark small>notifications</v-icon>
          <v-btn dark color="black" flat value="Chat" :ripple="false">
            <span>Chating</span>
            <v-icon color="#2be7aa" small>chat</v-icon>
          </v-btn>
        </v-badge>
        <v-btn dark color="black" flat value="Forecast" :ripple="false">
          <span>Forecast</span>
          <v-icon color="#2be7aa" small>star_border</v-icon>
          <!-- <v-icon>grade</v-icon> -->
        </v-btn>
        <!-- <v-btn dark color="black" flat value="Task" :ripple="false">
        <span>Task</span>
        <v-icon color="#2be7aa" small>receipt</v-icon>
        </v-btn>-->
      </v-bottom-nav>
      <!-- 孵化子组件  -->
      <!-- <hatch ref="hatchRef"/> -->
      <!-- {{bottomNav }} -->
    </v-layout>
    <!-- </v-card> -->
  </v-container>
</template>

<script>
import Vue from "vue";

// import cameraTest from "../assets/js/cameraTest.js";
import babyHome_titile from "../components/astromind_title";
import babyHome_message from "../components/babyHome_message";
import babyHome_content from "../components/babyHome_content";
import market_title from "../components/market_title";
import chat_title from "../components/ChatBot/chat_title";
// import forecast_title from "../components/forecast_title";
import forecast from "../components/newForecast_1031";

import * as ipfsStorage from "../assets/js/ipfsStorage.js";

// import { bus } from "../components/utils/bus.js";
// import task_title from "../components/task_title";
// import hatch from "../components/hatch/hatch";

export default {
  data() {
    return {
      // 聊天角标
      //  false -- 不显示
      //  true -- 显示
      // badgeShow: false,
      /* displayFlag :
      //            0 --- home页面
      //            1 --- market 页面
      //            2 ---- chat 页面
      //            3 ---- forecast 页面
      //            4 ---- task 页面
      */
      displayFlag: 0,

      bottomNav: "Home",
      // 获取出title 和底部导航栏外 的屏幕内容高度
      windowHeight: 0
    };
  },
  // 子组件
  components: {
    babyHome_titile,
    babyHome_content,
    babyHome_message,
    market_title,
    chat_title,
    // forecast_title,
    // task_title,
    forecast
  },
  created() {
    // 设置状态栏颜色与内容一致
    StatusBar.backgroundColorByHexString("#f5f5f5");
    // let theData = [];
    // theData[0] = JSON.parse(Vue.localStorage.get("userInfo")) || {};
    // theData[1] =
    //   JSON.parse(Vue.localStorage.get("userConstellationInfo")) || {};
    // theData[2] = JSON.parse(Vue.localStorage.get("chatMessage")) || [];
    // theData[3] = JSON.parse(Vue.localStorage.get("babyInfo")) || {};
    // this.$store.commit("refresh", theData);
    // bus.$on("badge", () => {
    //   alert("hello");
    // });
  },
  mounted() {
    this.$nextTick(() => {
      // 获取屏幕高度
      this.windowHeight = document.getElementsByClassName(
        "v-content__wrap"
      )[0].clientHeight;

      console.log("windowSize = " + this.windowHeight);

      // 异步先获取marketEggs
      this.$store.dispatch("getAllMarketEgg");
      // this.$store.dispatch("getAllMarketEgg")

      // this.badgeShow = this.$store.state.showChatBadge;
      // console.log(
      //   "--------localStore------" + Vue.localStorage.get("someNumber")
      // );
    });
  },
  computed: {
    badgeShow() {
      return this.$store.state.showChatBadge;
    },
    // 顶部消息通知对象
    alert() {
      return this.$store.state.alert;
    }
  },
  watch: {
    // 获取title 和底部导航栏外 的屏幕内容高度
    // console.log(
    //         " document.getElementsByClassName()[0].clientHeight === " +
    //           document.getElementsByClassName("v-content__wrap")[0].clientHeight
    //       );

    // 滑动跳转
    bottomNav: function(newVal, oldVal) {
      switch (newVal) {
        case "Home":
          console.log("current page = " + newVal);
          this.displayFlag = 0;
          break;
        case "Market":
          console.log("current page = " + newVal);
          // console.log(
          //   "marketEggs = " + JSON.stringify(this.$store.state.marketEggs)
          // );

          this.displayFlag = 1;
          break;
        case "Chat":
          console.log("current page = " + newVal);
          this.displayFlag = 2;
          break;
        case "Forecast":
          console.log("current page = " + newVal);
          this.displayFlag = 3;
          break;
        case "Task":
          console.log("current page = " + newVal);
          this.displayFlag = 4;
          break;
        case "showUserEggs":
          console.log("current page = " + newVal);
          this.$router.push("/showUserEggs"); //跳转
          break;
        case "babyCloths":
          console.log("current page = " + newVal);
          this.$router.push("/babyCloths"); //跳转
          break;

        default:
          break;
      }
      // console.log("--------------------");
      // console.log("corodva --》" + window.cordova);
    }
  },
  methods: {
    // openCarmare() {
    //   cameraTest();
    // },
    // 切换子组件
    jumpTo: function(val) {
      // this.$refs.market_title.changeTab("Try your luck");
      this.bottomNav = val;
      // this.$refs.babyHome_content.handleParentClick("hello child")
    },
    // 调用子组件函数Test
    clickParent() {
      // this.$refs.babyHome_content.imgClick;
      this.$refs.babyHome_content.handleParentClick("hello child");
    },
    clickMessage() {
      console.log("click message");
    },
    valueChange(val) {
      console.log("valueChange");
    },
    // 保存数据
    storageInfo() {
      let ipfsNode = {
        ip: "119.29.135.217",
        port: "5001"
      };

      let toIpfsData = [{ userName: this.$store.state.userInfo.username }]; // 准备储存于ipfs中的数据
      let storageObj = {};
      ipfsStorage.connectDaemon(ipfsNode); // 获取ipfs 实例

      // 保存消息记录
      let chatMessage = JSON.stringify(this.$store.state.chatMessage);
      // this.$store.commit("setChatMessages", this.chatMessages);
      if (chatMessage != "[]") {
        Vue.localStorage.set(
          "chatMessage_" + this.$store.state.userInfo.username,
          chatMessage
        );
      }
      // 保存userInfo
      let userInfo = JSON.stringify(this.$store.state.userInfo);
      Vue.localStorage.set(
        "userInfo_" + this.$store.state.userInfo.username,
        userInfo
      );

      // 保存userConstellationInfo
      let userConstellationInfo = JSON.stringify(
        this.$store.state.userConstellationInfo
      );

      // if (this.$store.state.userConstellationInfo.lastName != "") {
      Vue.localStorage.set(
        "userConstellationInfo_" + this.$store.state.userInfo.username,
        userConstellationInfo
      );
      // }

      // 保存babyInfo
      let babyInfo = JSON.stringify(this.$store.state.babyInfo);
      Vue.localStorage.set(
        "babyInfo_" + this.$store.state.userInfo.username,
        babyInfo
      );
      // 保存当前用户名
      Vue.localStorage.set("currentUser", this.$store.state.userInfo.username);

      storageObj = {
        chatMessage: chatMessage,
        userInfo: userInfo,
        userConstellationInfo: userConstellationInfo,
        babyInfo: babyInfo
      };

      toIpfsData.push(storageObj);

      ipfsStorage
        .storeObj({
          fileName: "ipfs_"+this.$store.state.userInfo.username + ".json",
          fileContent: toIpfsData
        })
        .then(res => {
          console.log("*****************************");
          console.log("file Hash : " + res[0].hash);
          console.log("file Name : " + res[0].path);
        })
        .catch(error => {
          console.log(
            "**********something error in ipfsStorage*******************"
          );
        });
    },
    // 退出app
    exitApp() {
      this.storageInfo();
      // this.$store.commit("setExitFlag", 0);
      // 退出app
      navigator.app.exitApp();
    },
    // 注销账户
    logout() {
      Vue.localStorage.remove(
        "chatMessage_" + this.$store.state.userInfo.username
      );
      Vue.localStorage.remove(
        "userInfo_" + this.$store.state.userInfo.username
      );
      Vue.localStorage.remove(
        "userConstellationInfo_" + this.$store.state.userInfo.username
      );
      Vue.localStorage.remove(
        "babyInfo_" + this.$store.state.userInfo.username
      );
      Vue.localStorage.remove("currentUser");
      navigator.app.exitApp();
    },
    // 切换chat 角标显示
    toggleBadgeShow() {
      this.badgeShow = !this.badgeShow;
    }
  },
  beforeDestroy() {
    let exitFlag = this.$store.state.exitFlag;
    // 定义全局通知
    let temp_alert = {
      isShow: true,
      alertType: "info",
      content: "再按一次退出应用"
    };
    this.$store.commit("setAlert", temp_alert);

    setTimeout(() => {
      this.$store.commit("setAlert", { isShow: false });
      console.log("----2s 已过，重置通知");
    }, 2000);

    if (exitFlag === 1) {
      this.storageInfo();
      // this.$store.commit("setExitFlag", 0);
      // 退出app
      navigator.app.exitApp();
    } else {
      this.$store.commit("setExitFlag", exitFlag + 1);
      // 两秒后还未执行，重置
      setTimeout(() => {
        console.log("重置返回键次数");

        this.$store.commit("setExitFlag", 0);
        console.log(this.$store.state.exitFlag);
      }, 2000);

      this.$router.push("/myHome");
    }

    // 在首页关闭之前，本地储存数据
    // let userInfo = JSON.stringify(this.$store.state.userInfo);
    // let userConstellationInfo = JSON.stringify(
    //   this.$store.state.userConstellationInfo
    // );
    // let chatMessage = JSON.stringify(this.$store.state.chatMessage);
    // let babyInfo = JSON.stringify(this.$store.state.babyInfo);

    // Vue.localStorage.set("userInfo", userInfo);
    // Vue.localStorage.set("userConstellationInfo", userConstellationInfo);
    // Vue.localStorage.set("chatMessage", chatMessage);
    // Vue.localStorage.set("babyInfo", userIbabyInfonfo);
    // Vue.localStorage.get("someNumber");
  }
};
</script>
<style>
/* #myImage {
  align-content: center;
  alt: "camareImg";
  height: 200px;
  width: 200px;
} */
</style>



