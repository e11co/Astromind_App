<template>
  <v-btn icon absolute @click="backBtn" flat>
    <v-icon>arrow_back</v-icon>
  </v-btn>
  <!-- <v-toolbar color="pink" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>My Music</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>
  </v-toolbar>-->
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backBtn() {
      this.$router.go(-1);
    }
  }
};
</script>
