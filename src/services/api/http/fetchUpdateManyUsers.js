import { configuredFetch } from './configuredFetch';
import { FetchError } from './fetchError';

export const fetchUpdateManyUsers = async ({ userIds, isActive, role }) => {
  let updateData = {};

  if (isActive !== '') {
    updateData = { ...updateData, isActive };
  }

  if (role !== '') {
    updateData = { ...updateData, role };
  }

  const response = await configuredFetch(
    '/api/users',
    'PUT',
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    {
      ...updateData,
      userIds,
    },
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw new FetchError({ ...data, status: response.status });
};
