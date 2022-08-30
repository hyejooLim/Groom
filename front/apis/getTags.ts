import { TagItem } from '../types';

const getTags = async (): Promise<TagItem[]> => {
  const response = await fetch('/api/tags', {
    method: 'GET',
  });

  return response.json();
};

export default getTags;
