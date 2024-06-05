console.log("RTK Grounds");

const { createAction } = require("@reduxjs/toolkit");

//InitialsState
const initialsState = {
  counter: 0,
};

//Action creator - Action
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");
const resetCounter = createAction("RESET");
const incrementBy = createAction("INCREMENT_BY");

console.log(increment);
// console.log(increment(20));

//Reducer
//Store
