import clientApi from '..';
import { CategoryItem } from '../../types';
import getPosts from '../posts/getPosts';
import { revalidatePostPage } from '../revalidate';

interface UpdateCategoriesProps {
  append: CategoryItem[];
  update: CategoryItem[];
  delete: CategoryItem[];
}

const updateCategories = async ({ data }: { data: UpdateCategoriesProps }) => {
  const response = await clientApi.put('/categories', data);

  if (response === 'ok') {
    const posts = await getPosts();
    posts.map((post) => revalidatePostPage(post.id));
  }
};

export default updateCategories;
