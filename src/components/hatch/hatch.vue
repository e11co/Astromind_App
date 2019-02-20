<template>
  <v-layout row justify-center>
    <!-- dialog1 -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-layout column>
        <!-- 标题栏 -->
        <v-toolbar flat light height="50">
          <!-- <v-toolbar app flat="" light height="70" color="white" > -->
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-btn icon @click.native="dialog = false">
            <v-icon color="gray">close</v-icon>
            <!-- <v-icon color="gray">build</v-icon> -->
          </v-btn>
          <!-- <v-toolbar-title slot="extension" class="white--text">Title</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-italic font-weight-bold">Astromind</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <!-- <v-btn icon>
        <v-icon>favorite</v-icon>
          </v-btn>-->
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-toolbar>
        <!-- 问题内容 -->
        <question v-on:questionEnd="end"/>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script>
/* 
    egg孵化为baby子页面

*/

// 引入孵化的问题
import question from "./hatchQuestion";
export default {
  //   props: [],
  data() {
    return {
      dialog: false
    };
  },
  components: {
    question
  },
  computed: {},
  methods: {
    // 开关dialog
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    // hatch结束
    end() {
      this.toggleDialog();

      this.$emit("hatchEnd");

      //baby孵化完成后显示广告
      AdMob.prepareInterstitial({
        adId: "ca-app-pub-3940256099942544/1033173712", //全屏广告id
        autoshow: false
      });
    }
  }
};
</script>

<style>
</style>
