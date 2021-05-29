import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary';
import classes from './Person.module.css';
import WithClass2 from '../../../hoc/WithClass2';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  /*constructor(props) {
    super(props);
    this.inputElementRef = React.createRef(); //ANOTHER (newer) WAY: first create reference object...
  }*/
  inputElementRef = React.createRef(); //instead of constructor - we can declare class property here

  //inputElement; //declaring a property for FIRST (older) WAY - but it's not necessary

  static contextType = AuthContext; //NEWER, BETTER WAY THAN CONTEXT.PROVIDER/CONSUMER

  componentDidMount() {
    //document.querySelector('input').focus(); //selects ALL inputs in document, not only in this component
    //this.inputElement.focus(); //FIRST WAY
    this.inputElementRef.current.focus(); //ANOTHER WAY: ...and in the end you can use it
    console.log(this.context.authenticated);
  }

  render() {
    console.log('[Person.js] rendering...');
    return (
      <WithClass2 classes={classes.Person}>
        {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        {/*<AuthContext.Consumer>
          {(context) => 
            context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
          </AuthContext.Consumer>*/}
        {/*this.props.isAuth ? <p>Authenticated!</p> : <p>Please log in</p>*/}
        <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input
          //ref={(referenceToThisInput) => {referenceToThisInput.focus()} //very simple, but ok - that works
          //ref={(referenceToThisInput) => {this.inputElement = referenceToThisInput}} //FIRST WAY: this.inputElement - we're adding new property to class
          ref={this.inputElementRef} //ANOTHER WAY: ...secondly assign it to ref...
          type="text" onChange={this.props.changed} value={this.props.name}
        />
      </WithClass2>
    );

    /*return (
      <Aux>
        <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name}/>
      </Aux>
    );*/

    /*return (
      <React.Fragment>
        <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>,
        <p>{this.props.children}</p>,
        <input type="text" onChange={this.props.changed} value={this.props.name}/>
      </React.Fragment>
    );*/

    //return MANY top level tags as in ONE array (each tag has to include a key):
    /*return [
      <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>,
      <p key="i2">{this.props.children}</p>,
      <input key="i3" type="text" onChange={this.props.changed} value={this.props.name}/>
    ]*/ 
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default Person;