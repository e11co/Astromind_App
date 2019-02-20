<template>
  <v-container fluid grid-list-xs>
    <v-layout align-space-between justify-space-between column fill-height>
      <v-flex xs12>
        <!-- home 标题部分 -->
        <!-- <v-card :color="contentColor" width="100%" :height="(this.$store.state.screenHeight - 56) +'px' "> -->
        <div v-if="displayFlag === 0">
          <!-- 向子组件传递参数 -->
          <babyHome_titile/>
          <!-- <babyHome_titile :themeColor="contentColor"/> -->
        </div>
      </v-flex>
      <!-- 通知消息部分 -->
      <v-flex xs12>
        <div v-if="this.$store.state.userInfo.userMessage[0].content != '' && displayFlag === 0">
          <!-- 向子组件传递参数 -->
          <babyHome_message :messages=" this.$store.state.userInfo.userMessage"/>
        </div>
      </v-flex>
      <!-- home内容 -->
      <v-flex xs12 mt-2>
        <v-card flat width="100%">
          <!-- <v-card flat :color="contentColor" width="100%"> -->
          <!-- <v-card :color="contentColor" width="100%" :height="contentHeight +'px' "> -->
          <div v-if="displayFlag === 0">
            <!-- 向子组件传递参数 并监听子组件回传值-->
            <babyHome_content
              :displayHeight="contentHeight"
              v-on:needJump="jumpTo"
              ref="babyHome_content"
            />
          </div>
          <!-- 父组件调用子组件函数Test -->
          <!-- <button v-on:click="clickParent">点击</button> -->
        </v-card>
        <!-- <v-btn @click="bottomNav += 1">store </v-btn> -->
      </v-flex>
      <!-- <v-subheader>Swipe Direction</v-subheader>
      {{ swipeDirection }}-->
      <!-- store内容 -->
      <v-flex xs12 v-if="displayFlag === 1">
        <market_title :des="bottomNav"/>
      </v-flex>
      <!-- chat内容 -->
      <v-flex xs12 v-if="displayFlag === 2">
        <chat_title :des="bottomNav"/>
      </v-flex>
      <!-- forecast内容 -->
      <v-flex xs12 v-if="displayFlag === 3">
        <forecast_title :des="bottomNav"/>
      </v-flex>
      <!-- task内容 -->
      <v-flex xs12 v-if="displayFlag === 4">
        <task_title :des="bottomNav"/>
      </v-flex>
      <!-- <v-card height="650px" flat > -->
      <!-- 底部导航栏 -->
      <v-bottom-nav :active.sync="bottomNav" color="transparent" :value="true" app shift>
        <!-- <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute shift> -->

        <v-btn dark color="black" flat value="Home">
          <span>Home</span>
          <v-icon color="#2be7aa">home</v-icon>
        </v-btn>
        <v-btn dark color="black" flat value="Market">
          <span>Market</span>
          <v-icon color="#2be7aa">business_center</v-icon>
        </v-btn>
        <v-btn dark color="black" flat value="Chat">
          <span>Chat</span>
          <v-icon color="#2be7aa">chat</v-icon>
        </v-btn>
        <v-btn dark color="black" flat value="Forecast">
          <span>Forecast</span>
          <v-icon color="#2be7aa">star_border</v-icon>
          <!-- <v-icon>grade</v-icon> -->
        </v-btn>
        <v-btn dark color="black" flat value="Task">
          <span>Task</span>
          <v-icon color="#2be7aa">receipt</v-icon>
        </v-btn>
      </v-bottom-nav>
      <!-- {{bottomNav }} -->
    </v-layout>
  </v-container>
  <!-- </v-card> -->
</template>

<script>
import babyHome_titile from "../components/babyHome_title";
import babyHome_message from "../components/babyHome_message";
import babyHome_content from "../components/babyHome_content";
import market_title from "../components/market_title";
import chat_title from "../components/chat_title";
import forecast_title from "../components/forecast_title";
import task_title from "../components/task_title";
export default {
  data() {
    return {
      // 通知内容
      // msg: [
      //   {
      //     content:
      //       "Your luck draw has been released, sorry to tell you that you have no egg assigned, please try again :-D"
      //   },
      //   {
      //     content: "Astrobaby is hungry now"
      //   }
      // ],
      displayFlag: 0,

      bottomNav: "Home",
      contentHeight: document.documentElement.clientHeight
    };
  },
  components: {
    babyHome_titile,
    babyHome_content,
    babyHome_message,
    market_title,
    chat_title,
    forecast_title,
    task_title
  },
  watch: {
    // 滑动跳转
    bottomNav: function(newVal, oldVal) {
      switch (newVal) {
        case "Home":
          console.log("current page = " + newVal);
          this.displayFlag = 0;
          break;
        case "Market":
          console.log("current page = " + newVal);

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
    }
  },
  methods: {
    jumpTo: function(val) {
      // console.log(val);
      this.bottomNav = val;
      // this.$refs.babyHome_content.handleParentClick("hello child")
    },
    // 调用子组件函数
    clickParent() {
      // this.$refs.babyHome_content.imgClick;
      this.$refs.babyHome_content.handleParentClick("hello child");
    },
    clickMessage() {
      console.log("click message");
    }
  },
  valueChange(val) {
    console.log("valueChange");
  }
};
</script>


