import * as React from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleRequestOptions = this.handleRequestOptions.bind(this);

    this.state = { options: ["apple", "apricot", "banana", "carror"] };
  }

  // text in input is "I want @ap"
  handleRequestOptions(part) {
    /* console.log(part) */; // -> "ap", which is part after trigger "@"
    this.setState({ options: [] });
  }

  render() {
    return (
      <TextInput
        onRequestOptions={this.handleRequestOptions}
        options={this.state.options}
      />
    );
  }
}

export default Input;
