import clientApi from '..';
import { UserType } from '../../types';

const getUser = async (): Promise<UserType> => {
  const response = await clientApi.get<UserType>('/user');

  return response;
};

export default getUser;
