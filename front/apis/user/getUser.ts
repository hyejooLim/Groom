import { UserType } from '../../types';

const getUser = async (): Promise<UserType> => {
  const response = await fetch('/api/user', {
    method: 'GET',
  });

  return response.json();
};

export default getUser;
