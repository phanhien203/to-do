import { useEffect, useState } from 'react';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from 'to-do-client/src/api';
import './styles.css';

interface Todo {
  _id: string;
  title: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    if (editId !== null) {
      const { data } = await updateTodo(editId, { title: inputValue });

      if (data.isSuccess) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === editId ? { ...todo, title: inputValue } : todo
          )
        );
        setEditId(null);
      }
    }

    if (!editId) {
      const { data } = await createTodo({ title: inputValue });

      if (data.isSuccess) {
        setTodos((prev) => [
          ...prev,
          { _id: `${Date.now()}`, title: inputValue },
        ]);
      }
    }

    setInputValue('');
  };

  const handleDelete = async (id: string) => {
    const { data } = await deleteTodo(id);

    if (data?.isSuccess) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      if (editId === id) {
        setEditId(null);
        setInputValue('');
      }
    }
  };

  const handleEdit = (todo: Todo) => {
    setInputValue(todo.title);
    setEditId(todo._id);
  };

  useEffect(() => {
    const fetchList = async () => {
      const { data } = await getTodos();
      console.log('get todos', data.data);
      setTodos(data.data);
    };

    fetchList();
  }, []);

  return (
    <div className="todo-container">
      <form className="todo-input-group" onSubmit={handleAddOrEdit}>
        <input
          type="text"
          className="todo-input"
          placeholder="Enter title..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="todo-button">
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <span onClick={() => handleEdit(todo)} className="todo-text">
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              className="todo-delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
