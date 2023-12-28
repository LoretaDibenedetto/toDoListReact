import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const [newTodo, setNewTodo] = useState('')

const handleNewTodoChange = (e) => {
  setNewTodo(e.target.value)

}

const handleAddTodo = async (e) => {
  e.preventDefault()
  if (newTodo === '') return 

  try {
    // Send a POST request to the Express backend to add the new todo
    const response = await axios.post('http://localhost:3000/api/v1/messages', {
      message: newTodo,
    });

    setTodos([...todos, response.data]); // Assuming response.data contains the new todo
    setNewTodo('');
  } catch (error) {
    console.error('Error adding todo:', error);
  }


  /*setTodos([...todos, newTodo])
  setNewTodo('')
  console.log(todos)*/
}

/*const HandleTodoDelete = (index) => {
  const newTodos = [...todos]
  newTodos.splice(index, 1)
  setTodos(newTodos)
}*/

const HandleTodoDelete = async (index) => {
  try {
    const todoIdToDelete = todos[index]._id; // Assuming the todos have an _id field

    // Send a DELETE request to the Express backend to delete the todo
    await axios.delete(`http://localhost:3000/api/v1/messages/${todoIdToDelete}`);

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

  return (
    <>
    
      <h1>Todo List</h1>
      <div className="card">
        <form >
            <input type="text" value={newTodo} onChange={handleNewTodoChange}/> 
            <button type="submit" onClick={handleAddTodo}>Add Todo</button>
        </form>
            <ul className='todos'>
              {
              todos.map((todo, index) => (
                <li className='todo' key={index}>
                 <span> {todo.message}</span>
                  <button onClick={() => HandleTodoDelete(index)}>Delete</button>
                </li>
              ))}
              
              
              
           
            
            </ul>
      </div>
     
    </>
  )
}

export default App
