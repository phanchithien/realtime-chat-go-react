import React, { Component } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: []
    }
  }

  send(event) {
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div classname="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send={this.send} />  
        <button onClick={this.send}>Hit</button>  
      </div>
    );
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    })
  }
}

export default App;