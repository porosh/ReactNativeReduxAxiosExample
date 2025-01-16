import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // Mock API

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}?_limit=5`); // Fetch 5 tasks
  return response.data;
};

export const addTodoAPI = async text => {
  const response = await axios.post(API_URL, {title: text, completed: false});
  return response.data;
};

export const toggleCompleteAPI = async (id, completed) => {
  const response = await axios.patch(`${API_URL}/${id}`, {
    completed: !completed,
  });
  return response.data;
};

export const removeTodoAPI = async id => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
