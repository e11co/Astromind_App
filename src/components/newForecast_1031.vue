<template>
    <div>
        <!-- 头部导航栏 -->
        <v-toolbar app flat light height="55">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-tabs slot="extension" v-model="tab" color="gray" grow v-if="!isError">
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item" class="font-weight-bold" grow>{{ item }}</v-tab>
            </v-tabs>
        </v-toolbar>
        <!-- 导航栏对应的内容 -->
        <v-tabs-items v-model="tab" grow v-if="!isError">
            <v-tab-item v-for="item in items" :key="item">
                <!-- Today -->
                <div v-if="tab==0">
                    <v-flex xs12>
                        <v-card>
                            <v-layout>
                                <v-flex xs3 align-center justify-center text-xs-center>
                                    <v-avatar size="58">
                                        <v-img :src="img"></v-img>
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs9 align-center justify-center text-xs-center>
                                    <v-card-text
                                        class="headline font-weight-regular"
                                    >{{constellation}}</v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-divider light></v-divider>
                            <div
                                class="body-2 regular"
                                style="margin:12px;letter-spacing:0.3px;text-indent:20px"
                            >{{analysis}}</div>
                        </v-card>
                    </v-flex>
                    <v-flex v-for="item in ratings" :key="item.index">
                        <v-flex xs12 class="mb-2">
                            <v-card>
                                <v-layout>
                                    <v-card-title>
                                        <div class="subheading">{{item.title}}</div>
                                    </v-card-title>
                                </v-layout>
                                <v-divider light></v-divider>
                                <div>
                                    <v-rating v-model="item.rating" readonly>{{item.rating}}</v-rating>
                                </div>
                            </v-card>
                        </v-flex>
                    </v-flex>
                     <v-flex xs12 class="mb-2">
                        <v-card>
                            <v-layout>
                                <v-card-title>
                                    <div class="subheading">Lucky number</div>
                                </v-card-title>
                            </v-layout>
                            <v-divider light></v-divider>
                            <!-- <div style="background-color:skyblue"> -->
                            <div class="body-1" style="margin-left:15px">{{number}}</div>
                            <!-- </div> -->
                        </v-card>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                        <v-card>
                            <v-layout>
                                <v-card-title>
                                    <div class="subheading">Lucky color</div>
                                </v-card-title>
                            </v-layout>
                            <v-divider light></v-divider>
                            <div
                                class="body-1 font-weight-medium"
                                style="margin-left:15px"
                            >{{color}}</div>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                        <v-card>
                            <v-layout>
                                <v-card-title>
                                    <div class="subheading">Couples</div>
                                </v-card-title>
                            </v-layout>
                            <v-divider light></v-divider>
                            <!-- <div style="background-color:skyblue"> -->
                            <div
                                class="body-1 font-weight-medium"
                                style="margin-left:15px"
                            >{{couple}}</div>
                            <!-- </div> -->
                        </v-card>
                    </v-flex>
                    <v-flex xs12 class="mb-2">
                        <v-card>
                            <v-layout>
                                <v-card-title>
                                    <div class="subheading">Health</div>
                                </v-card-title>
                            </v-layout>
                            <v-divider light></v-divider>

                            <div class="body-1">
                                <v-slider
                                    v-model="value_1"
                                    thumb-color="red lighten-2"
                                    :thumb-size="24"
                                    thumb-label="always"
                                    readonly
                                ></v-slider>
                            </div>
                        </v-card>
                    </v-flex>
                </div>
                <!-- Compatibility -->
                <div v-else-if="tab==1">
                    <v-flex xs12>
                        <v-card>
                            <v-layout>
                                <v-flex xs3 align-center justify-center text-xs-center>
                                    <v-avatar size="58">
                                        <v-img :src="img"></v-img>
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs9 align-center justify-center text-xs-center>
                                    <v-card-text
                                        class="headline font-weight-regular"
                                    >{{constellation}}</v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-divider light></v-divider>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-img :src="astrolabe" contain></v-img>
                    </v-flex>
                </div>
                <!-- Profile -->
                <!-- <div v-else>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-list two-line subheader>
                            <v-list-tile v-for="item in icons" :key="item.title" avatar @click>
                                <v-list-tile-avatar>
                                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider inset></v-divider>
                            <v-subheader
                                inset
                                class="headline font-weight-light"
                                style="color:black;"
                            >Famous {{constellation}}</v-subheader>
                            <v-card>
                                <v-list-tile v-for="item in icons2" :key="item.title" avatar @click>
                                    <v-list-tile-avatar>
                                        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                                        <img :src="item.stars">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-card>
                        </v-list>
                    </v-flex>
                </div>-->
            </v-tab-item>
        </v-tabs-items>
        <error_empty :imgsrc="`empty1.jpg`" :errmsg="errormsg" v-on:refresh="refresh" v-else/>
    </div>
</template>
<script>
import jsonp from "jsonp";
import ajax from "../assets/js/ajax";
import error_empty from "./404/errorPage";
/* 
    修改：1.v-if="tab==0",v-if="tab==1"
         <v-layout>
            <v-flex xs6 align-center justify-center text-xs-center>
                        <v-avatar size="58">
                            <v-img :src="img"></v-img>
                        </v-avatar>
            </v-flex>
            <v-flex xs6 align-center justify-center text-xs-center>
                    <v-card-text
                        class="headline font-weight-regular"
                    >{{constellation}}</v-card-text>
            </v-flex>
        </v-layout>
        2.注释掉颜色，换成直接读取API
        {{color}}
*/

export default {
  data() {
    return {
      //   错误页面显示文字
      errormsg: "",
      img: this.$store.state.userInfo.babyImgSrc,
      //   img: require("../assets/img/me-portrait.png"),
      tab: null,
      items: ["Today", "Compatibility"],
      //   items: ["Today", "Compatibility", "Profile"],

      icons: [
        {
          icon: "directions_run",
          iconClass: "blue lighten-1 white--text",
          title: "STRENGTHS",
          subtitle: "Progressive,original"
        },
        {
          icon: "thumb_down",
          iconClass: "blue lighten-1 white--text",
          title: "WEAKNESSES",
          subtitle: "Runs from emotional expression"
        },
        {
          icon: "face",
          iconClass: "blue lighten-1 white--text",
          title: "CHARISMATIC MARKS",
          subtitle: "Good looks,beautiful eyes,angular faces,thin build"
        }
      ],
      icons2: [
        {
          title: "林心如",
          stars: require("../assets/img/linxinru.png"),
          subtitle: "Jan 27, 1976"
        },
        {
          //   icon: "call_to_action",
          //   iconClass: "amber white--text",
          title: "章子怡",
          stars: require("../assets/img/zhangziyi.png"),
          subtitle: "Feb 9, 1979"
        }
      ],
      ratings: [
        {
          title: "Overall",
          rating: 0
        },
        {
          title: "Love",
          rating: 0
        },
        {
          title: "Cause",
          rating: 0
        },
        {
          title: "Wealth",
          rating: 0
        }
      ],
      constellation: this.$store.state.userConstellationInfo.constellation,
      analysis: "",
      Overall: "",
      Love: "",
      Cause: "",
      Wealth: "",
      number: "",
      couple: "",
      color: "",
      health: "",
      //   cons: "",
      value_1: "",
      astrolabe: "",
      lastName: ""
    };
  },
  mounted() {
    this.init();
  },
  components: {
    error_empty
  },
  computed: {
    // 是否x显示出错页面
    isError() {
      return this.$store.state.userConstellationInfo.constellation == "" ||
        this.$store.state.userConstellationInfo.constellation == "undefined" ||
        this.$store.state.userConstellationInfo.constellation == undefined
        ? true
        : false;
    }
  },
  methods: {
    init() {
      //  若内存中不存在constellation数据 --- 显示empty页面
      if (
        this.$store.state.userConstellationInfo.constellation == "" ||
        this.$store.state.userConstellationInfo.constellation == "undefined" ||
        this.$store.state.userConstellationInfo.constellation == undefined
      ) {
        //   没有星座内容，显示“空白页面”
        // this.isError = true;
        this.errormsg = "Sorry!You need to fill in the baby information.";
        console.log("no constellation");
      } else {
        //   内存中存在constellation数据，说明用户已经填写过了星座数据
        //      转而使用constellation去查询api
        console.log(
          "constellation = " +
            this.$store.state.userConstellationInfo.constellation
        );
        // 请求星座api数据
        // this.reqConstellationData("射手座");
        this.reqConstellationData(
          this.$store.state.userConstellationInfo.constellation
        );

        // 若内存中存在astrolgImg ，则不请求服务器。
        console.log(
          this.$store.state.userConstellationInfo.astrologImg +
            "--astrologImg---"
        );
        if (
          this.$store.state.userConstellationInfo.astrologImg == "" ||
          this.$store.state.userConstellationInfo.astrologImg == "undefined" ||
          this.$store.state.userConstellationInfo.astrologImg == undefined
        ) {
          this.reqAstrologImg(this.$store.state.userConstellationInfo);
        } else {
          this.astrolabe = this.$store.state.userConstellationInfo.astrologImg;
        }
      }
    },

    //   请求 星盘图片
    //  传入对象需要包括一下属性：
    //       lastName:consInfo.lastName || "m",
    // firstName:
    // gender:
    //
    // birthYear:
    // birthMonth:
    // birthDay:
    // birthHour:
    // birthMin:
    // country:
    // province:
    //
    // city:
    reqAstrologImg(consInfo) {
      ajax(
        "http://139.199.195.199:8888/getAstrologChart",
        {
          //  month-取值范围-(1-12) hour-取值范围-(1-23)
          lastName: consInfo.lastName,
          firstName: consInfo.firstName,
          gender: consInfo.gender == "girl" ? "f" : "m",
          birthYear: consInfo.birthYear,
          //   birthMonth: "5",
          birthMonth:
            parseInt(consInfo.month) < 10
              ? consInfo.month.substring(1)
              : consInfo.month,
          birthDay: consInfo.day,
          //   birthHour: "1",
          birthHour:
            parseInt(consInfo.hour) < 10
              ? consInfo.hour.substring(1)
              : consInfo.hour,
          birthMin: consInfo.min,
          country: consInfo.country,
          province: consInfo.province,
          city: consInfo.city
        },
        data => {
          console.log("请求成功");
          // console.log(data.imgSrc);
          this.astrolabe = data.imgSrc;

          let userConstellationInfoTemp = {};
          userConstellationInfoTemp.astrologImg = this.astrolabe;
          // 更新内存数据
          this.$store.commit(
            "setUserConstellationInfo",
            userConstellationInfoTemp
          );
          //   return data.imgSrc;
        },
        err => {
          console.error(err + "请求失败");
          return "error";
        }
      );
    },
    //   星座运势请求
    //   需要传入数据：cons--星座值
    reqConstellationData(cons) {
      // 内存中若存在星座api 数据 则不再进行请求
      if (JSON.stringify(this.$store.state.forecastInfo) == "{}") {
        console.log("内存中没有星座api 数据，正在重新请求...");
        //
        jsonp(
          "https://api.shenjian.io/constellation/today?appid=349103b9eb8dd67ef2ca0db6b513db04&constellation=" +
            cons,
          (err, data) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(JSON.stringify(data));
              this.loadPageData(data);
              this.$store.commit("setForecastInfo", data);
            }
          }
        );
      } else {
        console.log("内存中已经存在星座api 数据，不再重新请求...");
        this.loadPageData(this.$store.state.forecastInfo);
      }
    },
    // 将星座api 数据加载到页面
    loadPageData(data) {
      //   this.constellation = data.data.constellation;
      // this.cons = data.data.constellation;
      this.analysis = data.data.analysis;
      this.Overall = data.data.fate_data[0].value;
      this.ratings[0].rating = Number(this.Overall.substring(0, 1));

      this.Love = data.data.fate_data[1].value;
      this.ratings[1].rating = Number(this.Love.substring(0, 1));

      this.Cause = data.data.fate_data[2].value;

      this.ratings[2].rating = Number(this.Cause.substring(0, 1));

      this.Wealth = data.data.fate_data[3].value;
      this.ratings[3].rating = Number(this.Wealth.substring(0, 1));

      this.number = data.data.lucky_object[2].substring(5);
      this.couple = data.data.lucky_object[0].substring(5);
      this.color = data.data.lucky_object[1].substring(5);

      this.health = data.data.lucky_object[3].substring(5);
      this.value_1 = Number(this.health.substring(0, 2));
      //   console.log(Number(this.health.substring(0,2)))
    },

    // 刷新页面
    refresh() {
      console.log("刷新页面");
      //   this.$router.go(0);
      this.init();
    }
  }
};
</script>



