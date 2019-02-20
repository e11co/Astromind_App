<template>
	<div id="time">
		<div class="time">
			<span>{{minute}}:{{second}}</span>
			<p>The system will generate an Astr-
			oegg and every half an hour ran-
			domly select a lucky person who will buy directly.</p>				
		</div>
	</div>
</template>

<script>
import ajax from '../ajax'

export default {
	name:"Time",
	data() {
    return {
      minutes: 0,
      seconds: 10
    };
  },
  mounted() {
    this.add();
  },
  methods: {
    // 倒计时
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    add: function() {
      const self = this;
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);

        // 抽奖axios
        // ajax("http://192.168.0.192:8888/isLuckyer",{"address":"0xE600e6142c27B8e161d73239444c10B8334654e3"},(data) => {
        ajax("http://139.199.195.199:8888/isLuckyer",{"address":"0xE600e6142c27B8e161d73239444c10B8334654e3","walletAddress":sessionStorage.getItem("walletAddress")},(data) => {
	        console.log("请求成功")
	        console.log(data.result)
	        if(data.result == false){
            self.$router.push({name:'fail'});
            alert("别气馁，再接再厉")
	        }else{
            self.$router.push({name:'success'});
            alert("恭喜抽奖成功")
	        }
	      }, (err) => {
	          console.log("请求失败");
	      });
        } else {
          _this.seconds -= 1; 
        }
      }, 1000);
    }
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  }
}

</script>

<style scoped>

/*背景图*/
  #time{
	background-image: url("../../assets/homepage.png");
	width:100%;
	height:100%;
	background-repeat: no-repeat;
	-webkit-background-size: 100% 100%;
	background-size: 100% 100%;
  }

  /*倒计时*/
  .time{
  	background-image: url("../../assets/time.png");
  	-webkit-background-size: 100% 100%;
  	background-size: 100% 100%;
  	background-repeat: no-repeat;
  	width: 14.5rem;
  	height: 24.275rem;
  	position: relative;
  	top:3.125rem;
  	left: 2.125rem;
  }
  .time span{
  	font-family:  Acumin Variable Concept; 
  	font-size: 2rem;
  	color: rgb(102,102,102);
  	position: absolute;
  	left:4.625rem;
  	top:9.575rem;
  }
  .time p{
	font-size: 0.75rem;
	color: rgb(51,51,51);
	font-family:  Acumin Variable Concept;
	width: 12.25rem;
	position: absolute;
	left:1.125rem;
	top:13rem;
  }
</style>