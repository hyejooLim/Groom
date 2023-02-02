import clientApi from '..';
import { TagItem } from '../../types';

interface CreateAutoSaveProps {
  title: string;
  content: string;
  htmlContent: string;
  categoryId: number;
  tags?: TagItem[];
}

const createAutoSave = async (data: CreateAutoSaveProps): Promise<Response> => {
  return await clientApi.post('/autosave', data);
};

export default createAutoSave;
