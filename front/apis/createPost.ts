import { TagItem, CategoryItem } from './../types';

interface createPostProps {
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
}

const createPost = async ({ data }: { data: createPostProps }): Promise<Response> => {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createPost;
