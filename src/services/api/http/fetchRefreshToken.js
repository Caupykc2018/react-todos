import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchRefreshToken = async ({ refreshToken }) => {
  const response = await configuredFetch(
    '/api/refresh-token',
    'POST',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      refreshToken,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
