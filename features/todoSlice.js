import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchTodos,
  addTodoAPI,
  toggleCompleteAPI,
  removeTodoAPI,
} from '../services/todoService';

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Async actions
export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    return await fetchTodos();
  },
);

export const addTodoAsync = createAsyncThunk('todos/addTodo', async text => {
  return await addTodoAPI(text);
});

export const toggleCompleteAsync = createAsyncThunk(
  'todos/toggleComplete',
  async ({id, completed}) => {
    return await toggleCompleteAPI(id, completed);
  },
);

export const removeTodoAsync = createAsyncThunk(
  'todos/removeTodo',
  async id => {
    return await removeTodoAPI(id);
  },
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {}, // No direct reducers needed, all handled in extraReducers
  extraReducers: builder => {
    builder
      .addCase(fetchTodosAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
        const todo = state.todos.find(todo => todo.id === action.payload.id);
        if (todo) todo.completed = action.payload.completed;
      })
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
