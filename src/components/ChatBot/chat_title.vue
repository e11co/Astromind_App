<template>
  <v-layout column>
    <astromind_title :showMenu="false" :titleContent="`Astromind`"/>
    <!-- <h1>{{this.des}}</h1> -->
    <chat_content v-if="havaBaby"  />
    <error_page :imgsrc="`empty1.jpg`" :errmsg="errormsg" v-on:refresh="refresh" v-else/>
  </v-layout>
</template>

<script>
import astromind_title from "../astromind_title";
import chat_content from "./chat_content";
import error_page from "../404/errorPage";
export default {
  props: ["des"],
  components: {
    astromind_title,
    chat_content,
    error_page
  },
  data() {
    return {
      //是否显示empty/error 页面
      errormsg: "you could't use this function before you have an astrobaby."
    };
  },
  computed: {
    havaBaby() {
      return this.$store.state.userInfo.babyCount > 0 ? true : false;
    }
  },
  methods: {
    // 页面刷新
    refresh() {}
  }
};
</script>

<style>
</style>
