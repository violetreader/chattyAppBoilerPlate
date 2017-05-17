import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
  }

  userInput(e) {
    const input= document.getElementById("chatbar-message").value;
    const username= document.getElementById("chatBar-username").value;
    if (e.key != 'Enter') {
      event.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      this.props.newMessage(username, input);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input id="chatBar-username" className="chatbar-username" placeholder={this.props.currentUser.name} onKeyDown={(e)=>{
            this.userInput(e)
        }}/>
        <input id="chatbar-message" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(e)=>{
            this.userInput(e)
        }}/>
      </footer>
    );
  }
}

export default ChatBar;



