import { useRecoilValue } from 'recoil';

import clientApi from '..';
import { CategoryItem } from '../../types';
import { revalidatePostPage } from '../revalidate';
import { mainPostsState } from '../../recoil/posts';

interface UpdateCategoriesProps {
  append: CategoryItem[];
  update: CategoryItem[];
  delete: CategoryItem[];
}

const updateCategories = async ({ data }: { data: UpdateCategoriesProps }) => {
  const response = await clientApi.put('/categories', data);

  if (response === 'ok') {
    const posts = useRecoilValue(mainPostsState);
    posts.map((post) => revalidatePostPage(post.id));
  }
};

export default updateCategories;
