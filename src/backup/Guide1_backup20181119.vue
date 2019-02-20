<template>
  <!-- <div class="swipe">
    <el-carousel trigger="click" :height="screenHeight + 'px'">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <div class="skip">
          <router-link to="welcome">跳过</router-link>
        </div>
        <img :src="img.url" class="imgUrl">
      </el-carousel-item>
    </el-carousel>
  </div>-->
  <v-dialog fullscreen v-model="dialog">
    <v-carousel d-flet hide-delimiters :height="screenHeight">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
        <v-layout align-space-around justify-end column fill-height>
          <v-btn v-if="i === 2 " to="welcome" round color="transparent" class="primary--text">go</v-btn>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialog: true,
      items: [
        {
          src: require("../assets/img/1.png")
        },
        {
          src: require("../assets/img/2.png")
        },
        {
          src: require("../assets/img/3.png")
        }
      ],

      // imgList: [
      //   { url: require("../assets/img/1.png") },
      //   { url: require("../assets/img/2.png") },
      //   { url: require("../assets/img/3.png") }
      // ],
      // screenHeight: ""
      screenHeight: document.documentElement.clientHeight - 32,
      timer: ""
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.documentElement.clientHeight - 32;
      })();
    };
  },
  watch: {
    screenHeight(val) {
      if (!this.timer) {
        this.screenHeight = val;
        this.timer = true;
        setTimeout(function() {
          this.timer = false;
        }, 400);
      }
    }
  }
  // mounted() {
  //   var clientH = document.documentElement.clientHeight;
  //   console.log(clientH);
  //   this.height = clientH + "px";
  // }
};
</script>

<style scoped>
.swipe {
  position: relative;
}
.skip {
  position: absolute;
  width: 100px;
  height: 35px;
  /* border: 1px solid black; */
  border-radius: 0.75rem;
  text-align: center;
  line-height: 35px;
  right: 1px;
  top: 10px;
}
a {
  font-size: 1rem;
  text-decoration: none;
  font-family: Berlin Sans FB;
  color: #000;
}
.imgUrl {
  height: 100%;
  width: 100%;
}
#app {
  background-color: transparent;
}
</style>
