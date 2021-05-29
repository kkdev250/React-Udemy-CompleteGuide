import React, { Component, useState } from 'react'; //useState - hook
import './App.css';
import Person from './Person/Person';

/*const App = () => {
  const [personsState, setPersonsState] = useState({ 
    //useState is a HOOK that allows using state in function component
    //hook returns array with ONLY TWO ELEMENTS:
    //array[0]: state
    //array[1]: function to mutate the state - unlike setState this fn do not merges the state with new data,
    //...but this fn REPLACES the state with new data!......
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ],
    otherStateValue: 'some other value', //this will be NOT preserved while using setPersonsState
  });

  const [otherState, setOtherState] = useState('yet another value') //....so in function components instead
  //of one state we usually have many state 'slices' managed by useState hooks

  console.log(personsState, '\n',otherState);

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        {name: 'Maximilian', age: 28},
        {name: 'Manu', age: 29},
        {name: 'Stephanie', age: 27}
      ],
      //otherStateValue: personsState.otherStateValue  //it's the way (not recomended) to preserve it - manually merge state
    });
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App - class</h1>
      <p>This is really working</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person 
        name={personsState.persons[0].name} 
        age={personsState.persons[0].age}/>
      <Person 
        name={personsState.persons[1].name} 
        age={personsState.persons[1].age}
        click={switchNameHandler}>My Hobbies: Racing</Person>
      <Person 
        name={personsState.persons[2].name} 
        age={personsState.persons[2].age}/>
    </div>
  );
}*/

class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ],
    otherStateValue: 'some other value',
  };
  

  switchNameHandler = (newName) => {
    //console.log('Clicked')
    //NEVER DO THIS: his.state.persons[0].name = 'Maximilian';
    this.setState({  //setState MERGES the state with passed data
      persons: [
        {name: newName, age: 28},
        {name: 'Manu', age: 29},
        {name: 'Stephanie', age: 27}
      ],
    });
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Max', age: 28},
        {name: event.target.value, age: 29},
        {name: 'Stephanie', age: 26}
      ],
    });
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };
    return (
      <div className="App">
        <h1>Hi, I'm a React App - class</h1>
        <p>This is really working</p>
        <button
          style={style}
          onClick={() => this.switchNameHandler('Maximilian')}
        >Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}/>
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;
