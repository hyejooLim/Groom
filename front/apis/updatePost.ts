import { TagItem, CategoryItem } from './../types';

interface updatePostProps {
  id?: number;
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
}

const updatePost = async ({ data }: { data: updatePostProps }) => {
  const response = await fetch(`/api/post/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default updatePost;
