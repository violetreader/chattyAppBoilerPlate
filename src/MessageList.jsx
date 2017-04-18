import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {

    let messages = this.props.messages;
    console.log("inside messgeLIst: ", this.props.messages);

      return (
        <main className="messages">
          <div className="message">
            { messages.map((message) => <Message key={ message.id } username={ message.username } content={ message.content } />) }
          </div>
        </main>
      );
  }
}

export default MessageList;

