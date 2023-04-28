import clientApi from '..';
import { UserType } from '../../types';

const getUserWithEmail = async (email: string): Promise<UserType> => {
  if (email === null) return;

  return await clientApi.get<UserType>(`/user/${email}`);
};

export default getUserWithEmail;
