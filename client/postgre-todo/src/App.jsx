import React, { useEffect, useState } from 'react'
import { instance } from './instance'
import { useNavigate } from 'react-router'
import { logout } from './utils/auth'

const App = () => {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (edit) {
      const todo = await instance.put(`/todo/${edit.id}`, {
        title: input
      })
      console.log(todo)
      setEdit(null)
      setTodos(prev => prev.map(item => item.id === edit.id ? { ...item, title: input } : item))
    } else {
      const data = {
        title: input,
      }
      const todo = await instance.post('/todo', data)
      console.log(todo)
      setTodos([...todos, todo.data])
    }
    setInput("")
  }

  const handleDelete = async (id) => {
    const data = await instance.delete(`/todo/${id}`)
    console.log(data)
    setTodos(prev => prev.filter(item => item.id !== id))
  }

  const handleEdit = (todo) => {
    setEdit(todo)
    setInput(todo.title)
  }



  useEffect(() => {
    (async () => {
      const todos = await instance.get('/todos')
      console.log(todos)
      setTodos(todos.data)
    })()
  }, [])
  return (
    <div className="container mx-auto py-8 px-2 max-w-2xl">
      <div className='flex justify-center'>
        <h1 className='text-center text-4xl font-bold mb-8 text-gray-800'>PERN TODO</h1>
        <div className='ml-auto'>
          <button className='text-white bg-red-500 font-semibold px-3 py-2 rounded-md cursor-pointer' onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            required
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a new todo..."
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {edit ? "Edit" : "Add"}
          </button>
        </form>
      </div>
      <div>
        <div className="space-y-3">
          {!!!todos.length && <h4 className='text-center text-gray-400 text-lg'>No todos found ...</h4>}
          {todos?.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg flex justify-between shadow hover:shadow-md transition-shadow"
            >
              <p className="text-gray-800">{item.title}</p>
              <div>
                <button onClick={() => handleDelete(item.id)} className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                <button onClick={() => handleEdit(item)} className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App