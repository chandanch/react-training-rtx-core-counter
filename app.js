const { createAction } = require("@reduxjs/toolkit");

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
      id: Math.round(Math.random() * 999),
    },
  };
});

console.log(incrementBy(20, "Emma"));

//Reducer
//Store
