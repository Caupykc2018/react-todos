import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchEditRoleUser = async ({ userId, role }) => {
  const response = await configuredFetch(
    `/api/users/${userId}`,
    'PUT',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      role,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
