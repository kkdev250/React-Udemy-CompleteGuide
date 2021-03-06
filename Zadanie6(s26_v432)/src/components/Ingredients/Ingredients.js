import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ userIngredients, setUserIngredients ] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(previousIngredients => [
      ...previousIngredients, 
      { id: Math.random().toString(), ...ingredient }
    ]);
  }
  const removeIngredientHandler = ingredientId => {
    setUserIngredients(previousIngredients => 
      previousIngredients.filter(ingredinet => ingredinet.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList 
          ingredients={userIngredients} 
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
