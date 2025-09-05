import { shared } from '@todo/shared';
import { TodoList } from '../components';

export function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
function async() {
  throw new Error('Function not implemented.');
}
