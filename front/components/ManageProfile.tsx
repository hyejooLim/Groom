import React, { ChangeEvent, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { Button, Card } from 'antd';
import { FiCamera } from 'react-icons/fi';
import { BsCloudFill } from 'react-icons/bs';
import AWS from 'aws-sdk';

import useGetUser from '../hooks/query/useGetUser';
import useUpdateUser from '../hooks/query/useUpdateUser';
import { StyledCard, CameraButton, EmptyProfile } from '../styles/ts/components/ManageProfile';

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_BUCKET_SECRET_ACCESS_KEY,
});

const ManageProfile = () => {
  const { status } = useSession();
  const { data: user } = useGetUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/login');
    }
  }, [status]);

  const handleLogout = () => {
    if (confirm('로그인 후 이용하실 수 있습니다.')) {
      signOut();
    }
  };

  const onChangeProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'groom-project',
        Key: e.target.files[0].name,
        Body: e.target.files[0],
      },
    });

    const promise = upload.promise();
    const imageUrl = await promise.then((response) => response.Location);

    updateUser.mutate(imageUrl);
  };

  return (
    <StyledCard
      cover={
        <>
          {user?.imageUrl ? (
            <img className='profile' alt='profile' src={user?.imageUrl} width={214} height={200} />
          ) : (
            <EmptyProfile>
              <BsCloudFill />
            </EmptyProfile>
          )}
          <CameraButton>
            <FiCamera className='icon' />
            <input className='edit_btn' type='file' accept='image/*' onChange={onChangeProfile} />
          </CameraButton>
        </>
      }
    >
      <div className='card_meta'>
        <Card.Meta title={`${user?.name}님`} description={user?.email} />
        <Button className='logout_btn' onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </StyledCard>
  );
};

export default ManageProfile;
