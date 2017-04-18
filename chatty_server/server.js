// server.js -- this this 2nd server in chatty_server

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidV4 = require('uuid/v4');
// uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'   GIVES US OUR UNIQUE ID

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder

//if we can't use static files then what's left to use to show/build the UI (react? jsx?)
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log("INSIDE BROADCAST, heres data being broadcasted (to other clients): ", data);
      client.send(data);
    }
  });
}

let nextSocketId = 1;
const sockets = {};

wss.on('connection', (ws) => {
  console.log('Client is connected to the server');

  const socketId = nextSocketId;
  nextSocketId++;

  console.log("new connection", socketId);

// messageEvent is the message coming from the client!
  ws.on('message', (messageEvent)=> {
      // ------ CREATE UNIQUE ID FOR MESSAGES HERE 
    let messId = uuidV4();
    let newMess = {};

  // will print on console of server in frames
    console.log("recieved messge: ", messageEvent);
    let parsedData = JSON.parse(messageEvent);

    let messageType = parsedData.type

    if (messageType == "Post Message") {
      newMess.type = "Incoming Message";
      newMess.notice = "New Message!";
    }
    if (messageType == "Post Notification") {
      newMess.type = "Incoming Notification";
    }

    newMess.content = parsedData.content;
    newMess.socketNumber = nextSocketId;
    newMess.id = messId;
    newMess.username = parsedData.username;
    console.log("this is message before stringify and broadcasted: ", newMess);
    let stringifyMessage = JSON.stringify(newMess) 

   wss.broadcast(stringifyMessage);


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




