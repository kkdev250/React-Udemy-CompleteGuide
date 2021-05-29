import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) { //creation lifecycle hook 1
    super(props);
    //you can initialize state here:
    //this.state = {...}
    console.log('[App.js] constructor');
  }

  state = {  //...but this way is better - we don't need to create a constructor
    persons: [
      {id: 'fdefd', name: 'Max', age: 28},
      {id: 'hgg22', name: 'Manu', age: 29},
      {id: 'kkjre', name: 'Stephanie', age: 26}
    ],
    otherStateValue: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) { //creation lifecycle hook 2, update lifecycle hook
    //creating component step 2 - place to update state with values from props
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() { //creation lifecycle hook 4
    //place to make e.g. HTTP requests
    //DO NOT make synchronous(immediate) setState here - because it causes re-render 
    //(setState here is ok after await HTTP request)
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) { //update lifecycle hook
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) { //update lifecycle hook
    console.log('[App.js] getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate() { //update lifecycle hook
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      }

    });
    /*this.setState({ //this syntax is ok if you are NOT going to refer to 'this.state'!!!
      persons: persons, 
      changeCounter: this.state.changeCounter + 1  //DON'T do that - setState IS NOT FIRED immediately, so that
                                                   //'this.state.sth' could be unpredictable
    });*/
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  togglePersonsHander = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() { //creation lifecycle hook 3
    console.log('[App.js] render');
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons 
          persons={this.state.persons} 
          clicked={this.deletePersonHandler} 
          changed={this.nameChangedHandler} 
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux>
        <button onClick={()=>{this.setState({showCockpit: false})}}>Remove cockpit</button>
        <AuthContext.Provider value={{ //Context has to wrap components that will need access to it
          authenticated: this.state.authenticated,
          login: this.loginHandler,
        }}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length} 
              clicked={this.togglePersonsHander}
              REMOVED-NOW-USING-CONTEXTlogin={this.loginHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
        {
          this.state.showPersons ? 
            <div>toggled by ternary expression</div>
          : null
        }
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
