import clientApi from '..';
import { TagItem } from '@/@types/types';

const getTags = async (): Promise<TagItem[]> => {
  const response = await clientApi.get<TagItem[]>('/tags');

  return response;
};

export default getTags;
