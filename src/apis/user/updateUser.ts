import clientApi from '..';

const updateUser = async (imageUrl: string): Promise<Response> => {
  return await clientApi.put('/user', { imageUrl });
};

export default updateUser;
