import React, { Component } from 'react';
import classes from './App.module.css';  //CSS Modules!!!
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangedHandler(event, person.id)}
                name={person.name} 
                age={person.age} />
              </ErrorBoundary>
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); //zmodyfikowana nazwa klasy 'red' (z pliku .module.css) np. 'App_red__2L2pw'
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
    
    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App - class</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button className={btnClass} onClick={this.togglePersonsHander}>
          Toggle Persons
        </button>
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
