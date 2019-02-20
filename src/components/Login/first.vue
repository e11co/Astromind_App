<template>
  <v-container grid-list-large text-xs-center align-center  >
    <v-layout row wrap>  
      <div id="first">
        <div id="bg"> 
           

           <v-flex xs8>
              <div id="tab1">Log in</div>
           </v-flex>
          <v-flex offset-xs8>
            <div id="tab2">   
              <router-link to="second1">  
                Sign up
              </router-link>
            </div> 
            </v-flex>
          </div>
          <div>
      <div class="loginForm_1">
            <LoginForm />
      </div>
        <v-flex align-center xs12>
            <div class="other-login">or Log in with</div>
            <div class="other-img">
                <img src="../../assets/fackbook.png">
                <img src="../../assets/ins.png">
                <img src="../../assets/twitter.png">
                <img src="../../assets/wechat.png">
            </div>
          </v-flex>
        </div>  
      </div> 
    </v-layout>
  </v-container>
</template>

<script>
import ajax from "../ajax";
import LoginForm from "../forms/loginForm";

export default {
  components: {  LoginForm },
  name: "first",
  // data:{} 将会是全局属性，易造成污染；data(){return{}} 将只在本组件有效
  data() {

    return {
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 表单提交
    // handleSubmit() {
    //   // 验证表单
    //   this.$refs.ruleForm.validate(valid => {
    //     if (valid) {
    //       console.log("验证通过");

    //       // axios 请求
    //       // ajax("http://192.168.0.192:8888/login",{"username":this.ruleForm.username,"password":this.ruleForm.password},(data) => {
    //       ajax(
    //         "http://139.199.195.199:8888/login",
    //         {
    //           username: this.ruleForm.username,
    //           password: this.ruleForm.password
    //         },
    //         data => {
    //           console.log("请求成功");
    //           console.log(data.result);
    //           if (data.result == true) {
    //             console.log("登录成功");
    //             alert("登录成功");
    //             this.$router.push("/Home"); //跳转
    //             sessionStorage.setItem("username", this.ruleForm.username); //传递username
    //           } else {
    //             alert("帐户或密码错误,请重新输入");
    //           }
    //         },
    //         err => {
    //           console.log("请求失败");
    //         }
    //       );
    //     } else {
    //       console.log("验证不通过");
    //     }
    //   });
    // }


  }
};
</script>

<style scoped>
.el-form {
  padding-left: 2.625rem;
}
.div-user,
.div-pass {
  position: relative;
}


.other-login {
  /* padding-top: 4.2rem; */
  font-size: 0.75rem;
  color: rgb(153, 153, 153);
  font-family: Acumin Variable Concept;
  margin-top: 25%;
}
.other-img img {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1.45rem;
  /* margin-bottom: 50%; */
}
.other-img {
  margin-top: 4%;
  /* padding-left: 2.75rem; */
}

/*登录和注册标题*/
#first {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-top: 5%
  
  /* background-image: url("../../assets/bgi.png"); */
}
.loginForm_1 {
  width: 100%;
  height: 100%;
 
  margin-top: 20%
  
  /* background-image: url("../../assets/bgi.png"); */
}


#tab1 {
  font-size: 3rem;
  font-family: Acumin Variable Concept;
  color: rgb(91, 119, 255);
  
}
#tab2 {
  font-size: 1rem;
  font-family: Acumin Variable Concept;
  color: rgb(186, 186, 186);
  padding-top: 2.975rem;

}
a {
  text-decoration: none;
  color: rgb(186, 186, 186);
}
.router-link-active {
  text-decoration: none;
}
</style>
