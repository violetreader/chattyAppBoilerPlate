// server.js -- this this 2nd server in chatty_server

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

const PORT = 3001;

// New express server
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
  wss.clients.forEach((client)=> {
    if (client.readyState === WebSocket.OPEN) {
      console.log("inside if statement");
      client.send(data);
    }
  });
};
wss.on('connection', (ws) => {
  console.log('Server is now connected to Browser(client)');

// ------ CREATE UNIQUE ID FOR MESSAGES HERE + empy arr/obj
  let messId = uuidV4();
  messages = [];
  let newMess = {};

// messageEvent is the message coming from the client (which is actually the APP sending when 'Enter' is pressed)
  ws.on('message', (messageEvent)=> {
    console.log("recieved message in server: ", messageEvent);
    let parsedData = JSON.parse(messageEvent);

    newMess.id = messId;
    newMess.username = parsedData[0].username;
    newMess.message = parsedData[0].content;

    const message = messages.concat(newMess);
    const messString = JSON.stringify(message)
    console.log("this is messString: ", messString);

    wss.broadcast(messString);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});




