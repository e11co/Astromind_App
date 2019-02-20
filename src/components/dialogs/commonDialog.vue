<template>
  <v-dialog v-model="this.dialogFlag" persistent max-width="320">
    <v-card>
      <v-img :src="this.dialogImg" aspect-ratio="2" contain>
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate></v-progress-circular>
        </v-layout>
      </v-img>
      <v-card-title class="headline">{{this.headline}}</v-card-title>
      <v-card-text>{{this.content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          flat
          @click.native="clickEvent('left')"
        >{{this.leftOption}}</v-btn>
        <v-btn
          color="green darken-1"
          flat
          @click.native="clickEvent('right')"
        >{{this.rightOption}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* 
    公共模态框 用法：
        传入参数：  dialogFlag :  模态框开关 -- 默认关
                    dialogImg ： 模态框图片 
                    headLine ：  模态框标题文字
                    content ：    内容文字
                    leftOption：  左边选项文字
                    rightOption： 右边选项文字
    返回点击选项事件：btnClick(Option)

*/
export default {
  props: {
    //   模态框开关，默认： 关
    dialogFlag: {
      type: Boolean,
      default: false
    },
    // 模态框 图片
    dialogImg: {
      default: require("../../assets/img/tiancheng.png")
    },
    // 模态框 标题文字内容
    headline: {
      type: String,
      default: ""
    },
    // 模态框  内容文字
    content: {
      type: String,
      default: ""
    },
    // 模态框左边选项
    leftOption: {
      type: String,
      default: "No"
    },
    // 模态框右边选项
    rightOption: {
      type: String,
      default: "Yes"
    }
  },

  methods: {
    // 给父组件返回点击事件
    clickEvent(val) {
      this.$emit("btnClick", val);
    }
  }
};
</script>

<style>
</style>
