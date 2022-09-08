import { CategoryItem } from '../../types';

interface UpdateCategoriesProps {
  append: CategoryItem[];
  update: CategoryItem[];
  delete: CategoryItem[];
}

const updateCategories = async ({ data }: { data: UpdateCategoriesProps }): Promise<Response> => {
  const response = await fetch('/api/categories', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default updateCategories;
