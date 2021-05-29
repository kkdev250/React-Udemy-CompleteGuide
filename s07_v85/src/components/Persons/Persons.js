import React, {PureComponent} from 'react'; //PureComponent implements shouldComponentUpdate with all props check
import Person from './Person/Person';

class Persons extends PureComponent {
  static getDerivedStateFromProps(props, state) { //update lifecycle hook 1
    console.log('[Persons.js] getDerivedStateFromProps');
    return state;
  }

  /*shouldComponentUpdate(nextProps, nextState) { //update lifecycle hook 2 - here you can stop the update
    console.log('[Persons.js] shouldComponentUpdate');
    if (
      nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked
      ) {  //here we check all of the props - so it's better to use PureComponent instead of Component
      return true;
    } else {
      return false;
    }
    //return true - if React should continue updating or:
    //return false - if you want to stop this update
  }*/

  getSnapshotBeforeUpdate(prevProps, prevState) { //update lifecycle hook 4
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot! '};
  }

  componentDidUpdate(prevProps, prevState, snapshot) { //update lifecycle hook 5
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount() { //remove lifecycle hook
    console.log('[Persons.js] componentWillUnmount');
  }
  
  render() { //update lifecycle hook 3
    console.log('[Persons.js] rendering...');
    return (
      this.props.persons.map((person, index) => {
        return (
          <Person
            click={() => this.props.clicked(index)}
            name={person.name} 
            age={person.age} 
            key={person.id}
            changed={(event) => this.props.changed(event, person.id)}
            REMOVED-NOW-USING-CONTEXTisAuth={this.props.isAuthenticated}
          />
        )
      })
    );
  }
}

export default Persons;