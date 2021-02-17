import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchToggleActiveUser = async ({ userId, isActive }) => {
  const response = await configuredFetch(
    `/api/users/${userId}`,
    'PUT',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      isActive,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
