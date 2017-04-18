import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {

    let messages = this.props.messages;
    // console.log(this.props);
    // console.log(this.props.messages);
    // console.log(this.props.messages[0]);
    // console.log(this.props.messages[0].content);
    console.log("messages in this.props: ", messages)


      return (
        <main className="messages">
          <div className="message system">
            { messages.map((message) => <Message key={ message.id } username={ message.username } content={ message.content }/>) }
          </div>
        </main>
      );
  }
}

export default MessageList;

