<template>
  <!-- 页面滑动
            左 --- yes
            右 --- no
  -->
  <v-layout
    column
    v-touch="{
            left: () => slide('yes'),
            right: () => slide('no')
          }"
  >
    <v-card flat :height="displayHeight">
      <v-img class="white--text" height="150" :src="titleImg"></v-img>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- 滑动第一页 -->
        <!-- 提示将要填写baby信息 -->
        <v-layout align-center justify-space-between column fill-height v-if="slideFlag === 0">
          <v-flex xs12>
            <v-card class="mx-auto" flat>
              <v-card-title class="title font-weight-medium justify-space-between">
                <span>Tip:</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>Next, you will be asked to fill in a form with details of your astrobaby.</v-card-text>
              <v-divider></v-divider>

            </v-card>
            <!-- <v-layout justify-center align-center>
                            <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>-->
          </v-flex>
          <v-flex>
            <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
          </v-flex>
        </v-layout>
        <!-- 滑动第二页 -->
        <!-- babyy信息 -->
        <v-layout v-if="slideFlag === 1">
          <v-flex xs12>
            <v-card class="mx-auto" flat>
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>Baby Info</span>
              </v-card-title>
              <!-- <v-window  >
              <v-window-item >-->
              <v-card-text>
                <span class="caption grey--text text--darken-1">Give your baby a nice name</span>
                <v-text-field
                  v-model="ques.babyName"
                  label="babyName"
                  :rules="babyNameRules"
                  :counter="20"
                  required
                  clearable
                  prepend-icon="child_care"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">Description of baby</span>
                <v-text-field
                  name="dev"
                  v-model="ques.dev"
                  label="description"
                  :rules="devRules"
                  :counter="50"
                  required
                  clearable
                  prepend-icon="event_note"
                ></v-text-field>
              </v-card-text>
            </v-card>
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
              <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- 滑动第三页 -->
        <!-- 提示将要填写个人星座信息 -->
        <v-layout v-if="slideFlag === 2">
          <v-flex xs12>
            <v-card class="mx-auto" flat>
              <v-card-title class="title font-weight-medium justify-space-between">
                <span>Tip:</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>Next, you will be asked to fill in a form with details of your personal birth information.This is to generate your astrolabe</v-card-text>
              <v-divider></v-divider>

            </v-card>
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
              <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- 滑动第四页 -->
        <!-- 用户信息 -->
        <v-layout v-if="slideFlag === 3">
          <v-flex xs12>
            <v-card class="mx-auto" flat>
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>Your birth information</span>
              </v-card-title>
              
              <!-- <v-window  >
              <v-window-item >-->
              <v-card-text>
                <!-- 姓名 -->
                <v-text-field
                  v-model="ques.lastName"
                  label="enter your lastName"
                  :rules="lastNameRules"
                  :counter="20"
                  required
                  clearable
                ></v-text-field>
                <v-text-field
                  v-model="ques.firstName"
                  label="enter your firstName"
                  :rules="firstNameRules"
                  :counter="20"
                  required
                  clearable
                ></v-text-field>
                <span class="caption grey--text text--darken-1">Choose your gender</span>
                <!-- 性别 -->
                <v-radio-group v-model="ques.gender" row>
                  <v-radio label="male" value="male" :rules="countryRules"></v-radio>
                  <v-radio label="female" value="female" :rules="countryRules"></v-radio>
                </v-radio-group>
                <v-divider></v-divider>
              </v-card-text>
            </v-card>
            
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
              <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- 滑动第五页 -->
        <!-- 出生日期 -->
        <v-layout v-if="slideFlag === 4">
          <v-flex xs12>
            <v-card class="mx-auto" flat>
              <v-card-title class="title font-weight-regular justify-space-between">
                <span>Choose your date and time of birth</span>
              </v-card-title>
              <!-- <v-window  >
              <v-window-item >-->
              <!-- 生日 -->
              <v-layout justify-center align-center>
                <div class="mr-5">
                  <v-subheader>{{ques.birthYear}}-{{ques.month}}-{{ques.day}}</v-subheader>
                </div>
                <div class="ml-2">
                  <v-subheader>{{ques.hour}}:{{ques.min}}</v-subheader>
                </div>
              </v-layout>
              
              <v-layout justify-center align-center>
                <v-btn color="primary" dark @click="dialog2 = true" round>Choose date</v-btn>
                <v-btn color="primary" dark @click="dialog3 = true" round>Choose time</v-btn>
              </v-layout>
              <v-divider></v-divider>
              <!-- <v-btn color="primary" dark @click="dialog4 = true" round>dialog4Test</v-btn> -->
              <!-- <v-card height="500" flat> -->
            </v-card>
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
              <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- 滑动第六页 -->
        <!-- 出生地点 -->
        <v-layout v-if="slideFlag === 5">
          <!-- 选择国家 -->
          <v-flex xs12>
            <v-card flat>
              <v-card-title class="headline font-weight-regular black--text">Choose your birthplace</v-card-title>
              <v-card-text>
                <span class="caption grey--text text--darken-1">country</span>
                <v-autocomplete
                  v-model="ques.country"
                  :items="states"
                  persistent-hint
                  prepend-icon="location_city"
                  :rules="countryRules"
                >
                  <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>
                </v-autocomplete>
                <!-- 省 -->
                <span class="caption grey--text text--darken-1">province(中文请使用拼音)</span>
                <v-autocomplete
                  v-model="ques.province"
                  :items="statePvorince"
                  :rules="countryRules"
                  :counter="20"
                  required
                  clearable
                ></v-autocomplete>
                <!-- 城市 -->
                <span class="caption grey--text text--darken-1">city(中文请使用拼音</span>
                <v-autocomplete
                  v-model="ques.city"
                  :items="statesCity"
                  :rules="countryRules"
                  :counter="20"
                  required
                  clearable
                ></v-autocomplete>
              </v-card-text>
            </v-card>
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
              <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- 滑动第七页 -->
        <!-- 提示是否愿意做bigfive心理测试 -->
        <v-layout v-if="slideFlag === 6">
          <v-flex xs12>
            <v-card class="mx-auto" flat>
              <v-card-title class="title font-weight-medium justify-space-between">
                <span>Tip:</span>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text>Are you willing to do a psychological test?If you are willing to do,you can click the red button.If you don't have a will,then go ahead.You will hatch an astrobaby.</v-card-text>
              <v-divider></v-divider>

            </v-card>
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
              <!-- 需要添加心理测试跳转 -->
              
              <v-btn color="primary" dark round @click.native="slide('yes')">Next</v-btn>
            </v-layout>
            <v-layout justify-center align-center>
              <v-btn color="red" dark round @click.native="test()">Go to have a psychological test</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>

        <!-- 滑动页第八页 -->
        <!-- 孵化 -->
        <v-layout align-center column v-if="slideFlag === 7">
          <v-flex xs12>
            <v-card class="mx-auto" height="100" flat>
              <v-card-title class="title font-weight-regular justify-space-between">
                <span
                  v-text=" valid ? 'Everything has only owed the GO! ' : 'Sorry!You must fill in the data for each page to incubate'"
                ></span>
              </v-card-title>
            </v-card>
            <v-divider></v-divider>
            <v-layout justify-center align-center>
              <v-btn color="primary" dark round @click.native="slide('no')">Previous</v-btn>
            </v-layout>
          </v-flex>
          <v-flex>
            <!-- 提交数据，孵化 -->
            <v-btn color="primary" dark @click="submit" round :disabled="!valid">GO!</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>

    <!-- 日期模态框 -->
    <v-dialog v-model="dialog2" persistent>
      <!-- 出生日期 -->
      <v-date-picker :first-day-of-week="0" v-model="pickerDate" locale="zh-cn" full-width>
        <v-layout justify-center align-center style="background-color:white">
          <v-btn color="primary" flat dark round @click.native="dialog2 = false" small>Save</v-btn>
        </v-layout>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="dialog3" persistent>
      <!-- 出生时刻 -->
      <v-time-picker v-model="e7" format="24hr" full-width>
        <v-layout justify-center align-center style="background-color:white">
          <v-btn color="primary" flat dark round @click.native="dialog3 = false" small>Save</v-btn>
        </v-layout>
      </v-time-picker>
    </v-dialog>
    <!-- 孵化进度 -->
    <!-- <v-dialog v-model="dialog4" full-width  > -->
    <v-dialog v-model="dialog4" full-width persistent>
      <v-card flat>
        <v-progress-linear :indeterminate="dialog4"></v-progress-linear>
        <v-card-title>waiting for me ...i will be here soon O(∩_∩)O</v-card-title>
        <v-img :src="dialog4Img" contain aspect-ratio="1"></v-img>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import hatchjs from "./hatchMethod.js";
import ajax from "../../assets/js/ajax";
import countryConst from "../const/countryConst.js";
import pvorinceConst from "../const/pvorinceConst.js";
import cityConst from "../const/cityConst.js";
/* 
    孵化过程 提问子组件

*/
/*
修改：
        1、按钮的添加与布局
        2、前三张卡片的边框
*/

export default {
  data() {
    return {
      //  滑动总页数
      pageCount: 8,

      // 是否可以提交 控制
      valid: true,

      // 验证规则
      babyNameRules: [
        v => !!v || "babyname is required",
        v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      devRules: [
        v => !!v || "dev is required",
        v => (v && v.length <= 50) || "dev must be less than 50 characters"
      ],
      lastNameRules: [
        v => !!v || "lastName is required",
        v => (v && v.length <= 20) || "lastName must be less than 20 characters"
      ],
      firstNameRules: [
        v => !!v || "firstName is required",
        v =>
          (v && v.length <= 20) || "firstName must be less than 20 characters"
      ],
      countryRules: [v => !!v || "this is required"],
      // 日期模态框
      dialog2: false,
      dialog3: false,
      //   孵化进度模态框
      dialog4: false,
      //   出生时刻
      e7: null,
      // 标题照片src
      titleImg: "",
      //   孵化进度图片
      dialog4Img: "",
      // 可用屏幕高度
      displayHeight: 0,
      // 滑动位置标志 -- 显示元素标志
      //   slideFlag:
      //              0 --- 第一个问题
      //              1 --- 第二个问题
      slideFlag: 0,
      //   所有问题提到的字段对象
      ques: {
        //   baby名字
        babyName: "",
        //   注意：这里指的是baby的DNA
        dna: "0",
        // 对baby的描述
        dev: "",
        figure: 233333,
        //   孵化的eggID
        eggId: "0",
        // 用户钱包地址
        walletAddress: "0",

        // 以下是生成星盘需要的字段
        lastName: "",
        firstName: "",
        gender: "",
        birthYear: "",
        month: "",
        day: "",
        hour: "",
        min: "",
        country: "",
        province: "",
        city: ""
      },
      pickerDate: new Date().toISOString().substr(0, 10),
      //   出生地选择
      //   isEditing: false,
      //   model: null,
      //   国家自动补全
      states: countryConst
      //   statesCity: cityConst,
      //   statePvorince: pvorinceConst
    };
  },
  mounted() {
    this.displayHeight = document.body.clientHeight;

    this.titleImg = require("../../assets/img/question" +
      (this.slideFlag + 1) +
      ".png");

    this.dialog4Img = require("../../assets/img/waiting1.jpg");

    // this.ques.figure = this.$store.state.userInfo.dna;
  },
  computed: {
    //   城市自动补全
    statesCity() {
      return cityConst[pvorinceConst.indexOf(this.ques.province)];
    },
    // 省份自动补全
    statePvorince() {
      return this.ques.country == "China " ? pvorinceConst : null;
    }
  },
  watch: {
    //   监听滑动，更换显示图片
    slideFlag: function() {
      this.titleImg = require("../../assets/img/question" +
        (this.slideFlag + 1) +
        ".png");

      // 若有信息未填写，vilid 为false ，不显示提交按钮
      if (this.slideFlag === this.pageCount - 1) {
        this.valid = true;
        let temp = this.ques;
        for (let item in temp) {
          console.log(item + "---" + temp[item]);
          if (temp[item] == "") {
            console.log(item + " --- 未填写");
            this.valid = false;
            return;
          }
        }
        console.log(this.valid);
      }
    },
    // 监听出生日期变化
    pickerDate: function() {
      this.ques.birthYear = this.pickerDate.split("-")[0];
      this.ques.month = this.pickerDate.split("-")[1];
      this.ques.day = this.pickerDate.split("-")[2];
    },
    // 监听出生时刻变化
    e7: function() {
      this.ques.hour = this.e7.split(":")[0];
      this.ques.min = this.e7.split(":")[1];
    }
  },

  methods: {
    //   滑动执行的函数
    slide(val) {
      console.log(val);
      // yes --- 左滑
      if (val === "yes") {
        this.slideFlag += 1;
      } else {
        //   no -- 右滑
        this.slideFlag -= 1;
        this.slideFlag < 0 ? (this.slideFlag = 0) : "";
      }
      this.slideFlag >= this.pageCount
        ? (this.slideFlag = this.pageCount - 1)
        : "";
      //   this.slideFlag = this.slideFlag % 5;
    },
    // 孵化数据提交
    submit() {
      // 开启孵化进度提示框
      this.dialog4 = true;

      //   let consObj = {
      //     day: this.ques.day,
      //     month: this.ques.month
      //   };
      //   let cons = this.getConstellation(consObj);
      // 获取用户所属星座
      let cons = this.getConstellation({
        day: this.ques.day,
        month: this.ques.month
      });

      console.log(cons + "  孵化完成");
      // this.getConstellationDNA(cons) = -1 表示没有匹配项
      console.log(
        "星座 所属 DNA 脱氧核糖核酸 = " + this.getConstellationDNA(cons)
      );

      let consDNA = this.getConstellationDNA(cons);
      let lastConsDNA = consDNA < 10 ? "0" + consDNA : consDNA + "";

      let genderDNA = this.ques.gender == "female" ? "0" : "1";
      // lastDNA 用于更新DNA最后三位数（第一位表示baby性别，最后两位表示baby星座)
      let lastDNA = genderDNA + "" + lastConsDNA;

      console.log("baby 更新的 DNA == " + lastDNA);

      //需要填充必要数据
      // dna 在获取egg信息时，后台为返回，需要修改
      //   this.ques.dna = 678153243252342123567;
      this.ques.dna =
        this.$store.state.userInfo.eggs[0].dna.substring(0, 29) + lastDNA;
      this.ques.figure = 56723124241241242124;
      // this.ques.eggId = this.$store.state.userInfo.currentEggId;
      this.ques.eggId = this.$store.state.userInfo.eggs[
        this.$store.state.userInfo.currentEggId
      ].id;

      this.ques.walletAddress = this.$store.state.userInfo.walletAddress;

      // 更新babyinfo
      let babyInfo = {
        babyName: this.ques.babyName,
        // 生日
        birthday: Date.now(),
        // baby养成进度
        babyMaturity: 0,
        // 年龄
        // babyAge: 0,

        // 主人钱包地址
        owner: this.$store.state.userInfo.walletAddress,
        // 朋友
        friends: ""
      };

      this.$store.commit("setBabyInfo", babyInfo);

      // console.log(this.$store.state.userInfo.currentEggId + "---当前eggId")

      // 调用孵化函数
      //   hatchjs(this.ques);
      ajax(
        "http://139.199.195.199:8888/hatch",
        {
          babyName: this.ques.babyName,
          dna: this.ques.dna,
          dev: this.ques.dev,
          figure: this.ques.figure,
          eggId: this.ques.eggId,
          //   eggId: obj.eggId,
          walletAddress: this.ques.walletAddress
        },
        data => {
          console.log("hatch请求成功");
          //  关闭进度框
          this.dialog4 = false;

          // 问题结束
          this.$emit("questionEnd");
        },
        err => {
          console.error("hatch请求失败");
          this.dialog4 = false;
          // return "fail";
        }
      );

      this.$store.commit("setInquireUserInfoFlag", true);

      let constellationInfo = {
        lastName: "",
        firstName: "",
        gender: "",
        birthYear: "",
        month: "",
        day: "",
        hour: "",
        min: "",
        country: "",
        province: "",
        city: "",
        constellation: cons
      };

      constellationInfo = {
        ...constellationInfo,
        ...this.ques
      };
      constellationInfo.constellation = cons;

      console.log("封装的星座 == " + constellationInfo.constellation);

      console.log("封装的星座数据 === " + JSON.stringify(constellationInfo));

      this.$store.commit("setUserConstellationInfo", constellationInfo);
    },
    // 根据生日获得所属星座
    // 传入的对象包含 month,day 字段
    getConstellation(userDate) {
      console.log("用户生日--来自星座生成函数" + JSON.stringify(userDate));
      let dayArr = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
      let constellationArr = [
        "摩羯座",
        "水瓶座",
        "双鱼座",
        "白羊座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "狮子座",
        "处女座",
        "天秤座",
        "天蝎座",
        "射手座",
        "摩羯座"
      ];
      let day = parseInt(userDate.day);
      let month = parseInt(userDate.month);
      return day < dayArr[month - 1]
        ? constellationArr[month - 1]
        : constellationArr[month];
    },

    // 获取星座所对应的DNA
    // DNA 最后两位表示星座（00--白羊座，01--水瓶座 ，，，）
    // DNA 倒数第三位表示星座性别(0--f; 1--m)
    // 传入参数cons: 为星座中文
    getConstellationDNA(cons) {
      let consArray = [
        "白羊座",
        "水瓶座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "狮子座",
        "处女座",
        "天秤座",
        "天蝎座",
        "射手座",
        "摩羯座",
        "双鱼座"
      ];

      return consArray.indexOf(cons);
    },

    // 心理测试
    test() {}
  }
};
</script>

<style>
</style>
