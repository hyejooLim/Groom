import clientApi from '..';
import { TagItem, CategoryItem, PostItem } from '../../types';
import { revalidateMainPage, revalidatePostPage, revalidateCategoryPage, revalidateTagPage } from '../revalidate';

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
  const response = await clientApi.put(`/post/${data.id}`, data);

  if (response === 'ok') await revalidatePostPage(data.id);
};

export default updatePost;
