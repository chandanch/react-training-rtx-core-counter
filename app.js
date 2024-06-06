const {
  createAction,
  createReducer,
  nanoid,
  configureStore,
} = require("@reduxjs/toolkit");

console.log("RTK Grounds");

//InitialsState
const initialsState = {
  counter: 0,
};

//Action creator - Action
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");
const resetCounter = createAction("RESET");

const incrementBy = createAction("INCREMENT_BY", (amount, user) => {
  return {
    payload: {
      amount,
      user,
      id: nanoid(),
    },
  };
});

console.log(incrementBy(20, "Emma"));

//Reducer
//Create Reducer
//1. Builder callback notation
//2. map object notation

// Builder callback notation
const counterSlice = createReducer(initialsState, (builder) => {
  //increment
  builder.addCase(increment, (state) => {
    state.counter += 1;
  });

  //decrement
  builder.addCase(decrement, (state) => {
    state.counter -= 1;
  });

  //reset
  builder.addCase(resetCounter, (state) => {
    state.counter = 0;
  });

  //increment By
  builder.addCase(incrementBy, (state, action) => {
    state.counter += action.payload.amount;
  });
});

// const mapslice = createReducer(initialsState, {
//   [increment]: (state) => {
//     state.counter += 1;
//   },
//   //decrement
//   [decrement]: (state) => {
//     state.counter -= 1;
//   },
//   //reset
//   [resetCounter]: (state) => {
//     state.counter = 0;
//   },
//   //increment by
//   [incrementBy]: (state, action) => {
//     state.counter += action.payload.amount;
//   },
// });

//Store
const store = configureStore({
  reducer: counterSlice,
});

//dispatch action
store.dispatch(increment());

// Get State
console.log(store.getState());
