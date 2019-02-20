/********
 * 连接ipfs节点
 * ************/
import ipfsClient from "ipfs-http-client";
import fileReaderPullStream from "pull-file-reader";

var ipfs;
var nodes = [];

function connectDaemon(nodeInfo) {
  /**
   * 连接远程ipfs节点时，需要将远程ipfs节点Addresses.API /ip4/127.0.0.1/tcp/5001改为 Addresses.API /ip4/0.0.0.0/tcp/5001
   */
  // this.node = ipfsClient("/ip4/192.168.123.81/tcp/5001"); // leaving out the arguments will default to these values

  ipfs = ipfsClient("/ip4/" + nodeInfo.ip + "/tcp/" + nodeInfo.port); // leaving out the arguments will default to these valuess
  // this.node = ipfsClient("/ip4/" + nodeInfo.ip + "/tcp/" + nodeInfo.port); // leaving out the arguments will default to these valuess

  // this.node = ipfsClient("localhost", "5001", { protocol: "http" }); // leaving out the arguments will default to these values
  // this.node = ipfsClient(nodeInfo.ip, nodeInfo.port, { protocol: "http" }); // leaving out the arguments will default to these values
  console.log("------connect ipfs daemon--------");
  console.log(ipfs);

  return ipfs;
}

/****
 * 停止连接ipfs节点
 */
function stopConnect() {
  ipfs
    .stop()
    .then(res => {
      console.log("ipfs is stoping");
    })
    .catch(err => {
      console.log("something error in stopConnect");
    });
}

/**
 * 获取可用的节点 --- 测试 不可用
 */
function getAllNode() {
  let nodeInfo = {
    ip: "123",
    port: "222"
  };
  nodeInfos.push(nodeInfo);
  // console.log(JSON.stringify(nodeInfos));
}

/**
 * 添加一个可用的节点
 */
function setNode(nodeInfo) {
  nodes.push(nodeInfo);
}

function storeObj(storageData) {
  console.log("添加 ipfs 储存 数据 : " + storageData.fileContent);

  return ipfs.add({
    path: storageData.fileName,
    content: Buffer.from(JSON.stringify(storageData.fileContent))
  });
}

// function storeObj(storageData) {
//   console.log("添加 ipfs 储存 数据 : " + storageData.fileContent);

//   ipfs
//     .add({
//       path: storageData.fileName,
//       content: Buffer.from(JSON.stringify(storageData.fileContent))
//     })
//     .then(res => {
//       console.log("added File hash is : " + res[0].hash);

//       return res;
//       // this.word.name = res[0].path;
//       // this.word.hash = res[0].hash;
//       // ipfs
//       //   .cat(this.word.hash)
//       //   .then(res => {
//       //     this.word.content = res.toString();

//       //     console.log(this.word);
//       //   })
//       //   .catch(err => {
//       //     console.log("something error in node_cat" + err);
//       //   });
//     })
//     .catch(err => {
//       console.log("something error in node_add" + err);
//     });
// }

export { connectDaemon, stopConnect, getAllNode, storeObj };
