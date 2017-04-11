const WebSocket = require('ws');

import React, {Component} from 'react';

import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';


class App extends Component {

  // setting the initial state
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
        // name: "Anonymous" ,
      messages: [
        // id:
        // username:
        // content:
      ] // messages coming from the server will be stored here as they arrive
    };
  }


//------ CREATING CONNECTIONS TO SERVER

  // Interacting w the browser
  // Invoked immediately after a component is mounted
  // load data from remote endpoint here, good place to instantiate network request
  // setting state here will trigger a re-rendering
  componentDidMount() {
    var socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;

  // initial connection to server is made
  console.log("here")
    this.socket.onopen = function (data) {
      console.log("connected to server, heres data", data);
  // an event is listening
      var messInput = document.getElementById('chatbar-message');
      messInput.addEventListener('onKeyDown', enterEvent );
    }

//      ------- 'CLIENT' RECIEVES MESSAGE FROM SERVER - client is this file
    this.socket.onmessage = function (messageEvent) {
  // send goes back to browser (or broadcast to all if set up in server?)
      let parsed = JSON.parse(messageEvent);
      uniqueId = parsed.id
      this.state.messages= uniqueId;
    }

  }

  // does not modify the component state but returns the same result each time it's invoked (it's pure)
  render() {
    // Rendering <App/>
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser= {this.state.currentUser} newMessage= {this.aNewMessage.bind(this)} />
      </div>
    )
  }


// ---------- NEW MESSAGE TO BE BROADCASTED TO ALL CLIENTS ?
  aNewMessage(username, content) {

    let newMessage = {};
    newMessage.username = username;
    newMessage.content = content;
    let messages = this.state.messages.concat(newMessage);

    this.setState({messages});
    var sendData = JSON.stringify(messages);

    this.socket.send(sendData);

  }

  enterEvent(event) {
    let username = document.getElementById("chatBar-username").value;
    let input = document.getElementById("chatbar-message").value
    if (event.key != 'Enter') {
      event.preventDefault();
      return;
    }
    if (event.key === 'Enter') {
       console.log("enter has been preseed", event);
      sendToServer(username, input);
      input.value='';
    }
  }

}

export default App;










