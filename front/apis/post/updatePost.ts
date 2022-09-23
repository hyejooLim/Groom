import { TagItem, CategoryItem } from '../../types';

interface UpdatePostProps {
  id?: number;
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
  isPublic: boolean;
  allowComments: boolean;
  createdAt?: string;
}

const updatePost = async ({ data }: { data: UpdatePostProps }) => {
  const response = await fetch(`/api/post/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default updatePost;
