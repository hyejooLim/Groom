import { useQuery } from '@tanstack/react-query';
import searchPosts from '../../apis/search/searchPosts';

const useSearchPosts = (keyword: string, searchType: string) =>
  useQuery(['posts', keyword], () => searchPosts(keyword, searchType), {
    onSuccess: (data) => {
      console.log('searchPosts', data);
    },
  });

export { useSearchPosts };
