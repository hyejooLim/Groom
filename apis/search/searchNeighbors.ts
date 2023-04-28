import clientApi from '..';
import { UserType } from '../../types';

const searchNeighbors = async (keyword: string): Promise<UserType[]> => {
  const response = await clientApi.get<UserType[]>(`/search/user/neighbors/${keyword}`);
  return response;
};

export default searchNeighbors;
