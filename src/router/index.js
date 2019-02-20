import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/views/HelloWorld";

import showUserEggs from "@/views/showUserEggs";
import babyCloths from "@/views/babyCloths";

import Guide1 from "@/components/Guide1";

// import first from '@/components/Login/first'
import login from "@/components/Login/Login";
import welcome from "@/components/Login/loginOrSignup";
import signup from "@/components/Login/SignUp";

import forecastDialog from "@/components/dialogs/forecastDialog";
import ipfsTest from "@/views/ipfsTest";

// import Home from '@/components/Home'
// import Store from '@/components/Store'
// import Search from '@/components/Search'
// import Me from '@/components/Me'

// import Me1 from '@/components/Me1'

// import hatch1 from '@/components/hatch1'

// import Forecast from '@/components/Forecast'
// import Task from '@/components/Task'
// import Robot from '@/components/Robot'

// import Time from '@/components/Store/Time'

// import success from '@/components/Store/success'
// import fail from '@/components/Store/fail'

// import Astroegg from '@/components/Astroegg'
// import Wallet from '@/components/Wallet'

// import text1 from '@/components/text1'

// import shouquan from '@/components/shouquan'

// import problem from '@/components/problem'

import myHome from "@/views/myHome";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/Guide1",
      name: "Guide1",
      component: Guide1
    },
    {
      path: "/myHome",
      name: "myHome",
      component: myHome
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/welcome",
      name: "welcome",
      component: welcome
    },
    {
      path: "/signup",
      name: "signup",
      component: signup
    },
    {
      path: "/forecastDialog",
      name: "forecastDialog",
      component: forecastDialog
    },
    {
      path: "/showUserEggs",
      name: "showUserEggs",
      component: showUserEggs
    },
    {
      path: "/babyCloths",
      name: "babyCloths",
      component: babyCloths
    },
    // ipfsTest
    {
      path: "/ipfsTest",
      name: "ipfsTest",
      component: ipfsTest
    }
  ]
});
