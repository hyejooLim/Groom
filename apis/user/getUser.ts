import clientApi from '..';
import { UserType } from '../../types';

const getUser = async (email?: string): Promise<UserType> => {
  const response = await clientApi.get<UserType>(`/user/${email}`);

  return response;
};

export default getUser;
