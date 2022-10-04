import clientApi from '..';
import { CategoryItem, TagItem } from '../../types';

interface CreateTempPostProps {
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
}

const createTempPost = async ({ data }: { data: CreateTempPostProps }): Promise<Response> => {
  return await clientApi.post('/tempPost', data);
};

export default createTempPost;
