import React, {Component} from 'react';

import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';

// this will make the variable and its containments a PROPERTY of the component it's set in
// making it accisble to other methods

class App extends Component {

// setting initial state 
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: "What's Your Name?"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }


// ---------- NEW MESSAGE TO BE BROADCASTED TO ALL CLIENTS
  sendMessToServer(username, content) {

    // -- Create the new message
    let newMessage = {};
    // let lastElementId = this.state.messages[this.state.messages.length -1].id;
    // newMessage.id = lastElementId + 1;
    newMessage.username = username;
    newMessage.content = content;

    // -- Send message to server
    let sendData = JSON.stringify(newMessage);
    this.socket.send(sendData);

    // -- clear input
    document.getElementById("chatbar-message").value='';
  }



  componentDidMount() {

//      ------- CLIENT AND SERVER CODE BELOW

    var socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;

    this.socket.onopen = function(data) {
// SENDING A MESSAGE TO SERVER HERE INTERFERES WITH CHATTYAPP SENDING MESSAGES TO SERVER
    }

//call function below when server "pushes" messages/data down to browser
    this.socket.onmessage = (messageEvent) => {
      console.log("whats this?", messageEvent);

      var parsedMessage = JSON.parse(messageEvent.data);

      // -- Updating state to show the new message immediately
      const messages = this.state.messages.concat(parsedMessage);
      this.setState({messages:messages});

      // switch(parsedMessage.type) {
      //   case 'onKeyDown':

      //   break;
      //   default 
      //   console.log("not onkeyDown so this code happened")
      // }

    }
  }

  // ELSEWHERE

  render() {
    // console.log("Rendering <App/>");

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser= {this.state.currentUser} newMessage={ this.sendMessToServer.bind(this) } />
      </div>
    )
  }

}
export default App;










