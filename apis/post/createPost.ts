import clientApi from '..';
import { TagItem, CategoryItem } from '../../types';

interface CreatePostProps {
  title: string;
  content?: string;
  htmlContent?: string;
  tags?: TagItem[];
  category: CategoryItem;
  isPublic: boolean;
  allowComments: boolean;
  createdAt?: string;
}

const createPost = async ({ data }: { data: CreatePostProps }): Promise<Response> => {
  return await clientApi.post('/post', data);
};

export default createPost;
