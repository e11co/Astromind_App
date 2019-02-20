<template>
    <div>
        <div
            class="message"
            v-for="(message,index) in messages"
            :key="index"
            :class="{own: message.userName === username}"
        >
            <div class="chatTime" v-if="index === 0 || index % 7 === 0">
                <!-- <v-subheader>{{message.date}}</v-subheader> -->
                <span>{{message.date}}</span>
            </div>
            <div class="username" v-if="index>0 && messages[index-1].userName != message.userName">
                <v-avatar size="40" color="grey lighten-4" v-if="message.userName === username">
                    <!-- <img :src="chatAvatar" alt="avatar"> -->
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="avatar">
                </v-avatar>
                <v-avatar size="40" color="grey lighten-4" v-else>
                    <img :src="chatAvatar" alt="avatar">
                </v-avatar>
            </div>
            <div class="username" v-if="index == 0">
                <!-- {{message.userName}} -->
                <v-avatar size="40" color="grey lighten-4" v-if="message.userName === username">
                    <!-- <img :src="chatAvatar" alt="avatar"> -->
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="avatar">
                </v-avatar>
                <v-avatar size="40" color="grey lighten-4" v-else>
                    <img :src="chatAvatar" alt="avatar">
                </v-avatar>
            </div>
            <div style="margin-top: 5px"></div>
            <div class="content">
                <div v-html="message.content"></div>
                <!-- <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image> -->
            </div>
        </div>
    </div>
</template>

<script>
// import Image from "./Image.vue";

export default {
  props: ["messages"],
  data() {
    return {
      rebotImg: require("../../assets/img/me-portrait.png")
      //   chatAvatar:require(this.$store.state.babyInfo.babyImgSrc)
    };
  },
  components: {
    // "chat-image": Image
  },
  computed: {
    username() {
      return this.$store.getters.userInfo.username;
    },
    chatAvatar() {
      //   console.log(this.$store.state.userInfo.babyImgSrc);
      return this.$store.state.userInfo.babyImgSrc;
    }
  },
  methods: {
    //   imageLoad () {
    //     // this.$emit('imageLoad')
    //   }
  }
};
</script>

<style>
span.emoji {
  font-size: 20px;
  vertical-align: middle;
  line-height: 2;
}
span {
  color: dimgray;
}
</style>
