import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component{
  state = {
    userName: 'John124'
  };

  changeHandler = (event) => {
    this.setState({
      userName: event.target.value,
    })
  };

  render() {
    return (
      <div className="App">
        <UserInput change={this.changeHandler} name={this.state.userName}/>
        <UserOutput userName={this.state.userName}/>
        <UserOutput userName="Jack987"/>
      </div>
    );
  }
}

export default App;
