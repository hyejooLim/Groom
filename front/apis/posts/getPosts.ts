import { PostItem } from "../../types";

const getPosts = async (): Promise<PostItem[]> => {
  const response = await fetch('/api/posts', {
    method: 'GET',
  });

  return response.json();
};

export default getPosts;
