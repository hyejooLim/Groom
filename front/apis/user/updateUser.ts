const updateUser = async (imageUrl: string): Promise<Response> => {
  const response = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(imageUrl),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default updateUser;
