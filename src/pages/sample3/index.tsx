import { useState, useCallback, FC } from 'react';
import AutoFilterDropdown from '../../components/core/filter-dropdown';
import useQuery from '../../hooks/useQuery';

// Define user type
interface User {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TestComponent: FC = () => {
  const [selectedUser1, setSelectedUser1] = useState<User | null>(null);
  const [selectedUser2, setSelectedUser2] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { data: users = [] } = useQuery<User[], null>({
    baseUrl: 'https://jsonplaceholder.typicode.com/users',
  });

  const { data: todos = [] } = useQuery<Todo[], null>({
    baseUrl: 'https://jsonplaceholder.typicode.com/todos/',
  });

  const handleUser1Change = useCallback((user: User) => {
    setSelectedUser1(user);
  }, []);

  const handleUser2Change = useCallback((user: User) => {
    setSelectedUser2(user);
  }, []);

  const handleTodoChange = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  return (
    <>
      <h3>Data sample 1:</h3>
      <div className='flex gap-2'>
        <div>
          <h2>Find user by email:</h2>
          <AutoFilterDropdown<User>
            data={users ?? []}
            labelKey='email'
            valueChange={handleUser1Change}
          />
          {selectedUser1 && (
            <>
              <p>Selected User: {selectedUser1.name}</p>
              <br />
              <p>Email: {selectedUser1.email}</p>
            </>
          )}
        </div>

        <div>
          <h2>Find user by name:</h2>
          <AutoFilterDropdown<User>
            data={users ?? []}
            labelKey='name'
            valueChange={handleUser2Change}
          />
          {selectedUser2 && <p>Selected User: {selectedUser2.name}</p>}
        </div>
      </div>

      <br />
      <br />
      <br />

      <h3>Data sample 2:</h3>
      <div>
        <h2>Select todo:</h2>
        <AutoFilterDropdown<Todo>
          data={todos?.slice(0, 10) ?? []}
          labelKey='title'
          valueChange={handleTodoChange}
        />
        {selectedTodo && <p>Selected Todo: {selectedTodo.title}</p>}
      </div>
    </>
  );
};

export default TestComponent;
