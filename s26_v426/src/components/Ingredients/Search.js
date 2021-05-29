import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) { //enteredFilter - it's a closure(!) to const enteredFilter created after re-render (after keystroke)
      //(after every keystroke the whole Search component is re-rendered (created anew) so NEW enteredFilter const is created)
      //inside setTimeout we have access to the const enteredFilter created in re-render cycle 500ms ago, not to the const created in some next re-render
      //enteredFilter === inputRef.current.value: we compare enteredTitle from 500ms ago to the current DOM value - if no change (no typing), we run fetch
        const query = 
          enteredFilter.length === 0 
          ? '' 
          : `?orderBy="title"&equalTo="${enteredFilter}"`; //Firebase syntax to filter data
        fetch('https://react-my-burger-5d776.firebaseio.com/react-hooks-update/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients)
          });
      }
    }, 500);
    return () => { //useEffect's CLEANUP FUNCTION (optional) - it will run just BEFORE NEXT run of useEffect 
                   //(if dependencies are [] useEffect runs only once and this cleanup function runs when component gets unmounted - like componentWillUnmount)
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIngredients, inputRef]); //after each keystroke we run setEnteredFilter - it changes state (enteredFilter) and cause re-render
   //[enteredFilter] - to make sure that we run this hook only atfter re-renders caused by change in enteredFilter
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
