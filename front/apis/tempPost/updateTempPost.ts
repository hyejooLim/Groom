import { CategoryItem, TagItem } from '../../types';

interface UpdateTempPostProps {
  id: number;
  title: string;
  content: string;
  htmlContent: string;
  tags: TagItem[];
  category: CategoryItem;
}

const updateTempPost = async ({ data }: { data: UpdateTempPostProps }): Promise<Response> => {
  const response = await fetch(`/api/tempPost/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default updateTempPost;
