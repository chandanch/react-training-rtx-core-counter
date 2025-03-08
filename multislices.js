const {
  createAsyncThunk,
  createSlice,
  configureStore,
  combineReducers,
} = require("@reduxjs/toolkit");
const axios = require("axios");

// 1. create an initial state for posts
const initialPostsState = {
  posts: [],
  loading: false,
  error: null,
};

// 2. Create async thunk for posts fetching
const fetchPosts = createAsyncThunk("posts/fetch", async (arg, thunkapi) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    return response.data;
  } catch (error) {
    return thunkapi.rejectWithValue(error.response);
  }
});

// 3. Create posts slice
const postSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts = [];
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// Additional slice for comments
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

// Additional slice for subscribers
const subscribersSlice = createSlice({
  name: "subscribers",
  initialState: {
    subscribers: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSubscriber: (state, action) => {
      state.subscribers.push(action.payload);
    },
  },
});

// Generate reducers from slices
const postsReducer = postSlice.reducer;
const commentsReducer = commentsSlice.reducer;
const subscribersReducer = subscribersSlice.reducer;

// Use combineReducers to create a root reducer
const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  subscribers: subscribersReducer,
});

// Configure redux store with the combined reducer
const store = configureStore({
  reducer: rootReducer,
});

// Subscribe to store changes
store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch the posts action
store.dispatch(fetchPosts());

// Dispatch the comments action
