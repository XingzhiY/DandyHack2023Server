// const http =require('http');
// const WebSocket = require('ws');
// const server = http.createServer();
// const wss = new WebSocket.Server({server});

const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

class StringList {
    constructor() {
      this.list = [];
    }
  
    // 添加字符串到列表
    addString(string) {
      this.list.push(string);
    }
  
    // 删除指定字符串
    removeString(string) {
      const index = this.list.indexOf(string);
      if (index !== -1) {
        this.list.splice(index, 1);
      }
    }
  
    // 获取列表中的所有字符串
    getAllStrings() {
      return this.list;
    }
  
    // 清空列表
    clearList() {
      this.list = [];
    }
  }

    // 创建一个Map，其中键是group ID，值是StringList实例
    const groupMap = new Map();

io.on('connection', (socket) => {
    console.log('connection');

    socket.on('joinGroup', (name,groupid) => {
        // 让客户端加入特定组
        socket.join(groupid);
        io.to(groupid).emit('joinGroup',name+" joins group " + groupid);
    });

    socket.on('getList', (groupid) => {
        // 让客户端加入特定组
        const groupList = groupMap.get(groupid);
        if (groupList) {
          io.to(groupid).emit('getList', groupList.getAllStrings());
        } else {
          io.to(groupid).emit('getList', []);
        }    
    });


    socket.on('message', (groupid, msg) => {
        console.log('message: ' + msg);
        // io.emit('message', msg);

        io.to(groupid).emit('message', "everyone" + msg+" "+groupid);



    });
    socket.on('close', () => {
        console.log('close');
    });
});

// server.on('request', (req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// });

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});


// // 用于存储用户信息的对象
// const users = {};



// const userIPs = {};

// app.use(express.json());

// // 处理用户IP地址的请求
// app.post('/record-ip', (req, res) => {
//   const userIP = req.ip; // 获取用户的IP地址
//   const { userId, message } = req.body;

//   // 存储用户的IP地址和消息
//   userIPs[userId] = userIP;

//   res.json({ message: userIP });
// });

// // 处理Axios请求
// app.post('/api/send-request', (req, res) => {
//   const { userId, groupId } = req.body;

//   // 确保userId和groupId存在
//   if (!userId || !groupId) {
//     return res.status(400).json({ error: 'userId and groupId are required' });
//   }

//   // 如果用户不存在，创建一个新用户
//   if (!users[userId]) {
//     users[userId] = { groupId };
//   }

//   res.json({ message: 'Request received successfully' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
