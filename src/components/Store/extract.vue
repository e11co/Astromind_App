<template>
	<div id="extract">
		<div class="extract">
			<el-button type="text" @click="open4">
				<img src="../../assets/sign up.png">
			</el-button>
		</div>
	</div>
</template>

<script>
import ajax from "../ajax";

export default {
  name: "extract",
  methods: {
    open4() {
      this.$confirm("Registration will freeze 1 ABC", "", {
        confirmButtonText: "YES",
        cancelButtonText: "NO",
        type: "success",
        center: true
      })
        .then(action => {
          // ajax("http://192.168.0.192:8888/lotteryEnroll",{"walletAddress":sessionStorage.getItem("walletAddress")},(data) => {
          ajax(
            "http://139.199.195.199:8888/lotteryEnroll",
            { walletAddress: sessionStorage.getItem("walletAddress") },
            data => {
              console.log("请求成功");
              console.log(data.result);
              if (data.result == false) {
                alert("报名失败");
              } else {
                this.$router.push({ name: "Time" });
              }
            },
            err => {
              console.log("请求失败");
            }
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.extract {
  background-image: url(../../assets/extract-bgi.png);
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  width: 14.5rem;
  height: 24.825rem;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  margin-left: 2.125rem;
  margin-top: 0.825rem;
  position: relative;
}
span img {
  width: 6.55rem;
  height: 2.8rem;
  position: absolute;
  left: 3.975rem;
  bottom: 1.075rem;
}
</style>