import { CategoryItem, TagItem } from '../types';

interface createTempPostProps {
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
}

const createTempPost = async ({ data }: { data: createTempPostProps }) => {
  const response = await fetch('/api/tempPost', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createTempPost;
