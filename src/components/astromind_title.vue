<template>
  <v-layout align-center justify-center row fill-height>
    <v-toolbar app flat light height="60">
      <v-btn icon @click="settingClick" v-if="this.showMenu  === true">
        <v-icon color="gray">menu</v-icon>
      </v-btn>
      <v-spacer v-else></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-italic font-weight-bold">{{this.titleContent}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-toolbar>
    <toast :color="toastColor" :text="toastText" ref="toast"/>
    <!-- 侧边栏-->
    <v-navigation-drawer v-model="drawer" temporary app light width="250">
      <v-list class="pa-1">
        <v-list-tile avatar ripple @click.native="dialog = true">
          <!-- 头像入口 -->
          <v-list-tile-avatar>
            <img :src="avatarImg">
            <!-- <img :src="this.$store.state.userInfo.babyImgSrc"> -->
            <!-- <img src="../assets/img/me-portrait.png"> -->
          </v-list-tile-avatar>
          <!-- 用户名 -->
          <v-list-tile-content>
            <v-list-tile-title>{{this.$store.state.userInfo.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <!-- collection -->
        <v-list-tile v-model="dialog4" ripple>
          <v-list-tile-action>
            <v-icon>stars</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="dialog4 = true">
            <v-list-tile-title>Collection</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <!-- wallet -->
        <v-list-tile v-model="dialog5" ripple>
          <v-list-tile-action>
            <v-icon>account_balance_wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="openDialog5">
            <v-list-tile-title>Wallet</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- FAQ -->
        <v-list-tile v-model="dialog3" ripple>
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="dialog3 = true">
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- go to lottery -->
        <v-list-tile @click="toggleLottery" ripple>
          <v-list-tile-action>
            <v-icon>adjust</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Luck draw switch</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- about -->
        <v-list-tile v-model="dialog7" ripple>
          <v-list-tile-action>
            <v-icon>textsms</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="dialog7 = true">
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- help -->
        <v-list-tile v-model="dialog8" ripple>
          <v-list-tile-action>
            <v-icon>priority_high</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="dialog8 = true">
            <v-list-tile-title>Help</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="ShowAds()" ripple>
          <v-list-tile-action>
            <v-icon>stay_current_portrait</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>showMeTheAds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- 需添加退出应用函数exit(),在method里面 -->
        <v-list-tile @click="exit()" ripple>
          <v-list-tile-action>
            <v-icon>reply</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Quit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- 点击头像 -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-layout column fill-height>
          <!-- 标题栏 -->
          <v-toolbar flat light height="50">
            <v-btn icon @click.native="dialog = false">
              <v-icon color="gray">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-flex xs12>
            <v-card flat :height="displayHeight">
              <v-card-text>
                <v-flex xs12>
                  <!-- 需要传入用户的头像，在data里面的userImg处 -->
                  <v-list-tile-avatar size="60">
                    <v-img :src="avatarImg"></v-img>
                    <!-- <v-img :src="require('../assets/img/me-portrait.png')"></v-img> -->
                  </v-list-tile-avatar>
                </v-flex>
                <v-flex xs12>
                  <!-- 需要传入用户名 -->
                  <!-- <v-card-text @click="dialog1 = true">
                    {{this.$store.state.userInfo.username}}
                  </v-card-text>-->
                  <!-- <span class="title">change your username</span> -->
                  <v-text-field label="new username"></v-text-field>
                  <v-spacer></v-spacer>
                  <small>you can change your username</small>
                </v-flex>
                <v-flex xs12>
                  <!-- 需要传入用户密码 -->
                  <!-- {{}} -->
                  <!-- <v-card-text @click="dialog2 = true">
                  </v-card-text>-->
                  <v-text-field label="new password"></v-text-field>
                  <small>you can change your password</small>
                </v-flex>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-card-text>
                  <!-- 需要添加注销账号logOut(),在method里面 -->
                  <!-- <v-icon @click.native="logOut()">power_settings_new</v-icon>logout -->
                  <v-icon @click.native="dialog_logout = !dialog_logout">power_settings_new</v-icon>logout
                </v-card-text>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
      <!-- 注销提示弹窗 -->
      <v-dialog v-model="dialog_logout" persistent max-width="320">
        <v-card>
          <v-img
            :src="dialogImg"
            :lazy-src="`https://picsum.photos/10/6?image=20`"
            aspect-ratio="2"
            contain
          >
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate></v-progress-circular>
            </v-layout>
          </v-img>
          <v-card-text>Are you sure you want to log out? Logging out will log out your account information.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="dialog_logout = false">No</v-btn>
            <v-btn color="green darken-1" flat @click.native="logOut()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 点击用户名dialog1 -->
      <v-dialog v-model="dialog1" full-width>
        <v-layout wrap justify-center align-center>
          <v-card>
            <v-card-title>
              <span class="title">change your username</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-text-field label="new username"></v-text-field>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-layout justify-center align-center>
              <v-btn color="primary" flat @click="dialog1 = false">Save</v-btn>
            </v-layout>
          </v-card>
        </v-layout>
      </v-dialog>
      <!-- 点击密码dialog2 -->
      <v-dialog v-model="dialog2" full-width>
        <v-layout wrap justify-center align-center>
          <v-card>
            <v-card-title>
              <span class="title">change your password</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-text-field label="new password"></v-text-field>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-layout justify-center align-center>
              <v-btn color="primary" flat @click="dialog2 = false">Save</v-btn>
            </v-layout>
          </v-card>
        </v-layout>
      </v-dialog>
      <!-- collection dialog4 -->
      <v-dialog v-model="dialog4" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card flat>
          <v-toolbar flat light height="50">
            <v-btn icon @click.native="dialog4 = false">
              <v-icon color="gray">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-layout justify-center align-center>
            <v-card-title class="title font-weight-regular justify-space-between">
              <span>my collection</span>
            </v-card-title>
          </v-layout>
          <v-card v-for="(item,index) in setFavoriteEggs" :key="index" class="mt-2 mb-2">
            <v-card-text class="black--text text-truncate">
              ID:{{item.id}}
              <br>
              DNA:{{item.dna}}
              <br>
              Owner:{{item.owner}}
              <br>ShipPrice:
              <v-icon small>attach_money</v-icon>
              {{item.shipPrice}}
            </v-card-text>
            <v-divider></v-divider>
            <v-img :src="eggImg" contain aspect-ratio="1" height="100"></v-img>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog4 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
        <!-- </v-layout> -->
      </v-dialog>
      <!-- wallet dialog5 -->
      <v-dialog
        v-model="dialog5"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-layout column fill-height>
          <v-toolbar flat light height="50">
            <v-btn icon @click.native="dialog5 = false">
              <v-icon color="gray">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-flex xs12>
            <v-card :height="displayHeight">
              <v-card-title>
                <v-img :src="wallet"></v-img>
              </v-card-title>
              <v-list two-line subheader>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>钱包地址</v-list-tile-title>
                    <v-list-tile-sub-title>{{this.$store.state.userInfo.walletAddress}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>账户余额</v-list-tile-title>
                    <!-- 需添加账户余额信息 -->
                    <!-- <v-list-tile-sub-title>{{}}</v-list-tile-sub-title> -->
                    <v-list-tile-sub-title>ABC : {{balanceOf}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog5 = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
      <!--FAQ dialog3 -->
      <v-dialog
        v-model="dialog3"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-layout column fill-height>
          <v-toolbar flat light height="50">
            <v-btn icon @click.native="dialog3 = false">
              <v-icon color="gray">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-flex xs12>
            <v-card :height="displayHeight">
              <v-card-text>
                <v-expansion-panel>
                  <v-expansion-panel-content v-for="item in text" :key="item.index">
                    <div slot="header">{{item.question}}</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">{{item.answer}}</v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog3 = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>

      <!-- about dialog7 -->
      <v-dialog
        v-model="dialog7"
        fullscreen
        transition="dialog-bottom-transition"
        style="background-color: white;"
      >
        <v-card>
          <v-toolbar flat light height="50">
            <v-btn icon @click.native="dialog7 = false">
              <v-icon color="gray">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-title>
            <v-img :src="about"></v-img>
          </v-card-title>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="(item,i) in items" :key="i">
                <div slot="header">{{item.title}}</div>
                <v-card-text
                  v-if="i == 0 || i == 2 || i == 3"
                  class="grey lighten-3"
                >{{item.content}}</v-card-text>
                <v-img v-if="i == 1" :src="join"></v-img>
                <v-btn v-if="i == 4" color="red darken-1" flat>update</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog7 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- help dialog8 -->
      <v-dialog v-model="dialog8" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-layout column fill-height :height="displayHeight">
          <v-toolbar flat light height="50">
            <v-btn icon @click.native="dialog8 = false">
              <v-icon color="gray">close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-flex xs12>
            <v-flex xs12>
              <v-card class="mx-auto" flat :height="displayHeight">
                <v-card-title class="title font-weight-regular justify-space-between">
                  <span>help</span>
                </v-card-title>
                <v-btn color="primary" flat @click="dialog8 = false">Close</v-btn>
              </v-card>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-dialog>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
/* 
  参数:
            showMenu: 是否显示设置按钮
            titleContent：标题内容 (现在是“astromind”)
            eg：<babyHome_titile :showMenu="true" :titleContent="`Astromind`"/>
                不显示设置按钮，标题名为“astromind”

*/
/*
修改：
            1、dialog弹窗的书写位置
            2、需要传入的参数在上面改成了类似于{{}}，exit(),下面也做了相应注释

*/

import toast from "./dialogs/Toast";
import faqTest from "./const/FAQConst.js";
import ajax from "../assets/js/ajax";
import Vue from "vue";
// import collection from "./market/collection"

export default {
  props: ["showMenu", "titleContent"],
  // props: ["themeColor"],
  data() {
    return {
      // 账户余额
      balanceOf: "",
      // 通知颜色
      toastColor: "success",
      // 通知内容
      toastText: "",
      drawer: null,
      text: faqTest,
      // 需要传入用户的头像
      // userImg: require("../assets/img/me-portrait.png"),
      eggImg: require("../assets/img/egg1.png"),
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      dialog_logout: false,
      items: [
        { title: "Version", content: "0.3.1" },
        {
          title: "Join us",
          content: "",
          url: require("../assets/img/astromind.png")
        },
        {
          title: "Open source license",
          content:
            "The MIT License (MIT) Copyright (c) 2013-present, Yuxi (Evan) You Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'),to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
        },
        { title: "Service agreement", content: "" },
        { title: "New version update" }
      ],
      displayHeight: 0,
      displayHeight1: 0,
      dialogImg: require("../assets/img/tiancheng.png"),
      wallet: require("../assets/img/wallet1.png"),
      about: require("../assets/img/about_us.png"),
      join: require("../assets/img/astromind.png")
    };
  },

  components: {
    toast
    // market_title,
    // collection
  },
  mounted() {
    this.displayHeight = document.body.clientHeight;
  },
  computed: {
    avatarImg() {
      let img = this.$store.state.userInfo.babyImgSrc;
      return img == "" ? require("../assets/img/me-portrait.png") : img;
    },
    // 向favoriteEggs里面添加egg信息
    setFavoriteEggs: function() {
      let favoriteEggs = [];
      for (let i = 0; i < this.$store.state.userInfo.collectionId.length; i++) {
        for (let j = 0; j < this.$store.state.marketEggs.length; j++) {
          if (
            this.$store.state.userInfo.collectionId[i] ==
            this.$store.state.marketEggs[j].id
          ) {
            favoriteEggs.push(this.$store.state.marketEggs[j]);
          }
        }
      }
      return favoriteEggs;
    }
  },
  methods: {
    // 显示通知
    toggleLottery() {
      // 更新userinfo数据
      this.$store.commit(
        "setLuckylotteryNotice",
        !this.$store.state.userInfo.luckylotteryNotice.show
      );
      if (this.$store.state.userInfo.luckylotteryNotice.show) {
        this.toastText =
          "luck draw switch open, go to the market and have a look.";
        this.toastColor = "info";
        this.$refs.toast.openSnackbat();
      } else {
        this.toastText = "luck draw switch OFF";
        this.toastColor = "info";
        this.$refs.toast.openSnackbat();
      }
    },
    /* 
  设置按钮点击
 */
    settingClick() {
      // this.toastText = "I am on the way, please wait for me. 🚀🚀🚀";
      // this.toastColor = "info";
      // this.$refs.toast.openSnackbat();
      this.drawer = !this.drawer;
    },
    openDialog5() {
      this.dialog5 = true;
      // 查询余额
      ajax(
        "http://139.199.195.199:8888/balanceOf",
        {
          walletAddress: this.$store.state.userInfo.walletAddress
        },
        data => {
          console.log("request  balanceOf success");
          this.balanceOf = data.balance;
        },
        err => {
          console.error("request  balanceOf fail");
          this.balanceOf = "something error";
        }
      );
    },

    // 设置列表item点击
    itemClick(val) {},
    //  注销账号
    logOut() {
      // this.$router.push("/welcome");
      // navigator.app.exitApp();
      this.$emit("logout");
    },
    /* 
        退出应用
      */
    exit() {
      // navigator.app.exitApp();
      this.$emit("exitApp");
    },
    showAds() {
      AdMob.prepareInterstitial({
        adId: "ca-app-pub-3940256099942544/1033173712", //全屏广告id
        autoshow: false
      });
    }
  }
};
</script>

<style>
#dev_1 {
  text-align: center;
}
</style>

