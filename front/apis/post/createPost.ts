import { TagItem, CategoryItem } from '../../types';

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

const createPost = async ({ data }: { data: CreatePostProps }): Promise<Response> => {
  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createPost;
