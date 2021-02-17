import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchRegister = async ({ login, password }) => {
  const response = await configuredFetch(
    '/api/register',
    'POST',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      login,
      password,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
