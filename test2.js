// const axios = require('axios');

// const data = {
//   userId: 'user1',
//   groupId: 'groupA',
// };

// axios.post('http://localhost:3000/api/send-request', data)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });




// const axios = require('axios');

// // 定义用户ID和消息
// const userId = 'user123';
// const message = 'Hello, user123!';

// // 定义请求数据
// const requestData = {
//   userId: userId,
//   message: message,
// };

// // 向服务器发送POST请求
// axios.post('http://localhost:3000/record-ip', requestData)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });








// const WebSocket = require('ws');

// const ws = new WebSocket("ws://localhost:3000"); // 服务器地址

// ws.onopen=function (event) {
//   console.log('WebSocket connection opened');
//   ws.send('Hello, server!'); // 发送消息给服务器
// };

// ws.onmessage=function (event) {
//   console.log('Received from server: ' + event.data);
// };






const io = require('socket.io-client');

// 连接到 Socket.io 服务器
const socket = io('http://localhost:3000'); // 将服务器地址替换为你的服务器地址

// 监听服务器发送的消息
socket.on('message', (msg) => {
  console.log(`收到消息: ${msg}`);
});

// 加入分组1
socket.emit('joinGroup', 2);

// 发送消息到服务器
socket.emit('message', 1,'Hello, server!');

// 处理断开连接事件
socket.on('disconnect', () => {
  console.log('与服务器的连接已断开');
});