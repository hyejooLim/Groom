import clientApi from '..';
import { TagItem, CategoryItem } from '../../types';

interface UpdatePostProps {
  id?: number;
  title: string;
  content?: string;
  htmlContent?: string;
  tags?: TagItem[];
  category: CategoryItem;
  isPublic: boolean;
  allowComments: boolean;
  createdAt?: string;
}

const updatePost = async ({ data }: { data: UpdatePostProps }) => {
  await clientApi.put(`/post/${data.id}`, data);
};

export default updatePost;
