import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchDeleteManyUsers = async ({ userIds }) => {
  const response = await configuredFetch(
    '/api/users/',
    'DELETE',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      userIds,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
