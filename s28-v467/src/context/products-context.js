import React, { useState } from 'react';

export const ProductsContext = React.createContext({
  products: [], //only initializing Context - to get better IDE auto-completion, could be just createContext()
  toggleFav: (id) => {},
}); 

//NOTE about Context API:
//it's good for rarely updated data: when you change anything in context data all components that use this context will re-render, 
//no matter if it's really needed or not. It's ok for managing data like authentication status, but it's not ment to be a global state-management tool

export default props => { //function-based component
  const [productsList, setProductsList] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    },
  ]);

  const toggleFavourite = productId => {
    setProductsList(currentProdList => {
      const prodIndex = currentProdList.findIndex(p => p.id === productId);
      const newFavStatus = !currentProdList[prodIndex].isFavorite;
      const updatedProducts = [...currentProdList];
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex],
        isFavorite: newFavStatus
      };
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider value={{
      products: productsList,
      toggleFav: toggleFavourite,
    }}>
      {props.children}
    </ProductsContext.Provider>
  );
}