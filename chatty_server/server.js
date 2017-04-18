// server.js -- this this 2nd server in chatty_server

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
// const http = require('http');
const uuidV4 = require('uuid/v4');
// uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder

//if we can't use static files then what's left to use to show/build the UI (react? jsx?)
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// const server2 = http.createServer(server);
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


wss.on('connection', (ws) => {
  console.log('Client is connected to the server');


// messageEvent is the message coming from the client!
  ws.on('message', (messageEvent)=> {
      // ------ CREATE UNIQUE ID FOR MESSAGES HERE + empy arr/obj
    let messId = uuidV4();
    // messages = [];
    let newMess = {};
  // will print on console of server in frames
    console.log("recieved messge: ", messageEvent);
  // put id, name, input in the  new obj below
  //JSON parse turns data into obj so yu can work w it
    let parsedData = JSON.parse(messageEvent);
    // console.log("is this an obj to wrk w?: ", parsedData);

    newMess.id = messId;
    // console.log("this is new gener id: ", newMess.id);
    newMess.username = parsedData.username;
    newMess.content = parsedData.content;
    console.log("this is message before stringify and broadcasted: ", newMess);
    let stringifyMessage = JSON.stringify(newMess) 

    // wss.broadcast(stringifyMessage);
   wss.broadcast(stringifyMessage);


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




