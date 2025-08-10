import { shared } from '@todo/shared';
import axios from 'axios';
import { useState } from 'react';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  const [title, setTitle] = useState('');

  const createTodo = async () => {
    await axios.post(`${(window as any)?.CONFIG?.BASE_URL}/todos`, {title});
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => createTodo()}>Submit</button>
    </div>
  );
}

export default App;
function async() {
  throw new Error('Function not implemented.');
}
