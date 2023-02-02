import clientApi from '..';
import { UserType } from '../../types';

const getNeighbors = async (): Promise<UserType[]> => {
  const response = await clientApi.get<UserType[]>('/user/neighbors');

  return response;
};

export default getNeighbors;
