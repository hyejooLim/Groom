import clientApi from '..';
import { TagItem, CategoryItem, PostItem } from '../../types';
import { revalidateMainPage, revalidatePostPage, revalidateCategoryPage, revalidateTagPage } from '../revalidate';

interface UpdatePostProps {
  id?: number;
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
  isPublic: boolean;
  allowComments: boolean;
  createdAt?: string;
}

const updatePost = async ({ data }: { data: UpdatePostProps }) => {
  const response = await clientApi.put(`/post/${data.id}`, data);

  if (!response) return;

  const post = response as PostItem;

  await Promise.all([
    revalidateMainPage(),
    revalidatePostPage(post.id),
    post.category.name !== '카테고리 없음' && revalidateCategoryPage(post.category.name),
    post.tags.map(({ name }) => revalidateTagPage(name)),
  ]);
};

export default updatePost;
