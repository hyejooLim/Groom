const getTempPosts = async () => {
  const response = await fetch('/api/tempPosts', {
    method: 'GET',
  });

  return response.json();
};

export default getTempPosts;
