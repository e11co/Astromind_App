<template>
  <v-carousel flet>
    <v-carousel-item v-for="(item,i) in imgList" :key="i" :src="item.url">
      <v-layout align-space-around justify-end column fill-height>
        <v-btn
          v-if="i === 3 "
          to="welcome"
          round
          color="transparent"
          class="primary--text"
          style="position:relative;bottom:80%;"
        >
          <h1 style="color:white">go</h1>
        </v-btn>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
/* 
  des: app引导页面，放置app使用介绍图
  跳转按钮设置在第3张图片显示

*/
export default {
  name: "",
  data() {
    return {
      // 图片地址
      imgList: [
        { url: require("../assets/img/1.jpg") },
        { url: require("../assets/img/2.jpg") },
        { url: require("../assets/img/3.jpg") },
        { url: require("../assets/img/4.jpg") }
        // { url:require("../assets/img/4.png")}
      ]
    };
  },

  mounted() {
    this.$nextTick(() => {
      // 设置组件高度
      document
        .getElementsByClassName("v-carousel")[0]
        .setAttribute(
          "style",
          "height:" + document.documentElement.clientHeight + "px"
        );

      document
        .getElementsByClassName("v-carousel__controls")[0]
        .setAttribute("style", "background: transparent");

      for (let i = 0; i < 6; i++) {
        document
          .getElementsByClassName("v-icon material-icons theme--dark")
          [i].setAttribute("style", "color: white");
      }
    });
  }
};
</script>

<style >
/* .v-btn .v-btn__content .v-icon {
  color: #535353;
}
.v-carousel__controls {
  background: transparent;
} */
</style>
