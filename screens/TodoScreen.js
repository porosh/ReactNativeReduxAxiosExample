import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTodosAsync,
  addTodoAsync,
  removeTodoAsync,
  toggleCompleteAsync,
} from '../features/todoSlice';

const TodoScreen = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  const {todos, status, error} = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (task.trim()) {
      dispatch(addTodoAsync(task));
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List (with API)</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={handleAddTodo} />

      {status === 'loading' ? (
        <ActivityIndicator size="large" color="blue" />
      ) : null}
      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  toggleCompleteAsync({id: item.id, completed: item.completed}),
                )
              }>
              <Text
                style={[styles.todoText, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button
              title="X"
              color="red"
              onPress={() => dispatch(removeTodoAsync(item.id))}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  input: {borderWidth: 1, padding: 10, marginBottom: 10},
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  todoText: {fontSize: 18},
  completed: {textDecorationLine: 'line-through', color: 'gray'},
});

export default TodoScreen;
