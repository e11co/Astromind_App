<template>
  <v-layout>
    <astromind_title :showMenu="false" :titleContent="`Astromind`"/>
    <h1>{{this.des}}</h1>
  </v-layout>
</template>

<script>
import astromind_title from "../components/astromind_title";
export default {
  props: ["des"],
  components: {
    astromind_title
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
