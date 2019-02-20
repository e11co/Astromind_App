<template>
  <v-snackbar
    v-model="snackbar"
    :color="this.color"
    multi-line="multi-line"
    :timeout="timeOut"
    vertical="vertical"
  >
    {{ this.text }}
    <v-btn dark flat @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
/* 
  底部通知组件，
  需要传入参数：
    color --  通知的颜色
    text  --  通知内容
 */
export default {
  props: ["color", "text"],
  data() {
    return {
      timeOut: 6000,
      snackbar: false
    };
  },
  methods: {
    openSnackbat() {
      this.snackbar = true;
    }
  }
};
</script>
