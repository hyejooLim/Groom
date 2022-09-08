import { CategoryItem, TagItem } from '../../types';

interface CreateTempPostProps {
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
}

const createTempPost = async ({ data }: { data: CreateTempPostProps }): Promise<Response> => {
  const response = await fetch('/api/tempPost', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createTempPost;
