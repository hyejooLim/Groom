import clientApi from '..';
import { UserType } from '@/@types/types';

const getUser = async (): Promise<UserType> => {
  return await clientApi.get<UserType>('/user');
};

export default getUser;
