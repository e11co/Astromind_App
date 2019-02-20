<template>
	<div id="fail">
		<div class="fail">
          <router-link to="Store">
            <img src="../../assets/sign up again.png">
          </router-link>
      </div>
	</div>
</template>

<script>
export default {
  name: "fail"
};
</script>

<style scoped>
#fail {
  background-image: url("../../assets/homepage.png");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}
.fail {
  background-image: url("../../assets/fail.png");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 14.5rem;
  height: 19rem;
  position: relative;
  top: 6.125rem;
  left: 2.125rem;
}
.fail img {
  width: 9.15rem;
  height: 3.1rem;
  position: absolute;
  left: 2.75rem;
  bottom: 0.925rem;
}
</style>