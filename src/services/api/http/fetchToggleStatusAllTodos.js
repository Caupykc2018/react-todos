import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchToggleStatusAllTodos = async () => {
  const response = await configuredFetch('/api/todos/toggle-all', 'POST', {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
