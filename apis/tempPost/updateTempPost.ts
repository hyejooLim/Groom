import clientApi from '..';
import { CategoryItem, TagItem } from '../../types';

interface UpdateTempPostProps {
  id: number;
  title: string;
  content: string;
  htmlContent: string;
  tags: TagItem[];
  category: CategoryItem;
}

const updateTempPost = async (data: UpdateTempPostProps): Promise<Response> => {
  return await clientApi.put(`/tempPost/${data.id}`, data);
};

export default updateTempPost;
