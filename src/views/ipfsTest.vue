<template>
  <v-layout align-space-between justify-center column>
    <v-flex>
      <h3>i am ipfsTest</h3>
      <h3>current ipfs node id :</h3>
      <span>{{ipfsId}}</span>
    </v-flex>
    <!-- 保存文字 -->
    <v-flex>
      <v-text-field
        v-model="uploadData.fileName"
        :counter="20"
        clearable
        label="new file name"
        required
      ></v-text-field>
      <v-text-field
        v-model="uploadData.fileContent"
        :counter="50"
        clearable
        label="enter content"
        required
      ></v-text-field>
      <v-btn color=" darken-3" @click="addWord">addWord</v-btn>
    </v-flex>
    <!-- 上传文件 -->
    <v-flex>
      <input type="file" value id="file" @change="uploadConfig">
    </v-flex>
    <v-flex>
      <v-btn color="green darken-1">addFile</v-btn>
    </v-flex>
    <!-- 上传信息显示 -->
    <v-flex mt-5>
      <h2>uploadWord</h2>&nbsp
      <h3>fileName:</h3>
      <span>{{wordName}}</span>
      &nbsp
      <h3>fileHash:</h3>
      <span>{{wordHash}}</span>
      &nbsp
      <h3>fileContent:</h3>
      <span>{{wordContent}}</span>
    </v-flex>
    <v-flex mt-5>
      <h2>uploadFile</h2>&nbsp
      <h3>fileName:</h3>
      <span>{{fileName}}</span>
      &nbsp
      <h3>fileHash:</h3>
      <span>{{fileHash}}</span>
    </v-flex>
    <!-- 停止节点 -->
    <v-flex mt-5>
      <v-btn color="green darken-1" @click="stopNode">stopNode</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
// 引入ipfs
// import IPFS from "ipfs";
import ipfsClient from "ipfs-http-client";
import fileReaderPullStream from "pull-file-reader";
// import { connectDaemon } from "../assets/js/ipfsStorage.js";
import * as ipfsStorageModule from "../assets/js/ipfsStorage.js";

export default {
  name: "ipfsTest",
  data: function() {
    return {
      ipfsId: "",
      node: {},
      uploadData: {
        fileName: "",
        fileContent: ""
      },
      word: {
        name: "",
        hash: "",
        content: ""
      },
      file: {
        name: "",
        hash: ""
      }
    };
  },
  mounted: function() {
    this.getAllNode();

    // 连接ipfs节点信息
    var nodeInfo = {
      ip: "119.29.135.217",
      port: "5001"
    };

    this.node = ipfsStorageModule.connectDaemon(nodeInfo);

    this.node
      .id()
      .then(res => {
        // console.log("this node id is :" + JSON.stringify(res));
        this.ipfsId = res.id;
      })
      .catch(err => {
        console.log("id error");
      });

    // 查看本地文件
    this.node.pin.ls().then(res => {
      console.log(res[0].type); //indirect 文件 ； "recursive" 目录
    });
  },

  computed: {
    wordName: function() {
      return this.word.name;
    },
    wordHash: function() {
      return this.word.hash;
    },
    wordContent: function() {
      return this.word.content;
    },
    fileHash: function() {
      return this.file.hash;
    },
    fileName: function() {
      return this.file.name;
    }
  },
  methods: {
    /**
     * 添加字符
     */
    addWord() {
      // this.startNode();

      console.log("i am addWOrd");

      this.node
        .add({
          path: this.uploadData.fileName,
          content: Buffer.from(this.uploadData.fileContent)
        })
        .then(res => {
          console.log("added File hash is : " + res[0].hash);
          this.word.name = res[0].path;
          this.word.hash = res[0].hash;
          this.node
            .cat(this.word.hash)
            .then(res => {
              this.word.content = res.toString();

              console.log(this.word);
            })
            .catch(err => {
              console.log("something error in node_cat" + err);
            });
        })
        .catch(err => {
          console.log("something error in node_add" + err);
          this.word.hash = "error";
          this.word.content = "error";
        });
    },

    /**
     * 文件上传
     */
    uploadConfig(e) {
      // let formData = new FormData();
      // formData.append("file", e.target.files[0]);
      // console.log(formData);
      // console.log(e.target.files[0]);
      /*  */
      let ipfsId; //目录hash
      let file = e.target.files[0]; //待上传文件 -- 多文件需要遍历 e.target.files数组
      const fileStream = fileReaderPullStream(file); //文件流
      const fileDetails = {
        path: file.name,
        content: fileStream
      };
      const options = {
        wrapWithDirectory: true,
        progress: prog => console.log(`received: ${prog}`)
      };
      this.node
        .add(fileDetails, options)
        .then(response => {
          console.log("file name " + response[0].path);
          console.log("file hash " + response[0].hash);

          this.file.name = response[0].path;
          this.file.hash = response[0].hash;
          // CID of wrapping directory is returned last
          ipfsId = response[response.length - 1].hash;
          console.log(ipfsId);
          // this.setState({ added_file_hash: ipfsId });
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 获取可用的节点
     */
    getAllNode() {
      let nodeInfos = [];
      let nodeInfo = {
        ip: "123",
        port: "222"
      };
      nodeInfos.push(nodeInfo);
      // console.log(JSON.stringify(nodeInfos));
    }
  }
};
</script>
<style>
h3 {
  color: rgb(104, 104, 104);
}
h2 {
  color: rgb(175, 54, 54);
}

span {
  color: darkgreen;
}
</style>
