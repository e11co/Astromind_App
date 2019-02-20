<template>
  <v-layout>
    <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute shift>
      <v-btn dark>
        <span>Baby</span>
        <v-icon>child_care</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Store</span>
        <v-icon>store</v-icon>
      </v-btn>
      <v-btn dark>
        <span>find</span>
        <v-icon>pageview</v-icon>
      </v-btn>
      <v-btn dark>
        <span>me</span>
        <v-icon>accessibility</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-layout>
  <!-- </v-card> -->
</template>

<script>
export default {
  data() {
    return {
      displayFlag: 0,
      bottomNav: 0,
      contentHeight: document.documentElement.clientHeight - 56,
      contentColor: "indigo"
    };
  },
  components: {
    babyHome
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          this.contentColor = "indigo";
          this.displayFlag = 0;
          return "indigo";
        case 1:
          this.contentColor = "teal";
          this.displayFlag = 1;
          return "teal";
        case 2:
          this.contentColor = "brown";
          this.displayFlag = 2;
          return "brown";
        case 3:
          this.contentColor = "blue-grey";
          this.displayFlag = 3;
          return "blue-grey";
      }
    }
  }
};
</script>
