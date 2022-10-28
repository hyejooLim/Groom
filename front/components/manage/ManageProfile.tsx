import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { Button, Card } from 'antd';
import { FiCamera } from 'react-icons/fi';
import { BsCloudFill } from 'react-icons/bs';
import { AiFillMinusSquare } from 'react-icons/ai';
import classNames from 'classnames';
import AWS from 'aws-sdk';

import { useGetUser, useUpdateUser } from '../../hooks/query/user';
import SkeletonManageProfile from '../skeleton/SkeletonManageProfile';
import * as S from '../../styles/ts/components/manage/ManageProfile';

const s3 = new AWS.S3();

s3.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_BUCKET_SECRET_ACCESS_KEY,
});

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_BUCKET_SECRET_ACCESS_KEY,
});

const ManageProfile = () => {
  const { status } = useSession();
  const { data: user, isLoading } = useGetUser();

  const updateUser = useUpdateUser();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/login');
    }
  }, [status]);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      signOut();
    }
  };

  const onRemoveProfileImage = useCallback(() => {
    if (!confirm('이미지를 삭제하시겠습니까?')) {
      return;
    }

    const key = localStorage.getItem('imageKey');
    s3.deleteObject(
      {
        Bucket: 'groom-project',
        Key: key,
      },
      (err, data) => {
        if (err) throw err;

        localStorage.removeItem('imageKey');
        console.log('deleted', data);
      }
    );

    updateUser.mutate(null);
  }, []);

  const onChangeProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'groom-project',
        Key: e.target.files[0].name,
        Body: e.target.files[0],
      },
    });

    localStorage.setItem('imageKey', e.target.files[0].name);

    const promise = upload.promise();
    const imageUrl = await promise.then((response) => response.Location);

    updateUser.mutate(imageUrl);
  };

  return (
    <S.StyledCard
      cover={
        <>
          {user?.imageUrl ? (
            <img className='profile' alt='profile' src={user?.imageUrl} width={214} height={200} />
          ) : (
            <S.EmptyProfile>
              <BsCloudFill />
            </S.EmptyProfile>
          )}
          <S.RemoveButton className={classNames({ show: user?.imageUrl })} onClick={onRemoveProfileImage}>
            <AiFillMinusSquare className='icon' />
          </S.RemoveButton>
          <S.CameraButton>
            <FiCamera className='icon' />
            <input className='edit_btn' type='file' accept='image/*' onChange={onChangeProfile} />
          </S.CameraButton>
        </>
      }
    >
      <div className='card_meta'>
        {isLoading ? (
          <SkeletonManageProfile />
        ) : (
          <>
            <Card.Meta title={`${user?.name}님`} description={user?.email} />
            <Button className='logout_btn' onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        )}
      </div>
    </S.StyledCard>
  );
};

export default ManageProfile;
