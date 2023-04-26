import clientApi from '..';
import { UserType } from '../../types';

const getUser = async (): Promise<UserType> => {
  return await clientApi.get<UserType>('/user');
};

export default getUser;
