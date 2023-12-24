import { useState } from 'react'

import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const [newTodo, setNewTodo] = useState('')

const handleNewTodoChange = (e) => {
  setNewTodo(e.target.value)
}

const handleAddTodo = (e) => {
  e.preventDefault()
  setTodos([...todos, newTodo])
  setNewTodo('')
}

  return (
    <>
    
      <h1>Todo List</h1>
      <div className="card">
        <form >
            <input type="text" value={newTodo} onChange={handleNewTodoChange}/> 
            <button type="submit" onClick={handleAddTodo}>Add Todo</button>
        </form>
            <ul className='todos'>
                <li className='todo'>
                  <span>
                    Todo Name
                  </span>
                  <button>Delete</button>
                </li>

            </ul>
      </div>
     
    </>
  )
}

export default App
