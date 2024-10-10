import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')); // Assuming you store the token in localStorage

  useEffect(() => {
    fetchTodos();
  }, [token]); // Fetch todos when the token changes

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos', {
        headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/todos', newTodo, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
      });
      setTodos([...todos, response.data]);
      setNewTodo({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, {
        completed: true,
      }, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
      });
      
      // Update the todos state to reflect the change
      setTodos(todos.map((todo) => (todo._id === id ? { ...todo, completed: true } : todo)));
      
      // Set a timeout to delete the todo after 1 minute (60000 milliseconds)
      setTimeout(async () => {
        await handleDelete(id);
      }, 60000); // Change to 60000 for 1 minute
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
      });
      // Remove the deleted todo from the state
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      {/* Form to add new todo */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Todo Title"
          value={newTodo.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleChange}
          rows="3"
        />
        <input
          type="date"
          name="dueDate"
          value={newTodo.dueDate}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {/* List of todos */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              {todo.dueDate && (
                <p className="due-date">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
              )}
              <p className="created-at">Created At: {new Date(todo.createdAt).toLocaleString()}</p>
            </div>
            {!todo.completed && (
              <button
                onClick={() => handleComplete(todo._id)}
                className="mark-complete-button"
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
