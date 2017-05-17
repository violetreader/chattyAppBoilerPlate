import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
// import ChatBar from './AutoFocusTextInput.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "User"},
      messages: [], // messages coming from the server will be stored here as they arrive
      usersOnline: 0
    };
  }


// ---------- BROADCASTED TO ALL CLIENTS
  sendMessToServer(username, content) {
  
    if (username != this.state.currentUser.name) {
      let changedNameMsg = {};
      changedNameMsg.type = "Post Notification"
      changedNameMsg.content = this.state.currentUser.name + " changed their name to " + username;
      let sendData = JSON.stringify(changedNameMsg);
      this.socket.send(sendData);
      this.setState({
          currentUser: {name: username}
        });
    }

    // -- Creates the new message
    let newMessage = {};
    newMessage.type = "Post Message"; 
    newMessage.username = username;
    newMessage.content = content;

    // -- Sending message to server
    let sendData = JSON.stringify(newMessage);
    this.socket.send(sendData);
    
    // -- clearing input
    document.getElementById("chatbar-message").value='';
  }



  componentDidMount() {

    var socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;

    // this is an event that is listening for a connection coming from server
    this.socket.onopen = function(data) {
    }

    this.socket.onmessage = (messageEvent) => {

      const parsedMessage = JSON.parse(messageEvent.data);
      if (!parsedMessage.usersOnline) {
        const messages = this.state.messages.concat(parsedMessage);
        this.setState({
          messages: messages
        });
        return;
      }

      let usersOnline = parsedMessage.usersOnline.number;
      this.setState({
        usersOnline: usersOnline
      });
    }
  }


  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="sockets"> {this.state.usersOnline} users online </p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser= {this.state.currentUser} newMessage={ this.sendMessToServer.bind(this) } />
      </div>
    )
  }

}
export default App;










