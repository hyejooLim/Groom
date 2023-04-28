import clientApi from '..';
import { CategoryItem } from '../../types';

interface UpdateCategoriesProps {
  append: CategoryItem[];
  update: CategoryItem[];
  delete: CategoryItem[];
}

const updateCategories = async ({ data }: { data: UpdateCategoriesProps }) => {
  await clientApi.put('/categories', data);
};

export default updateCategories;
