import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserType } from '../../types';

const User = () => {
  const router = useRouter();
  const { id, user } = router.query;
  const parsedUser = user && (JSON.parse(user as string) as UserType);

  return (
    <Head>
      <title>Groom | {parsedUser.name}님 프로필</title>
    </Head>
  );
};

export default User;
