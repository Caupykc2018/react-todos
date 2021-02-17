import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchGetAllTodos = async ({ startDate, endDate, search }) => {
  const filters = [];

  if (!search) {
    if (startDate) {
      filters.push(`start=${new Date(startDate).getTime().toString()}`);
    }

    if (endDate) {
      filters.push(`end=${new Date(endDate).getTime().toString()}`);
    }
  } else {
    filters.push(`search=${search}`);
  }

  const stringQueries = `?${filters.join('&')}`;

  const response = await configuredFetch(
    `/api/todos${stringQueries === '?' ? '' : stringQueries}`,
    'GET',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
