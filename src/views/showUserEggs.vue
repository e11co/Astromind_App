<template>
    <v-layout
        align-center
        justify-center
        row
        fill-height
        v-touch="{
            right: () => backHome()
          }"
    >
        <v-toolbar app flat light height="50">
            <!-- <v-toolbar app flat="" light height="70" color="white" > -->
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
            <v-btn icon @click="backHome">
                <v-icon>navigate_before</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <!-- <v-toolbar-title slot="extension" class="white--text">Title</v-toolbar-title> -->
            <!-- <v-spacer></v-spacer> -->
            <v-toolbar-title>My Eggs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
        <v-icon>favorite</v-icon>
            </v-btn>-->
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backHome() {
      this.$router.go(-1); //跳转
    }
  }
};
</script>

<style>
</style>
