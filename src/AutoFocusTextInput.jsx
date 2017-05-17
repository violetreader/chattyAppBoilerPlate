import React, {Component} from 'react';

class AutoFocusTextInput extends Component {

	constructor(props) {
		super(props);
	}

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
    	<footer className='chatbar'>
      	<CustomTextInput
        ref={(input) => { this.textInput = input; }} />
        
      </footer>
    );
  }
}

export default AutoFocusTextInput;