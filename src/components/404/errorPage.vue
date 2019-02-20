<template>
  <div id="err">
    <v-img id="errorImg" :src="errorimgsrc" @click="refresh"></v-img>
    <span>{{this.errmsg}}</span>
  </div>
</template>

<script>
/*
        TODO
*    错误显示页
*   包含点击刷新
*
*/

export default {
  props: ["imgsrc", "errmsg"],
  data() {
    return {
      errorimgsrc: ""
      // errorImgSrc: require("../../assets/img/empty1.jpg")
      // errorImgSrc:require("../../assets/img/"+this.imgSrc)
    };
  },
  mounted() {
    if (this.imgsrc.split(".")[1] === "jpg") {
      this.errorimgsrc = require("../../assets/img/" +
        this.imgsrc.split(".")[0] +
        ".jpg");
    } else if (this.imgsrc.split(".")[1] === "png") {
      this.errorimgsrc = require("../../assets/img/" +
        this.imgsrc.split(".")[0] +
        ".png");
    }
    console.log("props = " + this.imgsrc);
    console.log(this.imgsrc.split(".")[0]);
  },
  computed: {},
  methods: {
    // 父组件刷新
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>

<style>
#errorImg {
  height: calc(100vh - 18.5rem);
}
#err {
  text-align: center;
}
</style>
