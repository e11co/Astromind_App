<template>
  <!-- <div class="hello">
    <div class="logo">
      <img src="../assets/img/logo.gif">
    </div>
    <p>A constellation game that understands you</p>
  </div>-->
  <v-img :src="logoImg"></v-img>
</template>

<script>
import Vue from "vue";
export default {
  name: "HelloWorld",
  data: function() {
    return {
      timer: null,
      logoImg: require("../assets/img/logo.gif")
    };
  },
  created: function() {
    // 加载数据
    // 若本地localstorage 有用户数据--数据加载--直接登录--home页面
    // 若本地localstorage 没有用户数据--登录页面
    this.$nextTick(() => {
      let willGO = "";
      let currentUser = JSON.stringify(Vue.localStorage.get("currentUser"));
      if (
        currentUser === "null" ||
        currentUser === "undefined" ||
        currentUser == null
      ) {
        // 初次使用app,去导航页
        Vue.localStorage.set("currentUser", "astromind");
        willGO = "Guide1";
      } else {
        // 已不是第一次使用app 不显示导航页
        this.$store.commit("setIsFirst", false);

        if (this.loadInfoFromLs()) {
          // alert("goHome");
          willGO = "myHome";
        } else {
          console.log("初始化数据失败，跳转至welcome");
          // alert("goWelcome");
          willGO = "welcome";
        }
      }

      // `this` 指向 vm 实例
      setTimeout(() => {
        console.log("3.5s跳转到导航页");

        // 第二次直接跳到登录页面

        this.$router.push({ name: willGO });
      }, 3400);
    });
  },
  methods: {
    // 从localStorage加载用户数据，若存在，直接登录，若不存在，正常注册
    // 数据加载成功--返回true ，数据加载失败，返回--false
    loadInfoFromLs() {
      let currentUser = Vue.localStorage.get("currentUser");
      // let currentUser = JSON.stringify(Vue.localStorage.get("currentUser"));

      let tempStr = "userInfo_" + currentUser + "";
      let temp = JSON.stringify(Vue.localStorage.get(tempStr));

      if (tempStr === "userInfo_" + currentUser) {
        console.log("tempStr = userInfo_qqqqqq");
      } else {
        console.error("tempStr != userInfo_qqqqqq");
      }
      // ls 是否存在用户数据
      if (!(temp == "null" || temp == "undefined" || temp == null)) {
        let userInfo = JSON.parse(Vue.localStorage.get(tempStr));

        tempStr = "userConstellationInfo_" + currentUser;
        let userConstellationInfo = JSON.parse(Vue.localStorage.get(tempStr));

        // console.log("=====userConstellatioinInfo=====");
        // console.log(JSON.stringify(userConstellationInfo));
        tempStr = "babyInfo_" + currentUser;
        let babyInfo = JSON.parse(Vue.localStorage.get(tempStr));

        // console.log("======currentUser=======");
        // console.log(currentUser);

        // console.log("======userInfo=======");
        // console.log(userInfo);
        // console.log(JSON.stringify(userInfo));
        // console.log(
        //   "======Vue.localStorage.get(babyInfo_ + currentUser)======="
        // );
        // console.log(Vue.localStorage.get(tempStr));
        // console.log(Vue.localStorage.get(tempStr));

        this.$store.commit(
          "refresh",
          userInfo,
          userConstellationInfo,
          babyInfo
        );
        this.$store.commit("setUserConstellationInfo", userConstellationInfo);
        this.$store.commit("setBabyInfo", babyInfo);

        // console.log("-------babyInfo----------");
        // console.log(JSON.stringify(babyInfo));

        if (this.$store.state.userInfo.username !== "") {
          return true;
        }
      }

      return false;
    }
  },
  beforeDestroy() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  font-family: "Microsoft YaHei";
  padding-top: 0.875rem;
}
.hello {
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  justify-content: center;
  padding-top: 11rem;
}

#app {
  background-color: transparent;
}
</style>
