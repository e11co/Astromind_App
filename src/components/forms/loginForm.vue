<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-layout align-space-between justify-center column>
      <v-flex px-4>
        <v-text-field
          v-model="username"
          :rules="nameRules"
          :counter="20"
          clearable
          prepend-icon="account_circle"
          label="username"
          required
        ></v-text-field>
      </v-flex>
      <v-flex px-4>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility_off' : 'visibility'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          label="passowrd"
          clearable
          prepend-icon="lock"
          @click:append="show1 = !show1"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center column>
      <v-flex xs4>
        <v-btn
          :disabled="!valid"
          @click="submit"
          round
          color="#d86a58"
          dark
          large
          :loading="loadingFlag"
        >Login</v-btn>
      </v-flex>
      <v-dialog v-model="dialog" max-width="300" persistent>
        <v-card>
          <v-img :src="dialogImg" contain aspect-ratio="2.75"></v-img>
          <!-- <v-card-title
                          class="headline  lighten-2"
                          primary-title
                          >
          </v-card-title>-->
          <v-card-text>{{dialogMessage}}</v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="btnEvent">{{btnMessage}}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-form>
</template>

<script>
// import axios from "axios";
import ajax from "../ajax";

export default {
  data: () => ({
    loadingFlag: false,
    btnMessage: "",
    dialogImg: "",
    dialogMessage: "",
    dialog: false,
    show1: false,
    valid: true,
    // username: "",
    username: sessionStorage.getItem("username"),
    nameRules: [
      v => !!v || "username is required",
      v => (v && v.length <= 20) || "name must be less than 10 characters"
    ],
    password: "",
    passwordRules: [
      v => !!v || "password is required",
      v =>
        (v && v.length <= 20 && v.length >= 6) ||
        "password must be less than 6 characters"
    ]
  }),
  mounted() {
    console.log(
      "session == " + JSON.stringify(sessionStorage.getItem("username"))
    );
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loadingFlag = true;
        ajax(
          "http://139.199.195.199:8888/login",
          {
            username: this.username,
            password: this.password
          },
          data => {
            console.log(data.result);
            if (data.result == true) {
              console.log("登录成功");
              // 登录成功，设置显示信息
              this.dialogMessage = "Welcome To Astrobaby";
              this.dialogImg = require("../../assets/img/tiancheng.png");
              this.btnMessage = " Let'go";
              this.dialog = true;
              // 更新用户信息
              let userInfo = {
                username: this.username
              };
              this.$store.commit("setUserInfo", userInfo);
            } else {
              this.dialogMessage =
                "Username or password is incorrect, please try again";
              this.dialogImg = require("../../assets/img/jinniu.png");
              this.btnMessage = "Try Again";
              this.dialog = true;
            }
          },
          err => {
            console.log("请求失败");
          }
        );
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    btnEvent() {
      this.dialog = false;
      if (this.btnMessage === " Let'go") {
        this.$router.push("/myHome"); //跳转
      }
      this.loadingFlag = false;
    }
  }
};
</script>