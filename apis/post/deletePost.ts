import clientApi from '..';
import { PostItem } from '../../types';
import { revalidateCategoryPage, revalidateMainPage, revalidatePostPage, revalidateTagPage } from '../revalidate';

const deletePost = async (id: number) => {
  const response = await clientApi.delete(`/post/${id}`);

  if (!response) return;

  const post = response as PostItem;

  await Promise.all([
    revalidateMainPage(),
    post.category.name !== '카테고리 없음' && revalidateCategoryPage(post.category.name),
    post.tags.map(({ name }) => revalidateTagPage(name)),
  ]);
};

export default deletePost;
