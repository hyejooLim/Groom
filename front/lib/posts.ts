import dayjs from 'dayjs';
import { PostItem } from '../types';

export const getPublicAndPublishedPosts = (posts: PostItem[]): PostItem[] => {
  return posts?.filter((post: PostItem) => {
    const createdAt = dayjs(post.createdAt);
    const currentDate = dayjs();

    return post.isPublic && currentDate.diff(createdAt) >= 0;
  });
};
