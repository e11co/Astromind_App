import ajax from "../../assets/js/ajax";
// import jsonp from "jsonp";

let hatch = function (obj) {

  // 孵化请求
  ajax(
    "http://139.199.195.199:8888/hatch", {

      //   username: obj.username,
      //   constellation: obj.day < dayArr[obj.month - 1] ?
      //     constellationArr[obj.month - 1] :
      //     constellationArr[obj.month],
      babyName: obj.babyName,
      //   gender: obj.gender,
      //   date: obj.date,
      dna: obj.dna,
      dev: obj.dev,
      figure: 231312312323,
      eggId: obj.eggId,
      //   eggId: obj.eggId,
      walletAddress: obj.walletAddress
    },
    data => {
      console.log("hatch请求成功");
      // return "success";
      //   let vm = this;
      //   alert("baby已孵化完毕");
      //   vm.$router.push({
      //     name: "Home"
      //   });
      //   vm.fullscreenLoading = false;

      //   obj.eggId; //获取指定key本地存储的值//获取eggId


      //   sessionStorage.setItem(
      //     "constellation",
      //     day < dayArr[month - 1] ?
      //     constellationArr[month - 1] :
      //     constellationArr[month]
      //   ); //传递星座


      // sessionStorage.setItem("date", this.user.date); //传递出生日期
      //   sessionStorage.setItem("firstName", this.user.firstName); //传递firstName
      //   sessionStorage.setItem("lastName", this.user.lastName); //传递lastName
      //   sessionStorage.setItem("city", this.user.city); //传递city
      //   sessionStorage.setItem("country", this.user.country); //传递country
      //   sessionStorage.setItem("province", this.user.province); //传递province
      //   sessionStorage.setItem("radio", this.user.radio); //传递province
      //   console.log(obj.radio);
      //   sessionStorage.setItem("year", year);
      //   sessionStorage.setItem("min", min);
      //   sessionStorage.setItem("hour", hour);
      //   sessionStorage.setItem("day", day);
      //   sessionStorage.setItem("month", month);
    },
    err => {
      console.error("hatch请求失败");
      // return "fail";
    }
  );

};
export default hatch;
