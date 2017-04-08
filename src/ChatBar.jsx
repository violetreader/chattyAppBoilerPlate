import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state= {
    };
  }

  userInput(e) {
    if (e.key != 'Enter') {
      event.preventDefault();
      return;
    }
    if (e.key === 'Enter') {
      console.log("send info up to Parent!!")
      let input= document.getElementById("chatbar-message").value;
      let username= document.getElementById("chatBar-username").value;
      this.props.newMessage(username, input);
      // input.value='';
    }
  }

  render() {
    // console.log("what is this in ChtBar: ", this.props.content);
    return (
      <footer className="chatbar">
        <input id="chatBar-username" className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input id="chatbar-message" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(e)=>{
            this.userInput(e)
        }}/>
      </footer>
    )
  }
}

export default ChatBar;



