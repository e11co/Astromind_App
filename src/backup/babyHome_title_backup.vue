<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center row fill-height>
      <v-flex
        v-for="(card , index) in cards"
        v-bind="{ [`xs${card.flex}`]: true }"
        :key="card.title"
      >
        <v-card hover :color="themeColor">
          <v-img :src="card.src" contain aspect-ratio="1" height="50px" @click="imgClick(index)"></v-img>
          <!-- <v-card-title primary-title>
                            <h3 class="headline ml-5 ">{{card.des}}</h3>
          </v-card-title>-->
          <div id="dev_1">
            <h5 style="color:white">{{card.des}}</h5>
          </div>
        </v-card>
        <!-- <h3 class="headline  ">{{card.des}}</h3> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["themeColor"],
  data() {
    return {
      // contentImg:require("../assets/home-content.png"),
      cards: [
        {
          title: "Favorite road trips",
          src: require("../assets/forecast.png"),
          flex: 6,
          des: "forecast"
        },
        {
          title: "Best airlines",
          src: require("../assets/task.png"),
          flex: 6,
          des: "task"
        }
      ]
      // screenHeight:document.documentElement.clientHeight
    };
  },

  methods: {
    imgClick(val) {
      if (val === 0) {
        // forcecast
        console.log("click forcecast");
        // console.log(this.$store.state.screenHeight + "vuex");
        // console.log(this.screenHeight);
      } else {
        // task
        console.log("click task");
      }
    }
  }
};
</script>

<style>
#dev_1 {
  text-align: center;
}
</style>

