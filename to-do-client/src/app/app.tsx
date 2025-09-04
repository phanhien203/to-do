import { shared } from '@todo/shared';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  const [title, setTitle] = useState('');
  const [data, setData] = useState<any[]>([]);

  const createTodo = async () => {
    await axios.post(`${(window as any)?.CONFIG?.BASE_URL}/todos`, { title });
  };

  useEffect(() => {
    const fetchList = async () => {
      const { data } = await axios.get(
        `${(window as any)?.CONFIG?.BASE_URL}/todos`
      );
      console.log('fetchList', data);
      setData(data.data);
    };

    fetchList();
  }, []);

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => createTodo()}>Submit</button>
      {data.map((i, idx) => (
        <div key={idx}>{i?.title || ''}</div>
      ))}
    </div>
  );
}

export default App;
function async() {
  throw new Error('Function not implemented.');
}
