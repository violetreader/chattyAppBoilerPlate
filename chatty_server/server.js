const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidV4 = require('uuid/v4');
// uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'   GIVES US OUR UNIQUE ID

const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
  
// Creates the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      let stringifyMessage = JSON.stringify(data) 
      client.send(stringifyMessage);
    }
  });
}

// listening for a connection coming from client (APP)
wss.on('connection', (ws) => {

  console.log('new connection: ', wss.clients.size);
  let connectedUsers = { type:'userCount', number: wss.clients.size }
  if (connectedUsers) {
    let newMessage = {};
    newMessage.usersOnline = connectedUsers;
    wss.broadcast(newMessage);
  }

  // Listening for a message from client
  ws.on('message', (messageEvent)=> {
    let messageId = uuidV4();
    let newMessage = {};

  // will print on console of server in frames
    let parsedData = JSON.parse(messageEvent);

    newMessage.content = parsedData.content;
    newMessage.id = messageId;
    newMessage.username = parsedData.username;

    wss.broadcast(newMessage);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('lose connection', wss.clients.size  );
  })
});




