import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { userState } from '../../recoil/user';
import getUser from '../../apis/user/getUser';

const useGetUser = () => {
  const setUser = useSetRecoilState(userState);

  return useQuery(['user'], getUser, {
    onSuccess: (data) => {
      setUser(data); // 새로고침하면 null
      console.log('data', data);
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetUser;
