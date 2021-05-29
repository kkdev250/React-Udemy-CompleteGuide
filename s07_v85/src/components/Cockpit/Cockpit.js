import React, { useEffect, useRef , useContext } from 'react'; //useEffect hook!!!
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  //const toggleButtonRef = Rect.createRef(); //this won't work - works only in class-based components
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext); //NEWER, BETTER WAY THAN CONTEXT.PROVIDER/CONSUMER

  console.log(authContext.authenticated);

  useEffect(() => { //useEffect React hook runs for every render cycle (create, update) of this component
                    //equivalent of componentDidMount and componentDidUpdate hooks for class base components
    console.log('[Cockpit.js] useEffect');
    /*const timer = setTimeout(() => {
      alert('Saved data to cloud!'); //simulated HTTP request
    }, 1000);*/
    toggleButtonRef.current.click();
    return () => { //this return is optional - function passed here will be fired for unmount
      //clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []);
//}, []);              // useEffect will fire only for only for create
//}, [props.persons]); // useEffect will fire for every update because of changes in props.persons
//});                  // useEffect will fire for every render (create, update) of this component

  //useEffect(); //you can have many useEffect's
  
  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    }
  });

  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button ref={toggleButtonRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={authContext.login}>Log in</button>
      {/*<AuthContext.Consumer>
        {(context) =>
          <button onClick={context.login}>Log in</button>}
        </AuthContext.Consumer>*/}
      {/*<button onClick={props.login}>Log in</button>*/}
    </div>
  );
}

export default React.memo(Cockpit);  //React.memo - kind of equivalent of shouldComponentUpdate