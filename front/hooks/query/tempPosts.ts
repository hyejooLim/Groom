import { useQuery } from '@tanstack/react-query';
import getTempPosts from '../../apis/tempPosts/getTempPosts';

const useGetTempPosts = () => useQuery(['tempPosts'], getTempPosts);

export default useGetTempPosts;
