const createTempPost = async ({ data }) => {
  const response = await fetch('/api/tempPost', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createTempPost;
