const {
  createAsyncThunk,
  createSlice,
  configureStore,
} = require("@reduxjs/toolkit");
const axios = require("axios");

// 1. create an initial state
/*  the initial state here represents the request cycles i.e. request, response and error, 
    which in turn represents the promise states i.e. pending, fulfilled & rejected
*/
const initialState = {
  posts: [], // emmulates fulfilled state, containing all posts
  loading: false, // emulates pending state, indicating that the data fetch in progress
  error: null, // emulates the rejected or error state, indicating some error in data fetch
};

// 2. Create async thunk

/**
 * @desc createAsyncThunk() - Handles async request lifecycles
 * accepts a Redux action type string and a callback function(payload creator callback) that should return a promise
 * generates action types that resembles the promise lifcycle(pending, fulfilled, rejected)
 * these action types are prefixed with an action type string
 *
 * A string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request
 *
 * createAsyncThunk() returns a standard Redux thunk action creator.
 * createAsyncThunk() accepts 2 parameters:
 *  1. arg - contains the value that was passed when the action was dispatched
 * 2. thunkapi - an object containing all of the parameters that are normally passed to a Redux thunk function,
 */

const fetchPosts = createAsyncThunk("posts/fetch", async (arg, thunkapi) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    return response.data;
  } catch (error) {
    // handle api request error and throw error
    // return a rejected response with a defined payload and meta data
    thunkapi.rejectWithValue(error.response);
  }
});

// 3. create a slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  // extraReducers must be used to handle async actions
  extraReducers: (builder) => {
    // used to handle lifecycle - pending, fulfilled, rejected
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts = [];
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// 4. generate reducer
const postsReducer = postSlice.reducer;

// 4. configure redux store
const store = configureStore({
  reducer: postsReducer,
});

// subscribe to store changes
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch the action
store.dispatch(fetchPosts());
