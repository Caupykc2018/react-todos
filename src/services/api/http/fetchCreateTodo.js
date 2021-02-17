import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchCreateTodo = async ({ title }) => {
  const response = await configuredFetch(
    '/api/todos',
    'POST',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      title,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
