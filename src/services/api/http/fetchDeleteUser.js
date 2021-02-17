import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchDeleteUser = async ({ userId }) => {
  const response = await configuredFetch(`/api/users/${userId}`, 'DELETE', {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
