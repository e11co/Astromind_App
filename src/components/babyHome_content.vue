<template>
  <!-- <v-container fluid grid-list-xs> -->
  <v-layout align-space-between justify-space-between column fill-height>
    <!-- baby说话 -->
    <v-flex style="position: fixed;width: 100% ;text-align: center;left:3px;top: 24%;">
      <babytalk :talkcontent="babyTalk.content" :isShow="babyTalk.isShow"/>
    </v-flex>
    <!-- 主页内容 -->
    <v-flex style="position: fixed;width: 100% ;right: 1px;top: 32%;">
      <!-- <v-flex mt-1 flat > -->
      <!-- <v-card flat :height="(((windowSize - 126 )/8)*5)"> -->
      <!-- 主页图片部分滑动 -->
      <v-layout
        column
        v-touch="{
            left: () => jumpTo('Forecast'),
            right: () => jumpTo('Chat')
          }"
        class="text-xs-center"
      >
        <!-- <v-card flat :color="themeColor"> -->
        <!-- <v-img
                    :src="imgSrc"
                    contain
                    aspect-ratio="1"
                    @click="imgClick()"
                    :height="(windowSize-260)+'px'"
        ></v-img>-->
        <v-img
          :src="this.contentInfo.imgSrc"
          contain
          aspect-ratio="1"
          @click="jumpTo('Market')"
          :height="imgHeigth"
        ></v-img>
        <!--  没有egg -->
        <v-flex mt-3 v-if="myFlag === 0">
          <div id="dev_1">
            <h5 style="color:black">{{this.contentInfo.des}}</h5>
          </div>
        </v-flex>
        <!--  有egg 无baby -->
        <v-flex mt-2 v-if="myFlag === 1">
          <div class="text-xs-center">
            <v-btn :loading="loadingFLag" dark round color="#da6a54" @click="goToHatch">
              <h4 style="color:white">Click me to hatch</h4>
            </v-btn>
          </div>
        </v-flex>
        <!-- 有baby  -->
        <!-- <v-flex mt-2 v-if="myFlag === 2">

            <div class="text-xs-center">
              <v-btn :loading="loadingFLag" dark round>
                <h4 style="color:white">Click me to hatch</h4>
              </v-btn>
            </div>
        </v-flex>-->
      </v-layout>
    </v-flex>
    <!-- 拥有baby之后的底部信息显示 -->
    <v-flex v-if="myFlag === 2" style="position: fixed;width: 100%;left: 10px;bottom: 66px;">
      <v-card flat>
        <v-layout
          column
          v-touch="{
            left: () => jumpTo('showUserEggs'),
            right: () => jumpTo('babyCloths')
          }"
        >
          <!-- <v-layout
          column
          v-touch="{
            left: () => jumpTo('showUserEggs'),
            right: () => jumpTo('babyCloths'),
            up: () => jumpTo('Home'),
            down: () => jumpTo('Home')
          }"
          >-->
          <v-layout justify-center column>
            <!-- babyName -->
            <v-flex xs12>
              <h2>{{this.$store.state.babyInfo.babyName}}</h2>
            </v-flex>
            <!-- 任务完成进度 -->
            <v-layout justify-center row>
              <v-flex xs2 mt-2>
                <h5>Maturity:</h5>
              </v-flex>
              <v-flex xs10 ml-2>
                <v-progress-linear v-model="bpm" width="2" height="4"></v-progress-linear>
              </v-flex>
            </v-layout>
            <v-layout justify-center row mt-1>
              <v-flex xs2>
                <h5>Horoscope:</h5>
              </v-flex>
              <v-flex xs10 ml-2>
                <h5>{{Horoscope}}</h5>
              </v-flex>
            </v-layout>
            <!-- <v-layout justify-center row>
              <v-flex xs3>
                <h5>ABC coin:</h5>
              </v-flex>
              <v-flex xs9>
                <h5>1024</h5>
              </v-flex>
            </v-layout>-->
            <v-layout justify-center row mt-1>
              <v-flex xs2>
                <h5>Age:</h5>
              </v-flex>
              <v-flex xs10 ml-2>
                <h5>{{babyAge}}</h5>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-layout>
      </v-card>
    </v-flex>
    <!-- <v-flex v-else>
      <v-card flat></v-card>
    </v-flex>-->
    <!-- 底部通知 -->
    <toast :color="toastColor" :text="toastText" ref="toast"/>
    <!-- 孵化子组件  -->
    <hatch ref="hatch" v-on:hatchEnd="hatchEnd"/>
  </v-layout>
  <!-- </v-container> -->
</template>

<script>
/* 
  Home 页面的具体内容

*/
import jsonp from "jsonp";
import ajax from "../assets/js/ajax.js";
import computeTime from "../assets/js/computeTime.js";
import toast from "./dialogs/Toast";
import babytalk from "./dialogs/babyTalk";
import hatch from "./hatch/hatch";

export default {
  name: "babyHome_content",
  props: [],
  // props: [displayHeight: {
  //   type: Number,
  //   default: 0,
  // }],
  data() {
    return {
      // displayHeight: 0,
      toastColor: "success",
      toastText: "",

      loadingFLag: false,
      // 图片显示的大小
      imgHeigth: 250,
      /* 
      控制显示的元素
      0 --- no egg no baby
      1 --- hava egg no baby
      2 --- hava egg hava baby
       */
      myFlag: 0,
      //   home页图片请求控制标志，避免每次点击home都会重新发送查询请求
      // ajaxFlag: true,
      contentInfo: {
        username: this.$store.state.userInfo.username,
        //   图片资源
        imgSrc: "",
        //   文字说明
        des: "",
        // 用户所处状态
        userStatus: ""
      },
      eggIds: [],
      user_eggs: []
    };
  },
  components: {
    toast,
    babytalk,
    hatch
  },
  computed: {
    bpm() {
      return this.$store.state.babyInfo.babyMaturity == ""
        ? 0
        : this.$store.state.babyInfo.babyMaturity;
    },
    Horoscope() {
      return this.$store.state.userConstellationInfo.constellation == ""
        ? "null"
        : this.$store.state.userConstellationInfo.constellation;
    },
    babyAge() {
      let msd = Date.now() - this.$store.state.babyInfo.birthday;
      return computeTime(msd);
    },
    babyTalk() {
      return this.$store.state.babyTalk;
    }
  },
  mounted: function() {
    console.log("content创建完成");
    // this.contentInfo.imgSrc = require("../assets/img/egg2.png");
    // let temp_src = this.$store.state.userInfo.eggImgSrc;
    // let temp_src = '/img/egg2.png';
    // console.log(temp_src)
    let updateFlag = this.$store.state.inquireUserInfoFlag;
    this.inquireUserInfo(updateFlag);
  },

  methods: {
    // test
    handleParentClick(val) {
      console.log("i am from parent" + val);
    },
    // 点击图片执行
    jumpTo(val) {
      console.log("will jump to " + val);
      this.$emit("needJump", val);
    },

    // 查询用户数据
    // 在eggImgSrc不为空时，不再去向服务器请求
    // this.$store.state.userInfo.eggImgSrc === ""
    //   ? (this.contentInfo.imgSrc = "")
    //   : (this.contentInfo.imgSrc = require("../assets" +
    //       this.$store.state.userInfo.eggImgSrc));

    // 在用户数据需要更新时，设置val 为true
    inquireUserInfo(val) {
      //  console.log("this.user_eggs===" + this.user_eggs[0]);
      if (
        (this.$store.state.userInfo.eggImgSrc === "" &&
          this.$store.state.userInfo.babyImgSrc === "") ||
        val
      ) {
        console.log("向服务器请求inquireUserInfo");
        // 请求数据-->查询用户egg&baby数据
        ajax(
          "http://139.199.195.199:8888/getUserEggAndBabyCount",
          //   "http://139.199.195.199:8888/getUserEggAndBabyCountERROR",
          { username: this.contentInfo.username },
          data => {
            console.log("getUserEggAndBabyCount request success");
            console.log(data);

            // 封装userinfo数据
            let userInfo = {};
            userInfo.currentEggId =
              this.$store.state.userInfo.currentEggId != ""
                ? this.$store.state.userInfo.currentEggId
                : 0;
            // userInfo.currentEggId = data.eggId[0];
            userInfo.walletAddress = data.walletAddress;
            userInfo.currentBabyId = data.babyId[0];
            userInfo.eggCount = data.eggCount;
            userInfo.babyCount = data.babyCount;
            // userInfo.eggs = data.eggId;
            this.eggIds = data.eggId;
            userInfo.eggId = data.eggId[0];
            userInfo.babyId = data.babyId[0];
            //  dna 未传过来 递归回去所有eggDna
            // userInfo.dna = data.dna;
            if (data.eggCount != 0) {
              this.getEggDNA(0);
              // this.$store.commit("setEggs", this.user_eggs);
            }

            // 更新userinfo数据
            this.$store.commit("setUserInfo", userInfo);

            // 由于上面提交操作存在延时，可能导致下面判断执行后，提交还没完成
            // 所以先加载一遍，2秒后在重新加载一遍
            this.selectDisplay();
            if (this.$store.state.userInfo.eggs.length === 0) {
              setTimeout(() => {
                this.selectDisplay();
              }, 200);
            }

            // 重置 inquireUserInfoFlag
            this.$store.commit("setInquireUserInfoFlag", false);
          },
          err => {
            console.error("getUserEggAndBabyCount fail");
            // 重置 inquireUserInfoFlag
            this.$store.commit("setInquireUserInfoFlag", false);
          }
        );
      } else {
        this.selectDisplay();
      }
    },

    /* 
      通过eggId递归获取所有eggDNA 
        所有eggId 都是从1开始，只有在访问eggs时，是从0开始。
    */
    getEggDNA(index) {
      ajax(
        "http://139.199.195.199:8888/getEggInfo",
        { eggId: this.eggIds[index] },
        data => {
          console.log("------eggInfo -------");
          console.log("------eegId -------" + this.eggIds[index]);
          console.log(JSON.stringify(data));
          // let user_eggs = [];
          let egg = {
            id: this.eggIds[index],
            dna: data.dna,
            owner: data.owner,
            shipFlag: "",
            collectionCount: data.collectionCount,
            shipPrice: data.shipPrice,
            shipFlag: data.shipFlag,
            collectionBy: ""
          };
          // egg.id = this.eggIds[index];
          // egg.dna = data.dna;
          this.user_eggs.push(egg);
          index++;
          if (index >= this.eggIds.length) {
            console.log("this.user_eggs===" + JSON.stringify(this.user_eggs));
            this.$store.commit("setEggs", this.user_eggs);
            return;
          } else {
            this.getEggDNA(index++);
          }
          // this.$store.commit("setEggs", this.user_eggs);
        },
        err => {
          console.error(err);
        }
      );
    },

    /*
     * 请求用户数据之后，判断页面的显示
     */
    selectDisplay() {
      // if (
      //   this.$store.state.userInfo.eggCount === 0 &&
      //   this.$store.state.userInfo.babyCount === 0
      // ) {
      //   console.log("i dont hava egg or baby");
      //   // 用户没有egg以及baby ==>  提示去获取egg
      //   this.contentInfo.imgSrc = require("../assets/img/egg2.png");
      //   // this.contentInfo.des = "Click on the picture to try your luck.";
      //   this.myFlag = 0;
      //   this.imgHeigth = 240;

      //   // if(this.$store.state.userInfo.babyImgSrc === ''){

      //   //     console.log("-----"+this.$store.state.userInfo.eggImgSrc);
      //   // }
      // } else if (
      if (
        this.$store.state.userInfo.eggCount > 0 &&
        this.$store.state.userInfo.babyCount === 0 &&
        !this.$store.state.userInfo.eggs[
          this.$store.state.userInfo.currentEggId
        ].shipFlag
      ) {
        // 用户拥有egg 但没有baby ===> 用户已经有了egg 但是还未孵化 ===> 可孵化
        this.contentInfo.imgSrc = require("../assets/img/egg.png");

        // 更新userinfo
        let userInfo_2 = {};
        // eggImgSrc 前面还需要加上"../assets/" 才是img的完整路径
        userInfo_2.eggImgSrc = "/img/egg.png";
        this.$store.commit("setUserInfo", userInfo_2);

        this.myFlag = 1;
        this.imgHeigth = 150;

        console.log("i  hava some  egg but no  baby");
      } else if (this.$store.state.userInfo.babyCount > 0) {
        // 用户已经孵化除了baby ===> 显示聊天，运势，任务等
        // 请求baby数据
        console.log("i hava babyId === " + this.$store.state.userInfo.babyId);

        //  当baby不再说话时，开启babyTalk
        if (!this.$store.state.babyTalk.isShow) {
          setTimeout(() => {
            this.$store.commit("setBabyTalk", {
              content: "主人，我有点饿了~~👀",
              isShow: true
            });
          }, 15000);

          setTimeout(() => {
            this.$store.commit("setBabyTalk", {
              content: "",
              isShow: false
            });
          }, 20000);
        }

        ajax(
          "http://139.199.195.199:8888/getBabyInfo",
          { babyId: this.$store.state.userInfo.babyId },
          data => {
            console.log("getBabyInfo request success");
            console.log(data);

            let userInfo_3 = {};

            userInfo_3.babyImgSrc = data.imgUrl;
            this.$store.commit("setUserInfo", userInfo_3);

            this.contentInfo.imgSrc = data.imgUrl;
            this.myFlag = 2;
            this.imgHeigth = 280;

            console.log("i  hava a baby");
          },
          err => {
            console.error("getBabyInfo request fail");
          }
        );
        // }
      } else {
        console.log("i dont hava egg or baby or the egg is saling");
        console.log(
          "当前使用的Egg = " + this.$store.state.userInfo.currentEggId
        );
        // 用户没有egg以及baby ==>  提示去获取egg
        this.contentInfo.imgSrc = require("../assets/img/egg2.png");
        // this.contentInfo.des = "Click on the picture to try your luck.";
        this.myFlag = 0;
        this.imgHeigth = 240;
      }
    },
    /* 
       孵化egg按鈕
    */
    goToHatch() {
      // this.toastText = "I am on the way, please wait for me. 🚀🚀🚀";
      // this.toastColor = "info";
      // this.$refs.toast.openSnackbat();

      this.$refs.hatch.toggleDialog();
    },
    // 孵化结束
    hatchEnd() {
      // 显示通知
      let userInfo = {
        userMessage: [
          {
            msg: "Cool 😎! You have hatched your own astrobaby, Enjoy it 😊",
            show: true
          }
        ]
      };
      this.$store.commit("setUserInfo", userInfo);

      // 设置baby讲话
      let babyTalk_1 = {
        content:
          "Hi，主人，贴心无所不知且独一无二的Astrobaby终于和你见面了！😄",
        isShow: true
      };
      this.$store.commit("setBabyTalk", babyTalk_1);

      // 30s后更换通知内容
      setTimeout(() => {
        let userInfo_2 = {
          // 设置Home 页面顶部通知
          userMessage: [
            {
              msg: "Now you can try clicking 'Chating' to chat with me! 😀",
              show: true
            },
            {
              msg:
                "Also try the 'Forecast' page to see your fortune and the chart.",
              show: true
            }
          ]
        };

        console.log("-------孵化30s 后 更新通知-------");
        this.$store.commit("setUserInfo", userInfo_2);
      }, 30000);

      // 5s后更换babyTalk内容
      setTimeout(() => {
        let babyTalk_2 = {
          content:
            "我会占星，会预测，以及超多好玩的技能，快去发掘我的潜能吧O(∩_∩)O 嘿嘿嘿",
          isShow: true
        };
        console.log("------- 更换babyTalk内容-------");
        this.$store.commit("setBabyTalk", babyTalk_2);
      }, 5000);

      //  15s 后关闭 babyTalk
      setTimeout(() => {
        this.$store.commit("setBabyTalk", { content: "", isShow: false });
      }, 15000);

      // this.$store.state.userInfo.userMessage[0].show;
      this.inquireUserInfo(true);

      // toast
      this.toastText = "Congratulations🎉 astrobaby Baby was born！！！";
      this.toastColor = "info";
      this.$refs.toast.openSnackbat();
    }
  }
};
</script>
