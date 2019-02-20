<template> 
<div class="swipe"> 
    <el-carousel trigger="click" :height="screenHeight">
      <el-carousel-item v-for="(img,index) in imgList" :key="index" >
        <div class="skip"><router-link to="first">跳过</router-link></div>
        <img :src="img.url" class="imgUrl">
      </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      imgList: [
        { url: require("../assets/1.png") },
        { url: require("../assets/2.png") },
        { url: require("../assets/3.png") }
      ],
      // screenHeight: ""
      screenHeight: document.documentElement.clientHeight + "px"
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.documentElement.clientHeight + "px";
        that.screenHeight = window.screenHeight;
      })();
    };
  },
  watch: {
    screenHeight(val) {
      if (!this.timer) {
        this.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
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
  border: 1px solid black;
  border-radius: 0.75rem;
  text-align: center;
  line-height: 35px;
  right: 15px;
  top: 20px;
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
</style>
