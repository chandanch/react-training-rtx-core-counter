console.log("RTK Grounds");

const { createAction } = require("@reduxjs/toolkit");

//InitialsState
const initialsState = {
  counter: 0,
};

//Action creator - Action
const increment = createAction("INCREMENT");
console.log(increment);

//Reducer
//Store
