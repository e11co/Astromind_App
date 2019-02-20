<template>
  <v-container fluid grid-list-xs>
    <v-layout align-space-between justify-space-between column fill-height>
      <v-img :aspect-ratio="0.88" :src="imgSrc" contain></v-img>
      <v-flex d-flex xs12 mt-5>
        <v-spacer></v-spacer>
      </v-flex>
      <v-layout align-center justify-center row fill-height mt-2>
        <v-flex d-flex xs6>
          <v-btn round color="#daa07b" dark large to="/login">Login in</v-btn>
        </v-flex>
        <v-flex d-flex xs6>
          <v-btn round color="#da6a54" dark large to="/signup">Sign Up</v-btn>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center column>
        <!-- <v-flex xs12 mt-4>
          <div class="text_1">not now</div>
        </v-flex>-->
        <v-flex xs12 mt-4>
          <v-btn round color="black" dark small flat="flat" to="/ipfsTest">ipfsTest</v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "loginOrSignup",

  data() {
    return {
      imgSrc: require("../../assets/img/shuangzi.png")
    };
  },
  created() {
    //   加载用户数据，若存在的话
  },
  methods: {}
};
</script>

<style>
/* .welcomeImg{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/shuangzi.png");
} */

.text_1 {
  text-decoration-color: rgb(186, 186, 186);
  text-align: center;
}
</style>

