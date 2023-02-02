import clientApi from '..';
import { TempPostItem } from '../../types';

const getTempPosts = async (): Promise<TempPostItem[]> => {
  const response = await clientApi.get<TempPostItem[]>('/tempPosts');

  return response;
};

export default getTempPosts;
