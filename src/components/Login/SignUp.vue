<template>
  <div class="hide-overflow" style="position: relative;">
    <!-- <backBtn/> -->
    <!-- <v-system-bar status color="primary" lights-out>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
    </v-system-bar>-->
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card flat>
        <v-card-title>
          <backBtn/>
        </v-card-title>
      </v-card>
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Sign-up</span>
          <!-- <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
          ></v-avatar>-->
        </v-card-title>
        <!-- <v-window  >
        <v-window-item >-->
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="nameRules"
            label="Enter a username"
            :counter="20"
            required
            clearable
            prepend-icon="account_circle"
          ></v-text-field>
          <!-- <span
            class="caption grey--text text--darken-1"
          >This username will be used to log in to the app.</span> -->
          <v-text-field
            name="email"
            label="Enter your email"
            v-model="email"
            :rules="emailRules"
            :counter="20"
            required
            value
            clearable
            prepend-icon="email"
          ></v-text-field>
          <!-- <span
            class="caption grey--text text--darken-1"
          >This email will be used to retrieve your password.</span> -->
        </v-card-text>
        <!-- </v-window-item> -->
        <!-- <v-window-item  > -->
        <v-card-text>
          <v-text-field
            name="password"
            v-model="password"
            label="Enter a password"
            :rules="passwordRules"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            :counter="20"
            required
            clearable
            prepend-icon="lock"
          ></v-text-field>
          <!-- <span
            class="caption grey--text text--darken-1"
          >Please enter a password for your account.</span> -->
          <v-text-field
            name="confirmPassword"
            v-model="confirmPassword"
            label="Confirm Password"
            :rules="[confirmPasswordRules]"
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            :counter="20"
            required
            clearable
            prepend-icon="lock"
          ></v-text-field>
          <!-- <span class="caption grey--text text--darken-1">Please confirm your password.</span> -->
        </v-card-text>
        <!-- </v-window-item> -->
        <!-- <v-window-item  > -->
        <div class="pa-3 text-xs-center">
          <v-img class="mb-3" contain height="128" :src="imgSrc"></v-img>
          <h3 class="title font-weight-light mb-2">Welcome to Astromind !</h3>
          <span class="caption grey--text">Thanks for signing up!</span>
        </div>
        <!-- </v-window-item>
        </v-window>-->
        <!-- <v-divider></v-divider> -->
        <v-layout align-center justify-center row>
          <v-card-actions>
            <!-- <v-btn
                :disabled="step === 3"
                color="primary"
                depressed
                @click="step++"
            >
                Login!
            </v-btn>-->
            <v-btn
              :disabled="!valid"
              @click="submit"
              round
              color="#d86a58"
              dark
              large
              :loading="loadingFlag"
            >Sign Up</v-btn>
          </v-card-actions>
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
      </v-card>
    </v-form>
  </div>
</template>

<script>
import ajax from "../ajax";
import backBtn from "../BackBtn";

export default {
  data: () => ({
    loadingFlag: false,
    btnMessage: "",
    dialogImg: "",
    dialogMessage: "",
    dialog: false,
    // dialog: false,
    imgSrc: require("../../assets/img/shizi.png"),
    show1: false,
    show2: false,
    valid: true,
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    nameRules: [
      v => !!v || "username is required",
      v => (v && v.length <= 20) || "Name must be less than 10 characters"
    ],
    passwordRules: [
      v => !!v || "password is required",
      v =>
        (v && v.length <= 20 && v.length >= 6) ||
        "password must be less than 6 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  components: {
    backBtn
  },
  computed: {
    confirmPasswordRules() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match."
        : true;
    }
  },
  methods: {
    submit() {
      this.loadingFlag = true;
      if (this.$refs.form.validate()) {
        sessionStorage.setItem("username", this.username); //传递username
        ajax(
          "http://139.199.195.199:8888/register",
          {
            username: this.username,
            password: this.password,
            email: this.email
          },
          data => {
            console.log("请求成功");
            console.log(data);
            this.$refs.form.reset();
            if (data.result == 201) {
              console.log("登录成功");

              this.dialogMessage = " Welcome To Astrobaby";
              this.dialogImg = require("../../assets/img/tiancheng.png");
              this.btnMessage = "Go To Login !";
              this.dialog = true;

              //   this.$router.push("/myfirst"); //跳转

              // console.log("session === " + sessionStorage.getItem("username") )
            } else {
              this.dialogMessage = "An undocumentable error has occurred";
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
    btnEvent() {
      this.dialog = false;
      if (this.btnMessage === "Go To Login !") {
        this.$router.push("/login"); //跳转
      }
      this.loadingFlag = false;
    }
  }
};
</script>
