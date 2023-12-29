import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/messages/sync');
        setTodos(response.data);
      } catch (error) {
        console.error('Errore nel recupero dei todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleEditTodo = (index) => {
    setEditingTodo(index);
  };

  const handleSaveEdit = async (index, updatedText) => {
    try {
      const todoIdToUpdate = todos[index]._id;
      const response = await axios.put(`http://localhost:3000/api/v1/messages/${todoIdToUpdate}`, { message: updatedText });

      const updatedTodos = [...todos];
      updatedTodos[index] = response.data;
      setTodos(updatedTodos);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo === '') return;

    try {
      const response = await axios.post('http://localhost:3000/api/v1/messages', {
        message: newTodo,
      });

      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleTodoDelete = async (index) => {
    try {
      const todoIdToDelete = todos[index]._id;
      await axios.delete(`http://localhost:3000/api/v1/messages/${todoIdToDelete}`);

      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodoChange = (e, index) => {
    const updatedText = e.target.value;
  
   
    const updatedTodos = [...todos];
    updatedTodos[index].message = updatedText;
  
    setTodos(updatedTodos);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className="card">
        <form>
          <input type="text" value={newTodo} onChange={handleNewTodoChange} />
          <button type="submit" onClick={handleAddTodo}>
            Add Todo
          </button>
        </form>
        <ul className="todos">
          {todos.map((todo, index) => (
            <li className="todo" key={index}>
              {index === editingTodo ? (
                <>
                  <input type="text" value={todo.message} onChange={(e) => handleEditTodoChange(e, index)} />
                  <button onClick={() => handleSaveEdit(index, todo.message)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{todo.message}</span>
                  <button onClick={() => handleTodoDelete(index)}>Delete</button>
                  <button onClick={() => handleEditTodo(index)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
