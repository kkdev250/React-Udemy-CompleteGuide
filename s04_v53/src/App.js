import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'fdefd', name: 'Max', age: 28},
      {id: 'hgg22', name: 'Manu', age: 29},
      {id: 'kkjre', name: 'Stephanie', age: 26}
    ],
    otherStateValue: 'some other value',
    showPersons: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    const person = {...this.state.persons[personIndex]}; //creating a copy of person to not mutate the state
    //const person = Object.assign({}, this.state.persons[personIndex]); //alternative
    person.name = event.target.value;
    const persons = [...this.state.persons]; //creating copy of persons
    persons[personIndex] = person;
    this.setState({persons: persons});
    //or better:
    // const persons = [...this.state.persons]; //only one copy - persons
    // const person = persons[personIndex];
    // person.name = event.target.value;
    // this.setState({persons: persons});
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); // slice - to create a new copy of array, or:
    const persons = [...this.state.persons]; // ...-to create a new copy of array
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  togglePersonsHander = () => {
    this.setState({
      showPersons: !this.state.showPersons,
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

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              name={person.name} 
              age={person.age} />
          })}
        </div>
      );
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App - class</h1>
        <p>This is really working</p>
        <button
          style={style}
          onClick={this.togglePersonsHander}
        >Toggle Persons</button>
        {persons}
        {
          this.state.showPersons ? 
            <div>toggled by ternary expression</div>
          : null
        }
      </div>
    );
  }
}

export default App;
