import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchDeleteTodo = async ({ todoId }) => {
  const response = await configuredFetch(`/api/todos/${todoId}`, 'DELETE', {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new FetchError({ ...data, status: response.status });
};
