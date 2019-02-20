<template>
  <div class="babytalkcontent" v-if="this.isShow">
    <div>{{this.talkcontent}}</div>
    <!-- <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image> -->
  </div>
</template>

<script>
/* 
    baby说话：
         参数： talkcontent 说话内容
                isShow      是否显示
            

*/
export default {
  props: {
    talkcontent: {
      type: String
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //   babytalk: "你好啊hhhhhhh 你好啊 "
    };
  }
};
</script>

<style >
.babytalkcontent {
  padding: 8px;
  background-color: rgb(141, 175, 247);
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 75%;
  word-wrap: break-word;
}
</style>
