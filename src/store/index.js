/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '../assets/js/ajax.js'
import { stat } from 'fs';
// import {
//   stat
// } from 'fs';
// import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // baby 主动说话控制
    babyTalk: {
      content: "",
      isShow: false
    },

    // 全局顶部通知对象
    alert: {
      isShow: false,
      alertType: "info",
      content: "this is my alert"
    },
    // market 里面所有的Egg
    marketEggs: [],
  
    // market 里面所有EggId
    marketEggId: [],
    //当前喜欢的id
    favoriteId: '',
    // 主动聊天消息——temp
    initiativeMsg: [
      "你好啊！好久没看到你了",
      "和我聊天，可以让我解锁更多技能哦",
      "今天你还开心吗？",
      "我可以帮你算算你的运势哦",
      "我~好像 饿了",
      "我需要更多的聊天~",
      "主人，带我出去见见世面",
      "恭喜主人，明天是你的幸运日哦",
      "我需要吃更多的饭",
      "想做一份BIG5测试吗？",
      "你会把我介绍给你的朋友吗？"
    ],
    // 主动聊天角标显示
    showChatBadge: false,
    // 主动聊天计时器
    chatTimer: "",
    // 是否是初次登录
    isFirst: true,
    // 两次返回退出
    exitFlag: 0,

    // 首页用户信息更新flag
    inquireUserInfoFlag: false,
    screenHeight: "",
    // 用户信息
    userInfo: {
      // 用户名
      username: '',
      //   用户钱包地址
      walletAddress: '',
      //   用户所有钱包地址
      allWalletAddress: [],
      //   当前选中的eggId
      currentEggId: '',
      //   当前使用的babyId
      currentBabyId: '',
      //   该用户所有的egg对象，每个对象包含id/dna字段,
      //      collection字段是收藏该egg的用户钱包地址
      eggs: [],
      //collection 里面所有的id
      collectionId: [],
      //   该用户所有的baby对象，每个对象包含figure字段
      baby: {
        // baby的dna
        figure: ''
      },
      //   拥有的egg数量
      eggCount: '',
      //   拥有的baby数量（理论上只有一个)
      babyCount: '',
      //   用户文本描述
      text: '',
      //   用户状态
      status: '',
      //   用户所属星座
      constellation: '',
      // egg图片src
      eggImgSrc: '',
      // baby图片src
      babyImgSrc: '',
      // // eggDNA
      // dna: '',
      // // babyDNA
      // figure: '',



      // 用户的消息
      // userMessage: [{
      //   content: ""

      // }, {
      //   content: ""
      // }]
      userMessage: [],
      // userMessage: [{
      //   msg: "Your luck draw has been released, sorry to tell you that you have no egg assigned, please try again :-D",
      //   show: false

      // }, {
      //   msg: "Astrobaby is hungry now",
      //   show: false
      // }],
      luckylotteryNotice: {
        msg: "Congratulations! You got the chance to extract the egg 🎉",
        show: false
      }

    },
    // 用户星座/心理数据
    userConstellationInfo: {
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
      city: "",
      constellation: "",
      astrologImg: ""
    },

    // 聊天数据
    chatMessage: [],
    babyInfo: {
      babyName: "",
      // 生日
      birthday: "",
      // baby养成进度
      babyMaturity: '',
      // 年龄
      // babyAge: "",
      // 主人钱包地址
      owner: "",
      // 朋友
      friends: ""

    },
    // 暂存的星座api 数据
    forecastInfo: {}
  },
  getters: {

    showChatBadge: state => state.showChatBadge,
    chatTimer: state => state.chatTimer,
    isFirst: state => state.isFirst,
    exitFlag: state => state.exitFlag,
    screenHeight: state => state.screenHeight,
    inquireUserInfoFlag: state => state.inquireUserInfoFlag,
    userConstellationInfo: state => state.userConstellationInfo,
    userInfo: state => state.userInfo,
    babyInfo: state => state.babyInfo,
    chatMessage: state => state.chatMessage
  },
  mutations: {

    refresh(state, userInfo, userConstellationInfo, babyInfo) {
      state.userInfo = { ...(state.userInfo),
        ...userInfo
      };
      state.userConstellationInfo = { ...(state.userConstellationInfo),
        ...userConstellationInfo
      };
      // state.chatMessage = { ...(state.chatMessage),
      //   ...theData[2]
      // }
      state.babyInfo = { ...(state.babyInfo),
        ...babyInfo
      };

    },
    // 设置babyInfo数据
    setBabyInfo(state, babyInfo) {
      state.babyInfo = { ...(state.babyInfo),
        ...babyInfo
      }
    },
    // 设置alert数据
    setAlert(state, alert) {
      state.alert = { ...(state.alert),
        ...alert
      }
    },
    // 设置baby说话内容
    setBabyTalk(state, talk) {
      state.babyTalk = { ...(state.babyTalk),
        ...talk
      }
    },
    // 设置market 里面eggId
    setMarketEggId(state, eggId) {
      state.marketEggId = eggId;
    },
    
    // 向marketEggId  增加一个 eggid
    addMarketEggId(state, eggId) {
      state.marketEggId.push(eggId);
    },
    // 向marketEgg 添加一个Egg
    setMarketEggs(state, egg) {
      state.marketEggs.push(egg);
    },
    
    // 设置点击返回按钮次数
    setExitFlag(state, flag) {
      state.exitFlag = flag;
    },
    // 设置是否是初次登录
    setIsFirst(state, first) {
      state.isFirst = first;
    },
    setChatMessage(state, messages) {
      state.chatMessage = messages
      // state.chatMessage = { ...(state.chatMessage),
      //   ...messages
      // }
    },
    // 设置UserInfo更新标志
    setInquireUserInfoFlag(state, flag) {
      state.inquireUserInfoFlag = flag;
    },
    // 设置开启/关闭 抽蛋通知
    setLuckylotteryNotice(state, isShow) {
      state.userInfo.luckylotteryNotice.show = isShow;
    },
    // 设置用户本地eggshelpFlag
    setuserEggShipFlag(state, eggId, flag) {

      let eggs = state.userInfo.eggs;
      for (let item in eggs) {
        if (eggs[item].id == eggId) {
          eggs[item].shipFlag = flag;
          break;
        }
      }
    },
    // 设置当前选中eggId
    setCurrentEggId(state, currentEggId) {
      state.userInfo.currentEggId = currentEggId;
    },
    updateHeight(state, height) {
      state.screenHeight = height
    },
    // 设置星座api 数据
    setForecastInfo(state, data) {
      state.forecastInfo = data
    },
    // 更新userinfo
    setUserInfo(state, userInfo) {
      state.userInfo = { ...(state.userInfo),
        ...userInfo
      }
    },
    // 更新eggs
    setEggs(state, eggs) {
      state.userInfo.eggs = eggs;

    },
    // //设置collection 里面的id
    CollectionId(state,val){
      for(let i = 0; i < state.userInfo.collectionId.length; i++){
        if (parseInt(state.userInfo.collectionId[i]) == val) {
          state.userInfo.collectionId.splice(i, 1);
          console.log("删除id后的数组："+JSON.stringify(state.userInfo.collectionId))
          return;
        }
      }
      state.userInfo.collectionId.push(val);
      console.log("添加id后的数组 喜欢的蛋："+JSON.stringify(state.userInfo.collectionId))
  },
    // 增加一个用户egg信息
    addUserEgg(state, eggId) {
      for (let i = 0; i < state.marketEggs.length; i++) {
        if (parseInt(state.marketEggs[i].id) == parseInt(eggId)) {
          let userEgg = state.marketEggs[i];
          userEgg.shipFlag = false;
          state.userInfo.eggs.push(userEgg);
          console.log("用户egg是 添加 id = " + eggId + "成功")
        }
      }
    },
    //增加一个收藏egg的信息
    // addFavoriteEgg(state,eggId){
    //   for(let i = 0 ; i < state.collectionId.length; i++){
    //     if(parseInt(state.collectionId[i]) == eggId){
    //       let favoriteEgg = state.collectionId[i];
    //       state.collectionId.push(favoriteEgg);
    //       console.log("你已添加"+eggId+"到收藏夹")
    //     }
    //   }
    // },
    // 更新chatTimer
    setChatTimer(state, chatTimer) {
      state.chatTimer = chatTimer;
    },
    // 更新showChatBadge
    setShowChatBadge(state, showChatBadge) {
      state.showChatBadge = showChatBadge;
    },
    // 从商店中删除已经被购买或抽中的egg
    deleteEggFromMarket(state, eggId) {

      for (let i = 0; i < state.marketEggs.length; i++) {
        if (parseInt(state.marketEggs[i].id) == eggId) {
          state.marketEggs.splice(i, 1);
          console.log("删除 id = " + eggId + "成功")
        }
      }

    },
    // 更新userConstellationInfo
    setUserConstellationInfo(state, userConstellationInfo) {
      state.userConstellationInfo = { ...(state.userConstellationInfo),
        ...userConstellationInfo
      }
    }
  },
  actions: {
    
    // 获取所有market egg
    getAllMarketEgg({
      commit,
      state
    }) {
      // let marketEggId;
      // console.log("from VUEX -- marketEggs = " + state.marketEggs + " ,type = " + typeof (state.marketEggs))
      if (state.marketEggs.length === 0) {
        // if (state.marketEggs.length === 0 || state.marketEggFlag) {

        // commit("setMarketEggFlag", false);
        // if (JSON.stringify(state.marketEggs) === "[]") {
        // 请求在售eggId
        ajax(
          "http://139.199.195.199:8888/getAllMarketEggs", {},
          data => {
            console.log("getAllMarketEgg 请求成功");
            // console.log(" data =" + JSON.stringify(data));
            // marketEggId = data.data;
            let tempId = [];
            for (let i in data.data) {
              if (parseInt(data.data[i]) !== 0) {
                tempId.push(data.data[i]);
              }
            }

            commit("setMarketEggId", tempId);
            // commit("setMarketEggId", data.data);
            console.log("vuex marketEggId - " + state.marketEggId)
            // console.log("vuex marketEggId TYPE - " + typeof (state.marketEggId))
            
            this.dispatch("getEggInfoById", 0)
            
          },
          err => {
            console.error("getAllMarketEgg 请求失败");
            console.log(" error =" + JSON.stringify(err));
          }
        );

      }
      // 执行 mutations 
      // commit('toggleAudioLoadding', true);

    },

    /* 
      通过eggId递归获取所有marketEggId 里面的 eggs数据
        
    */
    getEggInfoById({
      commit,
      state
    }, index) {
      ajax(
        "http://139.199.195.199:8888/getEggInfo", {
          eggId: state.marketEggId[index]
        },
        data => {
          // console.log("------getEggInfoById -------");
          // console.log("------eegId -------" + state.marketEggId[index]);
          // console.log(JSON.stringify(data));
          // let user_eggs = [];
          let egg = {
            id: state.marketEggId[index],
            dna: data.dna,
            owner: data.owner,
            shipFlag: data.shipFlag,
            collectionCount: data.collectionCount,
            shipPrice: data.shipPrice,
            shipFlag: data.shipFlag,
            collectionBy: ""
          };

          // state.marketEggs.push(egg);
          // 将egg数据保存在内存
          commit("setMarketEggs", egg);
          
          index++;
          if (index >= state.marketEggId.length) {
            console.log("marketEggs ===" + JSON.stringify(state.marketEggs));
            return;
          } else {
            // this.getEggDNA(index++);
            // 递归调 用自己
            this.dispatch("getEggInfoById", index++);
          }
          // this.$store.commit("setEggs", this.user_eggs);
        },
        err => {

          console.error("get EggInfoById error - " + state.marketEggId[index]);
          console.error(err);
        }
      );
    },
    // 从market 购买egg
    //  eggId : 欲购买的eggId ; amount : 该egg的售价
    buyEggFromMarket({
      commit,
      state
    }, obj) {

      ajax(
        "http://139.199.195.199:8888/buyEggFromMarket", {
          eggId: obj.eggId,
          amount: obj.shipPrice,
          walletAddress: state.userInfo.walletAddress
        },
        data => {
          if (data.error_code == 0) {

            console.log("buyEggFromMarket 请求成功");
            console.log("购买" + obj.eggId + "成功");

            let userInfo = {};
            userInfo.eggCount = state.userInfo.eggCount + 1;
            commit("setUserInfo", userInfo);
            commit("setInquireUserInfoFlag", true)

            commit("addUserEgg", obj.eggId);

            commit("deleteEggFromMarket", obj.eggId);

            console.log(" data =" + JSON.stringify(data));
          } else {
            console.log("buyEggFromMarket 请求失败");
            console.log("购买" + obj.eggId + "失败");

            console.log(" data =" + JSON.stringify(data));
          }
        },
        err => {
          console.error("buyEggFromMarket 请求失败");
          console.log("购买" + obj.eggId + "失败");
          console.log(" error =" + JSON.stringify(err));
        }
      );

    },
    /* 
    将自己的egg上架market
       参数： eggId --- 上架的egg
             amoun --- 售卖价格
             walletAddress --- egg主人地址 
    */

    shelfShop({
      commit,
      state
    }, obj) {
      ajax(
        "http://139.199.195.199:8888/shelfShop", {
          eggId: obj.eggId,
          amount: obj.shipPrice,
          walletAddress: state.userInfo.walletAddress
        },
        data => {
          if (data.error_code == 0) {

            console.log("shelfShop 请求成功");
            console.log("上架" + obj.eggId + "成功");

            // 向 marketEggId 中 增加该egg
            commit("addMarketEggId", obj.eggId)

            let shelfEgg = {};
            // 从用户eggs 中获取 上架的egg信息
            let eggs = state.userInfo.eggs;
            for (let item in eggs) {
              if (eggs[item].id == obj.eggId) {
                shelfEgg = eggs[item];
              }
            }

            if (shelfEgg.id != "") {

              shelfEgg.shipFlag = true;
              shelfEgg.shipPrice = obj.shipPrice;

              // 向 MarketEggs 添加一个 egg数据
              commit("setMarketEggs", shelfEgg)


              console.log("获取用户egg，并 向market增加该egg")

              commit("setInquireUserInfoFlag", true)
            }

          } else {
            console.log("shelfShop 请求失败");
            console.log("上架" + obj.eggId + "失败");

            console.log(" data =" + JSON.stringify(data));
          }
        },
        err => {
          console.error("shelfShop 请求失败");
          console.log("上架" + obj.eggId + "失败");
          console.log(" error =" + JSON.stringify(err));
        }
      );
    },
    /* 
        从Market下架egg
          参数 ： eggId -- 需要下架的EggId
                  walletAddress -- 该egg主人地址

    */
    Obtained({
      commit,
      state
    }, obj) {
      ajax(
        "http://139.199.195.199:8888/Obtained", {
          eggId: obj.eggId,
          walletAddress: state.userInfo.walletAddress
        },
        data => {
          if (data.error_code == 0) {

            console.log("Obtained 请求成功");
            console.log("下架" + obj.eggId + "成功");

            // 从market 删掉该egg
            commit("deleteEggFromMarket", obj.eggId);

            // 设置用户本地eggshelpFlag 为false
            commit("setuserEggShipFlag", obj.eggId, false)

          } else {
            console.log("Obtained 请求失败");
            console.log("下架" + obj.eggId + "失败");

            console.log(" data =" + JSON.stringify(data));
          }
        },
        err => {
          console.error("Obtained 请求失败");
          console.log("下架" + obj.eggId + "失败");
          console.log(" error =" + JSON.stringify(err));
        }
      );
    }



    // ,
    // prev({
    //   dispatch,
    //   state
    // }) {
    //   var list = state.listInfo.songList
    //   if (state.listInfo.songIndex == 0) {
    //     state.listInfo.songIndex = list.length
    //   } else {
    //     state.listInfo.songIndex--
    //   }
    //   var hash = list[state.listInfo.songIndex].hash
    //   dispatch('getSong', hash)
    //   dispatch('getLrc', hash)
    // },
    // next({
    //   dispatch,
    //   state
    // }) {
    //   var list = state.listInfo.songList
    //   if (state.listInfo.songIndex == list.length - 1) {
    //     state.listInfo.songIndex = 0
    //   } else {
    //     ++state.listInfo.songIndex
    //   }
    //   var hash = list[state.listInfo.songIndex].hash
    //   dispatch('getSong', hash)
    //   dispatch('getLrc', hash)
    // }
  }
})


// const LocalEvent = function(item){             // 定义一个本地存储的构造函数
//   this.get = function () {                // 拿数据
//       return JSON.parse(localStorage.getItem(item));
//   }
//   this.set = function (obj) {                // 存数据
//       localStorage.setItem(item,JSON.stringify(obj));
//   }
//   this.clear = function () {                // 删数据
//       localStorage.removeItem(item);
//   }
// }


// const local = new LocalEvent('lx_notepad'); // 创建一个本地存储的事例
// const state = local.get() || {
//   event: [],
//   count: 0
// }
// const mutations = {
//   ADDEVENT(states,obj){                    // ADDEVENT，添加新的事件，并存储到localStorage里
//       states.count++;
//       obj.items.id = states.count;
//       states.event.unshift(obj.items);
//       local.set(states);
//   }
// }

export default store
