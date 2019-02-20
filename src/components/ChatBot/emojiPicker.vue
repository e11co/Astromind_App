<template>
  <div class="emoji-picker" v-if="this.show">
    <v-card height="300px" v-if="this.show">
      <v-card-title class="blue white--text">
        <span class="headline">Emoji Picker</span>
      </v-card-title>
      <v-card-text>
        <div class="emoji-content">
          <emoji v-for="(emoji,index) in emojis" :key="index" :emoji="emoji" @click="onEmojiClick"></emoji>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import jsonp from "jsonp";
import Emoji from "./Emoji.vue";

export default {
  props: ["show"],
  data() {
    return {
      emojis: []
    };
  },
  created() {
    this.getEmoji();
  },
  methods: {
    getEmoji() {
      // 获取表情包
   /*    let xmlHttp = null;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open(
        "GET",
        "https://raw.githubusercontent.com/shanraisshan/EmojiCodeSheet/master/json/string/People.json",
        false
      );
      xmlHttp.send(null);
      //   console.log(JSON.parse(xmlHttp.responseText).peoples.people);
      this.emojis = JSON.parse(xmlHttp.responseText).peoples.people; */

    // 只是用chakechat情绪
      let emotion = {
        peoples: {
          people: [
            {
              key: "joy",
              value: "😄"
            },
            {
              key: "sadness",
              value: "😣"
            },
            {
              key: "fear",
              value: "😱"
            },
            {
              key: "neutral",
              value: "😐"
            },
            {
              key: "anger",
              value: "😡"
            }
          ]
        }
      };
      this.emojis = emotion.peoples.people;
    },
    onEmojiClick(emoji) {
      this.$emit("click", emoji);
      this.closePicker();
    },
    closePicker() {
      this.$emit("close");
    }
  },
  components: {
    emoji: Emoji
  }
};
</script>

<style>
.emoji-picker {
  background: white;
  position: absolute;
  bottom: 5rem;
  left: 0;
  width: 200px;
  user-select: none;
}
.emoji-picker .emoji-header {
  display: flex;
  padding: 5px;
  box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.15);
}

.emoji-picker .emoji-header .emoji-close {
  margin-left: auto;
}
.emoji-picker .emoji-content {
  margin-top: 10px;
  overflow-y: auto;
  height: 200px;
}
.emoji-picker span {
  cursor: pointer;
  font-size: 25px;
}
</style>
