<template>
  <!-- <v-container fluid grid-list-xs> -->
  <div>
    <!-- 标题 -->
    <!-- <v-toolbar app height="50" scroll-target="#scrolling-techniques" v-scroll:#scrolling-techniques="onScroll" ref="scrolling"> -->
    <v-toolbar app height="50">
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title slot="extension" class="white--text">Title</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{tabs}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>-->
      <v-spacer></v-spacer>
      <v-tabs slot="extension" v-model="tabs" grow color="transparent" centered>
        <!-- <v-tabs-slider></v-tabs-slider> -->
        <!-- <v-tab   class="primary--text"> -->
        <v-tab href="#Egg Market" class="primary--text">
          <v-icon>local_mall</v-icon>
        </v-tab>
        <!-- <v-tab   class="primary--text"> -->
        <v-tab href="#My Eggs" class="primary--text">
          <v-icon>child_friendly</v-icon>
          <!-- <v-icon>insert_emoticon</v-icon> -->
        </v-tab>
        <!-- <v-tab href="#mobile-tabs-5-3" class="primary--text">
          <v-icon>account_box</v-icon>
        </v-tab>-->
      </v-tabs>
    </v-toolbar>

    <!-- 可进行抽蛋通知 -->
    <!-- luckLotteryNotice -->
    <v-card hover v-if="this.$store.state.userInfo.luckylotteryNotice.show === true">
      <v-layout justify-center row>
        <v-flex d-flex xs1>
          <v-icon>info</v-icon>
        </v-flex>
        <v-flex d-flex xs11>
          <h5
            class="text-sm-left"
            @click="enterName"
          >{{this.$store.state.userInfo.luckylotteryNotice.msg}}</h5>
          <!--  截断过长文字-->
          <!-- <h6 class="text-truncate">{{msg.content}}</h6> -->
        </v-flex>
      </v-layout>
    </v-card>

    <v-tabs-items v-model="tabs" class="white elevation-1">
      <!-- egg market -->
      <!-- <v-tab-item id="Egg Market"  v-on:scroll.passive="onScroll" ref="chatContainer"> -->
      <v-tab-item id="Egg Market">
        <!-- <v-card>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>-->
        <!-- 刷新操作 -->
        <!-- <div class="chat-container" v-on:scroll="onScroll" ref="marketContainer"></div> -->
        <!-- 滑动懒加载 TODO -->
        <v-layout class="market-container">
          <v-container grid-list-lg fluid>
            <v-layout justify-center align-center>
              <v-icon size="10px" @click="onScroll()">refresh</v-icon>
            </v-layout>
            <v-layout row v-for="(items,index) in marketEggs" :key="index">
              <!-- <v-layout row v-for="a in 5" :key="a"> -->
              <v-flex xs6 v-for="item in items" :key="item.id">
                <!-- <v-flex xs6 v-for="b in 2" :key="b"> -->
                <v-card>
                  <!-- <v-subheader class="black--text caption" v-text=" 1*b+2*a -2 "></v-subheader> -->
                  <v-subheader class="black--text caption">ID : {{item.id}}</v-subheader>
                  <v-img contian heigth="100" :src="eggImg">
                    <!-- <v-subheader class="white--text " v-text=" `#123124`"></v-subheader> -->
                  </v-img>
                  <!-- <v-card-title primary-title>
                    <div class="headline">Unlimited music now</div>
                    <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                  </v-card-title>-->
                  <v-layout row>
                    <v-flex xs6>
                      <!-- <v-btn flat icon color="pink" @click="favoriteEgg()" v-if="currentEggId == index"> -->
                      <!-- <v-btn flat icon color="pink" @click="favoriteEgg(item.id)" v-if="currentEggId == item.id">
                        <v-icon small>favorite</v-icon>
                      </v-btn>-->
                      <v-btn
                        flat
                        icon
                        @click="favoriteEgg(item.id)"
                        v-if="favoriteId.indexOf(item.id) ===-1"
                      >
                        <v-icon small>favorite_border</v-icon>
                      </v-btn>
                      <v-btn flat icon color="pink" @click="favoriteEgg(item.id)" v-else>
                        <v-icon small>favorite</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs1>
                      <v-btn flat icon @click="openBuyEgg(item.id , item.shipPrice)">
                        <v-icon small>attach_money</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader
                        @click="openBuyEgg(item.id , item.shipPrice)"
                        class="caption"
                      >{{item.shipPrice}}</v-subheader>
                    </v-flex>
                    <!-- 被收藏蛋的数量以及原布局 -->
                    <!-- <v-flex xs4>
                      <v-subheader @click="favoriteEgg" class="caption">{{item.collectionCount}}</v-subheader>
                    </v-flex>-->
                    <!-- </v-layout><v-layout row>-->
                    <!-- <v-flex xs2>
                      <v-btn flat icon @click="openBuyEgg(item.id , item.shipPrice)">
                        <v-icon small>attach_money</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader
                        @click="openBuyEgg(item.id , item.shipPrice)"
                        class="caption"
                      >{{item.shipPrice}}</v-subheader>
                    </v-flex>-->
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            <div class="endFront">
              <span>no more</span>
            </div>
          </v-container>
        </v-layout>
      </v-tab-item>

      <!-- my eggs -->
      <v-tab-item id="My Eggs">
        <!-- <v-card :height="(displayHeight.y - 200)"> -->
        <v-card :min-height="displayHeight" hover>
          <!-- <v-img :src="enterImgSrc" aspect-ratio="1.5" contain></v-img> -->
          <v-card>
            <v-card-text>
              <p class="text-xs-center">Total egg : {{totalEgg}}</p>
            </v-card-text>
          </v-card>
          <!-- <v-card > -->
          <v-card
            v-for="(c,index) in this.$store.state.userInfo.eggs "
            :key="index"
            v-if="totalEgg > 0"
            class="mt-1 mb-1"
          >
            <v-card-title class="red--text">
              #ID : {{c.id}}
              <br>
              #DNA : {{c.dna}}
            </v-card-title>
            <v-img :src="eggImg" contain aspect-ratio="1" height="100"></v-img>
            <v-layout row>
              <!-- 被收藏数量 暂时不需要-->
              <!-- <v-flex xs1>
                <v-btn flat icon @click="favoriteEgg()">
                  <v-icon small>favorite</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs9>
                <v-subheader class="caption">{{c.collectionCount}}</v-subheader>
              </v-flex>-->
              <!-- 激活此egg 原布局-->
              <!-- <v-flex xs8>
                <v-btn
                  flat
                  icon
                  color="pink"
                  @click="useTheEgg(index)"
                  v-if="currentEggId == index"
                >
                  <v-icon small>filter_vintage</v-icon>
                </v-btn>
                <v-btn flat icon @click="useTheEgg(index)" v-else>
                  <v-icon small>filter_vintage</v-icon>
                </v-btn>
              </v-flex>-->
              <!-- 激活此egg -->
              <v-flex xs1>
                <v-btn
                  flat
                  icon
                  color="pink"
                  @click="useTheEgg(index)"
                  v-if="currentEggId == index"
                >
                  <v-icon small>filter_vintage</v-icon>
                </v-btn>
                <v-btn flat icon @click="useTheEgg(index)" v-else>
                  <v-icon small>filter_vintage</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs9>
                <v-subheader v-if="currentEggId == index" class="caption">current egg</v-subheader>
              </v-flex>
              <!-- 售卖 -->
              <v-flex xs1>
                <v-btn flat icon>
                  <!-- <v-btn flat icon @click="buyEgg"> -->
                  <v-icon small @click="shelfShop(c.id,c.shipFlag)">attach_money</v-icon>
                  <!-- Selling? -->
                </v-btn>
              </v-flex>
              <v-flex xs8 @click="shelfShop(c.id,c.shipFlag)">
                <v-subheader class="caption" v-if="!c.shipFlag">Unauthorized sale</v-subheader>
                <v-subheader class="caption" v-else>{{c.shipPrice}}</v-subheader>
              </v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- 抽蛋模态框 -->
    <v-layout>
      <v-dialog v-model="dialog" persistent max-width="320">
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
          <v-card-title class="headline">You will participate in the extraction of Astroegg</v-card-title>
          <v-card-text>Next we will temporarily freeze one of your abc, please make sure there is enough balance. If you don't win, we will return the abc to you.Otherwise, don't return abc</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="enterName('Disagree')">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click.native="enterName('Agree')">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 下架模态框 -->
      <v-dialog v-model="dialog_obtained" persistent max-width="320">
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
          <v-card-text>Are you sure you want to take the egg off the shelf?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="dialog_obtained = false">No</v-btn>
            <v-btn color="green darken-1" flat @click.native="Obtained('Agree')">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 上架egg模态框 -->
      <v-dialog v-model="dialog_shelfegg" persistent max-width="320">
        <v-card>
          <v-img :src="dialogImg" aspect-ratio="2" contain>
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate></v-progress-circular>
            </v-layout>
          </v-img>
          <v-text-field
            name="SalePrice"
            v-model="salePrice"
            label="ABC"
            :counter="10"
            required
            clearable
            prepend-icon="attach_money"
          ></v-text-field>
          <span class="caption grey--text text--darken-1">Enter the sale price that you want</span>
          <v-card-text>Really want to sell this egg?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="shelfShop('Disagree')">No</v-btn>
            <v-btn color="green darken-1" flat @click.native="shelfShop('Agree')">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 公共模态框 -->
      <commonDialog
        :dialogFlag="commomDialogObj.flag"
        :headline="commomDialogObj.headline"
        :content="commomDialogObj.content"
        :leftOption="commomDialogObj.leftOption"
        :rightOption="commomDialogObj.rightOption"
        v-on:btnClick="commonDialogClick"
      />
      <!-- 底部通知的用法 -->
      <toast :color="toastColor" :text="toastText" ref="toast"/>
    </v-layout>
  </div>
  <!-- </v-container> -->
</template>

<script>
import ajax from "../assets/js/ajax";
import toast from "./dialogs/Toast";
import babyHome_content from "../components/babyHome_content";
import commonDialog from "../components/dialogs/commonDialog";

export default {
  props: [],
  // props: ["displayHeight"],
  data() {
    return {
      // 公共模态框
      commomDialogObj: {
        flag: false,
        headline: "",
        content: "",
        leftOption: "No",
        rightOption: "Yes"
      },

      // 暂存将被购买的Egg
      tempEgg: {},
      // eggId: this.$store.state.userInfo.eggs[0].id,
      // eggDNA: this.$store.state.userInfo.dna,
      displayHeight: 0,
      // totalEgg: this.$store.state.userInfo.eggCount,
      toastColor: "success",
      toastText: "",
      dialog: false,
      //下架模态框
      dialog_obtained: false,
      // 上架egg模态框
      dialog_shelfegg: false,
      // 上架egg 设置的售卖价格
      salePrice: "",
      // 待售卖的egg对象
      soldForSale: {
        eggId: "",
        shipFlag: "",
        shipPrice: ""
      },

      enterImgSrc: require("../assets/img/shuangzi.png"),
      dialogImg: require("../assets/img/tiancheng.png"),
      eggImg: require("../assets/img/egg1.png"),

      tabs: ""
    };
  },
  components: {
    toast,
    commonDialog
  },
  mounted() {
    this.displayHeight = document.getElementsByClassName(
      "v-content__wrap"
    )[0].offsetHeight;

    // // 获取所有在售eggID
  },
  computed: {
    totalEgg: function() {
      return this.$store.state.userInfo.eggCount;
    },
    marketEggs: function() {
      // 拼接需要显示的marketEggs 二维数组
      let tempMarketEgg = "[";
      let tempItem = [];
      let stateMarketEgg = this.$store.state.marketEggs;

      let beforeIndex = 0;
      for (let index = 0; index < stateMarketEgg.length; index++) {
        if (index <= beforeIndex + 1) {
          tempItem.push(stateMarketEgg[index]);
        } else {
          // tempMarketEgg.push(tempItem);
          tempMarketEgg += JSON.stringify(tempItem) + ",";
          // console.log("tempItem = " + JSON.stringify(tempItem));
          // console.log("tempMarketEgg = " + JSON.stringify(tempMarketEgg));
          // console.log("tempMarketEgg length = " + tempMarketEgg.length);
          tempItem.splice(0, tempItem.length);
          tempItem.push(stateMarketEgg[index]);
          beforeIndex = index;
        }
      }
      if (tempItem.length > 0) {
        tempMarketEgg += JSON.stringify(tempItem) + ",";
      }

      tempMarketEgg = tempMarketEgg.substring(0, tempMarketEgg.length - 1);
      tempMarketEgg += "]";

      // console.log("重构的数组 --- " + tempMarketEgg);

      // console.log("重构的数组 --- " + JSON.stringify(tempMarketEgg[10]));
      // console.log("重新计算marketEggs    " + tempMarketEgg);
      return JSON.parse(tempMarketEgg);
    },
    currentEggId: function() {
      return this.$store.state.userInfo.currentEggId;
    },
    favoriteId: function() {
      return this.$store.state.userInfo.collectionId;
    }
  },
  methods: {
    //滑动加载
    onScroll() {
      // 获取所有在售eggID
      this.$store.dispatch("getAllMarketEgg");
      console.log("刷新后：" + JSON.stringify(this.$store.state.marketEggs));
    },
    // 公共模态框触发事件
    commonDialogClick(val) {
      console.log("公共模态框 点击 -- " + val);

      if (
        this.commomDialogObj.headline ==
          "Are you sure you want to buy this Egg?" &&
        val == "right"
      ) {
        this.buyEgg("Agree");
      }

      this.commomDialogObj.headline = "";
      this.commomDialogObj.flag = false;
    },

    // 延时函数
    mySleep(sleepTime) {
      let start = new Date().getTime();
      while (true) {
        if (new Date().getTime() - start > sleepTime) {
          break;
        }
      }
    },

    // 打开购买egg对话框
    openBuyEgg(eggId, shipPrice) {
      this.tempEgg.eggId = eggId;
      this.tempEgg.shipPrice = shipPrice;
      // this.dialog = !this.dialog;
      // this.dialog_buyegg = true;
      this.commomDialogObj.flag = true;
      this.commomDialogObj.headline = "Are you sure you want to buy this Egg?";
      this.commomDialogObj.content =
        "Your account will be deducted " +
        this.tempEgg.shipPrice +
        " abc! Have you decided yet?";
    },
    // 购买egg
    buyEgg(val) {
      if (val === "Agree") {
        this.toastText = " Cool! You got it now!";
        this.toastColor = "info";
        this.$refs.toast.openSnackbat();
        // let obj = {
        //   eggId: this.tempEgg.eggId,
        //   shipPrice: this.tempEgg.shipPrice
        // };
        this.$store.dispatch("buyEggFromMarket", this.tempEgg);
      }
      // this.dialog_buyegg = false;
    },
    // 收藏egg
    favoriteEgg(val) {
      // this.dialog = !this.dialog;
      this.$emit("updateLottery");
      this.$store.commit("CollectionId", val);
      // this.$store.commit("favoriteEgg",val);
      // this.toastText = " You like it ❤";
      // this.toastColor = "info";
      // this.$refs.toast.openSnackbat();
    },
    changeTab(val) {
      console.log("changeTab");
      this.tabs = val;
    },

    // 使用此egg 孵化
    useTheEgg(eggIndex) {
      //
      if (!this.$store.state.userInfo.eggs[eggIndex].shipFlag) {
        this.$store.commit("setCurrentEggId", eggIndex);
        // console.log("使用 第" + eggIndex + " 个蛋");
      } else {
        // console.log("已经上架了，不可以再使用");
      }
    },

    // 报名抽取
    enterName(val) {
      this.dialog = !this.dialog;
      // console.log(val);
      if (val === "Agree") {
        let addr = this.$store.state.userInfo.walletAddress;
        console.log(addr);
        this.lotteryEnroll(addr);
      }

      // this.toastText = "hello"
      // this.$refs.toast.openSnackbat();
    },

    // 抽奖结果
    lotteryEnroll(userWallet) {
      ajax(
        "http://139.199.195.199:8888/lotteryEnroll",
        { walletAddress: userWallet },
        data => {
          console.log(data);
          if (data.result === false) {
            // alert("报名失败");
            this.toastText = "Registration failed 😭 Please try again.";
            this.toastColor = "error";

            //        有可以能是某个用户报名后开奖失败，导致之后无法报名，
            //        直接调用服务器开奖服务
            axios
              .post("http://139.199.195.199:8888/lotterySettlement")
              .then(response => {
                console.log("-=======直接调用服务器开奖服务========-");
                console.log(response.data);
              })
              .catch(error => {
                console.error("-=======直接调用服务器开奖服务========-");
                console.error(error);
              });

            // this.$refs.toast.openSnackbat();
          } else {
            // alert("报名成功");
            // this.$emit("updateLottery");

            /*  
              延时半秒
            */
            this.mySleep(500);

            // 查询用户eggId
            ajax(
              "http://139.199.195.199:8888/getUserEggsId",

              { username: this.$store.state.userInfo.username },
              data => {
                console.log("==========getUserEggsId=============");
                console.log(data);
                let deleteId;
                for (let item in data) {
                  if (parseInt(data[item]) == 0) {
                    console.log(" if in s ");
                    deleteId = item;
                    break;
                  }
                }
                let index =
                  parseInt(
                    deleteId.substring(deleteId.length - 1, deleteId.length)
                  ) - 1;

                console.log("eeg_" + index);
                console.log("deleteId = " + data["eeg_" + index]);
                this.$store.commit("deleteEggFromMarket", data["eeg_" + index]);
              },
              err => {
                console.error("getUserEggsId error");
              }
            );

            // 更新userInfo的eggCount 数据,
            let userInfo = {};
            userInfo.eggCount = this.$store.state.userInfo.eggCount;
            userInfo.eggCount += 1;
            this.$store.commit("setUserInfo", userInfo);

            this.toastText =
              "Cool registration success!😎 There is no instant page yet, so you won the prize directly.";
            this.toastColor = "success";

            this.$store.commit("setInquireUserInfoFlag", true);
          }
          this.$refs.toast.openSnackbat();
        },
        err => {
          console.error("lotteryEnroll请求失败");
        }
      );
    },

    // 将egg上架market
    shelfShop(eggId, shipFlag) {
      console.log("Really want to sell this egg?" + eggId + " , " + shipFlag);

      // if (shipFlag != undefined) {
      if (!shipFlag && shipFlag != undefined) {
        // 上架的点击
        this.soldForSale.eggId = eggId;
        this.soldForSale.shipFlag = shipFlag;
        console.log("准备上架点击");
      } else if (shipFlag) {
        this.soldForSale.eggId = eggId;
        this.soldForSale.shipFlag = shipFlag;
        console.log("准备下架点击");

        this.dialog_obtained = !this.dialog_obtained;

        // this.toastText = " You have successfully removed this egg from the Market.✔";
        // this.toastColor = "info";
        // this.$refs.toast.openSnackbat();

        // this.$store.dispatch("Obtained", this.soldForSale);
        return;
      } else if (
        eggId == "Agree" &&
        this.salePrice != "" &&
        !this.soldForSale.shipFlag
      ) {
        // 模态框中的选项点击 -- 填写了价格，且同意
        console.log("同意售卖");
        this.soldForSale.shipPrice = this.salePrice;
        this.$store.dispatch("shelfShop", this.soldForSale);
      } else {
        // 点击了不同意，或者 未填写售卖价格
        console.log("不同意售卖");
      }

      this.dialog_shelfegg = !this.dialog_shelfegg;
    },
    // 将egg下架market
    Obtained(eggId, shipFlag) {
      if (eggId == "Agree") {
        //同意下架
        this.$store.dispatch("Obtained", this.soldForSale);
        this.dialog_obtained = false;
        this.toastText = " You have successfully removed this egg from the Market.✔";
        this.toastColor = "info";
        this.$refs.toast.openSnackbat();
      } else {
        console.log("我再考虑考虑");
      }
    }
  }
};
</script>


<style>
.endFront {
  text-align: center;
  align-content: center;
}
</style>
