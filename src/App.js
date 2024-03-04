import React, { useState } from 'react';
import './App.css';

function App() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const addTodo = () => {
    if (taskName.trim() !== '' && description.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        taskName,
        description,
        status: 'notCompleted'
      };
      setTodos([...todos, newTodo]);
      setTaskName('');
      setDescription('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.status = newStatus;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'all') {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      
      <div className="input-container">
        <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      
      <div className="filter-container">
        <label htmlFor="filterStatus">Filter Status:</label>
        <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      
      <div className="todos-container">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-card ${todo.status}`}>
            <h3>{todo.taskName}</h3>
            <p>{todo.description}</p>
            <p>Status: 
              <select value={todo.status} onChange={(e) => updateStatus(todo.id, e.target.value)}>
                <option value="completed">Completed</option>
                <option value="notCompleted">Not Completed</option>
              </select>
            </p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

