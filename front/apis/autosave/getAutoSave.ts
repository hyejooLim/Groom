import clientApi from '..';
import { AutoSaveItem } from '../../types';

const getAutoSave = async (): Promise<AutoSaveItem> => {
  const response = await clientApi.get<AutoSaveItem>('/autosave');

  return response;
};

export default getAutoSave;
