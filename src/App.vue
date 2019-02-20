<template>
  <div id="app">
    <v-app>
      <!-- <v-navigation-drawer app></v-navigation-drawer> -->
      <!-- <v-toolbar app></v-toolbar> -->
      <v-content>
        <!-- <v-container fluid grid-list-xs> -->
        <router-view></router-view>

        <!-- </v-container> -->
      </v-content>
      <!-- <v-footer app></v-footer> -->
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
