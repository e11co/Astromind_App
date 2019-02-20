<template>
  <v-container fluid grid-list-xs>
    <v-layout align-space-between justify-start column fill-height>
      <backBtn/>
      <v-flex mt-4></v-flex>
      <v-img :aspect-ratio="1.2" :src="imgSrc" contain></v-img>
      <!-- <v-layout align-center justify-center column >
        <v-flex d-flex xs12 sm12 md12 v-for="n in 1" :key="n">
              <v-spacer></v-spacer>
        </v-flex>
        
      </v-layout>-->

      <LoginForm/>
      <v-layout align-center justify-center column>
        <v-flex d-flex xs12 sm12 md12 v-for="n in 10" :key="n">
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
      <!-- <otherLogin/> -->
    </v-layout>
  </v-container>
</template>

<script>
import ajax from "../ajax";
import LoginForm from "../forms/loginForm";
import backBtn from "../BackBtn";

export default {
  name: "M_first",
  components: { 
    LoginForm,
    // otherLogin,
    backBtn 
    },
  data() {
    return {
      imgSrc: require("../../assets/img/shuangyu.png")
    };
  },
  methods: {}
};
</script>


<style>
/* #app {
  background-image: url("../../assets/bgi.png");
} */

a {
  text-decoration: none;
  color: rgb(186, 186, 186);
}
</style>

