const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      ...state, //not necessary here because in our state is only one member: 'counter'
      counter: state.counter + 1,
    };
  }
  if (action.type === 'DECREMENT') {
    return {
      ...state,
      counter: state.counter -1,
    }
  }
  if (action.type === 'ADD') {
    return {
      ...state,
      counter: state.counter + 10,
    }
  }
  if (action.type === 'SUBTRACT') {
    return {
      ...state,
      counter: state.counter - 8,
    }
  }
  return state;
};

export default reducer;