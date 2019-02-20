<template>
  <v-layout row>
    <v-flex xs12 sm12 style="position: relative;">
      <div class="chat-container" ref="chatContainer">
        <!-- <div class="chat-container" v-on:scroll.passive="onScroll" ref="chatContainer"> -->
        <message :messages="messages" @imageLoad="scrollToEnd"></message>
      </div>
      <div class="typer">
        <v-btn icon class="blue--text emoji-panel" @click="toggleEmojiPanel">
          <v-icon>mood</v-icon>
        </v-btn>
        <v-text-field
          label="Type here..."
          v-on:keyup.enter="sendMessage"
          v-model="content"
          append-icon="send"
          @click:append="sendMessage"
          :rules="[sendMsgRules]"
        ></v-text-field>
      </div>
      <emoji-picker :show="emojiPanel" @close="toggleEmojiPanel" @click="addMessage"></emoji-picker>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import chat_message from "./chat_message";
import emojiPicker from "./emojiPicker";
import errorPage from "../404/errorPage";
import ajax from "../../assets/js/ajax";
// import { bus } from "../utils/bus.js";

import jsonp from "jsonp";
/* 
    聊天内容组件

 */
export default {
  name: "chat_content",
  data() {
    return {
      // 发送消息的心情
      msgEmoji: "",
      // 聊天消息
      chatMessages: [],
      // 发送消息暂存
      content: "",
      // 聊天窗口高度
      totalChatHeight: 0,
      // 表情选项框是否打开
      emojiPanel: false
    };
  },
  components: {
    message: chat_message,
    "emoji-picker": emojiPicker
  },
  computed: {
    messages() {
      return this.chatMessages;
    },
    // 发送消息的规则
    sendMsgRules() {
      return this.msgEmoji == "" ||
        this.content.substring(0, 2) != this.msgEmoji.value
        ? "Please choose your emotions"
        : true;
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.loadChat();
    //   this.scrollToEnd();
    // });

    this.$nextTick(function() {
      this.loadChat();
      this.scrollToEnd();
    });
  },
  mounted() {
    //  点击chat 将取消主动聊天
    let timer = this.$store.state.chatTimer;
    clearInterval(timer);

    this.$store.commit("setShowChatBadge", false);
    // this.timer = setInterval(this.babyResponse("你好啊"), 1000);
  },
  methods: {
    addMessage(emoji) {
      this.msgEmoji = emoji;
      this.content = emoji.value;
      // this.content += emoji.value;
    },

    // 加载 聊天内容
    loadChat() {
      // this.chatMessages = this.$store.state.chatMessage;
      // console.log("***************************************")
      // console.log(JSON.stringify( Vue.localStorage.get("chatMessage")))
      // console.log("***************************************")
      if (JSON.stringify(this.$store.state.chatMessage) === "[]") {
        console.log("内存聊天记录为空");

        // vuex 内存中没有消息记录,去本地储存查找
        // let msg_temp = Vue.localStorage.get("chatMessage_qqqqqq");
        let tempStr = "chatMessage_" + this.$store.state.userInfo.username;

        let msg_temp = JSON.stringify(Vue.localStorage.get(tempStr));
        console.log("====msg_temp====》" + msg_temp);
        console.log("====msg_temp--type====》" + typeof msg_temp);

        if (
          !(msg_temp == "null" || msg_temp == "undefined" || msg_temp == null)
        ) {
          console.log("====msg_temp不为null或underfind 进入if====》");
          // 本地储存存在聊天记录
          this.chatMessages = JSON.parse(Vue.localStorage.get(tempStr));
          // this.chatMessages = JSON.parse(
          //   Vue.localStorage.get(
          //     "chatMessage_" + this.$store.state.userInfo.username
          //   )
          // );
          console.log("====this.chatMessages====》" + this.chatMessages);
          console.log(
            "====this.chatMessages--type====》" + typeof this.chatMessages
          );
        }
      } else {
        this.chatMessages = this.$store.state.chatMessage;
        this.scrollToEnd();
      }
    },

    //   发声滚动事件触发函数
    // onScroll() {
    //   console.log(" i am onScorll");
    //   let scrollValue = this.$refs.chatContainer.scrollTop;
    //   const that = this;
    //   if (scrollValue < 100) {
    //     this.totalChatHeight = this.$refs.chatContainer.scrollHeight;

    //     // let chatID = this.id;
    //     let currentTopMessage = this.chatMessages[0];
    //     if (currentTopMessage === undefined) {
    //       return;
    //     }
    //   }
    // },
    // 滚动到底部
    scrollToEnd() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".chat-container");
        container.scrollTop = container.scrollHeight;
      });
    },
    scrollTo() {
      this.$nextTick(() => {
        let currentHeight = this.$refs.chatContainer.scrollHeight;
        let difference = currentHeight - this.totalChatHeight;
        var container = this.$el.querySelector(".chat-container");
        container.scrollTop = difference;
      });
    },

    // 发送消息
    sendMessage() {
      if (
        this.content !== "" &&
        this.content.substring(2, this.content.length) !== "" &&
        this.msgEmoji != "" &&
        this.content.substring(0, 2) == this.msgEmoji.value
      ) {
        let sendMessage = {
          userName: this.$store.state.userInfo.username,
          content: this.content.substring(2, this.content.length),
          date: new Date().toString(),
          // date: new Date().toUTCString(),
          chatID: Math.random() * 1000
        };
        console.log(typeof this.chatMessages);

        this.chatMessages.push(sendMessage);

        // this.$store.commit("setChatMessage", this.chatMessages);

        let context_1 = this.content.substring(2, this.content.length);
        console.log("-======" + context_1 + "========-");
        this.content = this.msgEmoji.value;
        let msgEmotion = ["joy", "sadness", "fear", "neutral", "anger"];
        // astrobaby的回应
        ajax(
          "http://139.199.195.199:8888/cakechat",
          {
            context: context_1,
            emotion: msgEmotion[msgEmotion.indexOf(this.msgEmoji.key)]
          },
          data => {
            console.log("请求成功");
            console.log(JSON.stringify(data));

            this.babyResponse(data);

            this.scrollToEnd();
            //   this.scrollToBottom();
          },
          err => {
            console.error("chatboy 无响应");
          }
        );
        this.scrollToEnd();
      }
    },
    // emoji开关
    toggleEmojiPanel() {
      this.emojiPanel = !this.emojiPanel;
    },

    // baby的回复 ---- msg 回复的消息
    babyResponse(msg) {
      let rebotName =
        this.$store.state.babyInfo.babyName === ""
          ? "reboot"
          : this.$store.state.babyInfo.babyName;
      let resMessage = {
        userName: rebotName,
        content: msg,
        date: new Date().toString(),
        // date: new Date().toUTCString(),
        // date: new Date().toString(),
        chatID: Math.random() * 1000
      };
      this.chatMessages.push(resMessage);

      // this.$store.commit("setChatMessage", this.chatMessages);
    },
    // 触发角标
    triggerBadge() {
      console.log("chat_content 准备提交 tiggerBadge 事件");
      // bus.$emit("badge");
      this.$store.commit("setShowChatBadge", true);
    }
  },

  //   聊天销毁前 保存聊天记录
  beforeDestroy() {
    console.log("beforeDestroy chat  ");
    this.$store.commit("setChatMessage", this.chatMessages);

    // 开启baby主动聊天 / 两分钟 发起一次
    let timer = setInterval(() => {
      let tempMsg = this.$store.state.initiativeMsg;
      let index = Math.floor(Math.random() * tempMsg.length);
      this.babyResponse(tempMsg[index]);
      // this.scrollToEnd();
      this.triggerBadge();
      //
      if (this.$store.state.showChatBadge === true) {
        clearInterval(timer);
      }
    }, 120000);

    this.$store.commit("setChatTimer", timer);

    // clearInterval(this.timer);

    // let chatMessage = JSON.stringify(this.chatMessages);
    // // this.$store.commit("setChatMessages", this.chatMessages);
    // Vue.localStorage.set("chatMessage", chatMessage);
  }
};
</script>

<style>
.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 4.7rem;
  width: 100%;
  background-color: #fff;
  /* box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.2); */
}
.typer .emoji-panel {
  /*margin-right: 15px;*/
}
/* .typer input[type="text"] {
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
} */
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 15.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: transparent;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .chatTime {
  align-items: center;
  text-align: center;
}
.chat-container .content {
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 580px) {
  .chat-container .content {
    max-width: 80%;
  }
}
</style>
