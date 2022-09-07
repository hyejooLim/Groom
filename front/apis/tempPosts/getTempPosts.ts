import { TempPostItem } from '../../types';

const getTempPosts = async (): Promise<TempPostItem[]> => {
  const response = await fetch('/api/tempPosts', {
    method: 'GET',
  });

  return response.json();
};

export default getTempPosts;
