// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';
// import './App.css'; 

// const API = 'http://localhost:3001';

// export default function App() {
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState('');

//   const fetchTodos = async () => {
//     try {
//       const res = await axios.get(`${API}/todos`);
//       setTodos(res.data);
//     } catch (e) {
//       toast.error('Failed to fetch todos');
//     }
//   };

//   const addTodo = async () => {
//     if (!input.trim()) return;
//     try {
//       await axios.post(`${API}/todos`, { title: input });
//       toast.success('Todo added!');
//       setInput('');
//       fetchTodos();
//     } catch (e) {
//       toast.error('Failed to add todo');
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       await axios.delete(`${API}/todos/${id}`);
//       toast.success('Todo deleted');
//       fetchTodos();
//     } catch (e) {
//       toast.error('Failed to delete todo');
//     }
//   };

//   const summarizeTodos = async () => {
//     try {
//       await axios.post(`${API}/summarize`);
//       toast.success('Summary sent to Slack!');
//     } catch (e) {
//       toast.error('Failed to send summary');
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="app-container">
//       <Toaster position="top-right" />
//       <div className="todo-box">
//         <h1 className="title">Todo Summary Assistant</h1>

//         <div className="input-group">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Add a new task"
//           />
//           <button onClick={addTodo}>Add</button>
//         </div>

//         <ul className="todo-list">
//           {todos.map((todo) => (
//             <li key={todo.id} className="todo-item">
//               <span>{todo.title}</span>
//               <button onClick={() => deleteTodo(todo.id)} className="delete-button">
//                 ×
//               </button>
//             </li>
//           ))}
//         </ul>

//         <button onClick={summarizeTodos} className="summary-button">
//           Summarize todos and send to Slack
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';
// import './App.css'; 

// const API = 'http://localhost:3001';

// export default function App() {
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');

//   const fetchTodos = async () => {
//     try {
//       const res = await axios.get(`${API}/todos`);
//       setTodos(res.data);
//     } catch (e) {
//       toast.error('Failed to fetch todos');
//     }
//   };

//   const addTodo = async () => {
//     if (!input.trim()) return;
//     try {
//       await axios.post(`${API}/todos`, { title: input });
//       toast.success('Todo added!');
//       setInput('');
//       fetchTodos();
//     } catch (e) {
//       toast.error('Failed to add todo');
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       await axios.delete(`${API}/todos/${id}`);
//       toast.success('Todo deleted');
//       fetchTodos();
//     } catch (e) {
//       toast.error('Failed to delete todo');
//     }
//   };

//   const startEditing = (id, title) => {
//     setEditingId(id);
//     setEditText(title);
//   };

//   const cancelEditing = () => {
//     setEditingId(null);
//     setEditText('');
//   };

//   const updateTodo = async (id) => {
//     if (!editText.trim()) return;
//     try {
//       await axios.put(`${API}/todos/${id}`, { title: editText });
//       toast.success('Todo updated!');
//       setEditingId(null);
//       setEditText('');
//       fetchTodos();
//     } catch (e) {
//       toast.error('Failed to update todo');
//     }
//   };

//   const summarizeTodos = async () => {
//     try {
//       await axios.post(`${API}/summarize`);
//       toast.success('Summary sent to Slack!');
//     } catch (e) {
//       toast.error('Failed to send summary');
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="app-container">
//       <Toaster position="top-right" />
//       <div className="todo-box">
//         <h1 className="title">Todo Summary Assistant</h1>

//         <div className="input-group">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Add a new task"
//           />
//           <button onClick={addTodo}>Add</button>
//         </div>

//         <ul className="todo-list">
//           {todos.map((todo) => (
//             <li key={todo.id} className="todo-item">
//               {editingId === todo.id ? (
//                 <>
//                   <input
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="edit-input"
//                   />
//                   <button onClick={() => updateTodo(todo.id)} className="save-button">Save</button>
//                   <button onClick={cancelEditing} className="cancel-button">Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <span>{todo.title}</span>
//                   <button onClick={() => startEditing(todo.id, todo.title)} className="edit-button">Edit</button>
//                   <button onClick={() => deleteTodo(todo.id)} className="delete-button">×</button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>

//         <button onClick={summarizeTodos} className="summary-button">
//           Summarize todos and send to Slack
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

const API = 'http://localhost:3001';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (e) {
      toast.error('Failed to fetch todos');
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(`${API}/todos`, { title: input });
      toast.success('Todo added!');
      setInput('');
      fetchTodos();
    } catch (e) {
      toast.error('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      toast.success('Todo deleted');
      fetchTodos();
    } catch (e) {
      toast.error('Failed to delete todo');
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    try {
      await axios.put(`${API}/todos/${id}`, { title: editText });
      toast.success('Todo updated');
      setEditingId(null);
      setEditText('');
      fetchTodos();
    } catch (e) {
      toast.error('Failed to update todo');
    }
  };

  const summarizeTodos = async () => {
    try {
      await axios.post(`${API}/summarize`);
      toast.success('Summary sent to Slack!');
    } catch (e) {
      toast.error('Failed to send summary');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <div className="todo-box">
        <h1 className="title">Todo Summary Assistant</h1>

        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                  />
                  <div>
                    <button onClick={() => updateTodo(todo.id)} className="save-button">Save</button>
                    <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span style={{ flexGrow: 1 }}>{todo.title}</span>
                  <div>
                    <button onClick={() => startEditing(todo.id, todo.title)} className="edit-button">Edit</button>
                    <button onClick={() => deleteTodo(todo.id)} className="delete-button">×</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        <button onClick={summarizeTodos} className="summary-button">
          Summarize todos and send to Slack
        </button>
      </div>
    </div>
  );
}
