import clientApi from '..';
import { TagItem, CategoryItem, PostItem } from '../../types';
import { revalidateMainPage, revalidateCategoryPage, revalidateTagPage } from '../revalidate';

interface CreatePostProps {
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
  isPublic: boolean;
  allowComments: boolean;
  createdAt?: string;
}

const createPost = async ({ data }: { data: CreatePostProps }) => {
  const response = await clientApi.post('/post', data);

  if (response) {
    const post = response as PostItem;

    await Promise.all([
      revalidateMainPage(),
      post.category.name !== '카테고리 없음' && revalidateCategoryPage(post.category.name),
      post.tags.map(({ name }) => revalidateTagPage(name)),
    ]);
  }
};

export default createPost;
