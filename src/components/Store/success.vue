<template>
	<div id="success">
		<div class="success">
			<p>{{dna}}</p>
			<div class="egg"><img src="../../assets/egg.png"></div>
      <div class="share">
          <router-link to="Home">
            <img src="../../assets/share.png">
          </router-link>
      </div>
		</div>
	</div>
</template>

<script>
export default {
  name: "success",
  data() {
    return {
      dna: "#9527"
    };
  },
  created() {
    // ajax(
    //   "",
    //   {},
    //   data => {
    // 		console.log("请求成功");
    //   },
    //   err => {
    //     console.log("请求失败");
    //   }
    // );
  }
};
</script>

<style scoped>
#success {
  background-image: url("../../assets/homepage.png");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.success {
  background-image: url("../../assets/success.png");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 14.5rem;
  height: 24.275rem;
  position: relative;
  top: 4.125rem;
  left: 2.125rem;
}
p {
  font-family: Acumin Variable Concept;
  font-size: 0.65rem;
  position: absolute;
  left: 1.975rem;
  top: 12.3rem;
  color: rgb(102, 102, 102);
}
.egg img {
  width: 4.45rem;
  height: 4.45rem;
  position: absolute;
  right: 5.075rem;
  top: 13.225rem;
}
.share img {
  width: 6.55rem;
  height: 2.8rem;
  position: absolute;
  bottom: 1.075rem;
  left: 3.975rem;
}
</style>