import React, {Component} from 'react';

import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';

//all data is owned by this app Component. All the data is STORED in the state of APP
//using this.(whatever) you are making the variable and its containments a PROPERTY
// of the component WHERE ITS SET. So it can b accessed from other methods

class App extends Component {

// I am setting the initial state here

  // console.log("Inside constructor funct where initial state was set");
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        // id:
        // username:
        // content:
      ] // messages coming from the server will be stored here as they arrive
    };
  }



// ---------NEW MESSAGE ---------

//   addNewMessage(username, content) {
//     let newMessage = {};
//     let lastElementId = this.state.messages[this.state.messages.length -1].id;
//     newMessage.id = lastElementId + 1;
//     // look at the last thing in this.state.messages

//     // look at the last thing's id

//     // add 1 to the last thing's id
//     // ^^^ becomes newMessage.id

// //adding new dynamic key, value pairs to your newMessage object above.
// //concat returns a new array. You can have objects in thes elements
// //you put a state in messages object so you can set it below, so it becomes dynamic and a user can interact w yur app and things can
// //change based on that interaction
//     newMessage.username = username
//     newMessage.content = content
//     const messages2 = this.state.messages.concat(newMessage);
//     this.setState({messages: messages2});

//   }

// ---------- NEW MESSAGE TO BE BROADCASTED TO ALL CLIENTS
  sendMessToServer(username, content) {
    let newMessage = {};
    newMessage.username = username
    newMessage.messageInput = content
    // const message3 = this.state.messages.concat(newMessage);
    // console.log("this is newMessage: ", newMessage);
    // let user= JSON.stringify(username);
    // let input= JSON.stringify(content);
    newMessage = JSON.stringify(newMessage);
    this.socket.send(newMessage);
  }



//------ CREATING CONNECTIONS TO SERVER


// when something succesfully has happened, what evs in below, will then haopen
//do stuff below beofre connecting to the server
  componentDidMount() {

//      ------- CREATED CONNECTION TO SERVER -

    var socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;
    // console.log("in component did mount");
// onopen w.send() goes to server then server sends to client and will show
// in frames

//      ------- WHERE YOU SEND DATA TO CLIENT + SERVER -

    this.socket.onopen = (data) => {
      // console.log("I'm APP server, sending to client! hi!");
      // socket.send("HIiiiiiii");

//      ------- AN EVENT IS LISTENING, WHAT HAPPENS WHEN EVENT PICKS UP A SIGNAL??? -

      // document.getElementById("chatbar-message").addEventListener('keydown', (event)=> {
      //   if (event.key != 'Enter') {
      //     event.preventDefault();
      //     return;

      //   } if(event.key === 'Enter') {
      //     // let input= document.getElementById("chatbar-message").value;
      //     // let username= document.getElementById("chatBar-username").value;
      //     console.log("inside eventListener, event is: ", event);
      //     this.setState(sendMessToServer);
          // messageInput.value='';
      //   }
      // });

      // socket.send("Hey server, this is client we pass onKeyEvent");
    }


//      ------- WHEN CLIENT RECIEVES MESS FROM SERVER, SEND TO BROWSER -

//below is for when you get a message back from server
    this.socket.onmessage = function (messageEvent) {
      console.log("whats this?", messageEvent);
      let parsedData = JSON.parse(messageEvent.data);
      console.log("Parsed messData: ", parsedData);
    }

    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message in APP");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    // }
  }



  render() {
    // console.log("Rendering <App/>");

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser= {this.state.currentUser} newMessage={this.sendMessToServer.bind(this)} />
      </div>
    )
  }

}
export default App;










