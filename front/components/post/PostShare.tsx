import React, { FC, useEffect, useState } from 'react';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsCloudFill } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';

import Popover from '../common/Popover';
import PostShareModal from './PostShareModal';
import { useSharePost } from '../../hooks/query/post';
import { Sharer } from '../../types';

interface PostShareProps {
  postId: number;
  isShow: boolean;
  onClose: () => void;
}

const PostShare: FC<PostShareProps> = ({ postId, isShow, onClose }) => {
  const sharePost = useSharePost();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (sharePost.isSuccess) {
      setIsOpenModal(false);
    }
  }, [sharePost.isSuccess]);

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('복사 되었습니다.');
    } catch (err) {
      alert('복사 실패했습니다.');
    }
  };

  const handleSharePost = (sharers: Sharer[]) => {
    sharePost.mutate({ id: postId, sharers });
  };

  return (
    <Popover isShow={isShow} onClose={onClose}>
      <div>
        <RiKakaoTalkFill className='icon' />
        카카오톡으로 공유
      </div>
      <div onClick={() => setIsOpenModal(true)}>
        <BsCloudFill className='icon' />
        구름 유저에게 공유
      </div>
      <PostShareModal
        isOpen={isOpenModal}
        isLoading={sharePost?.isLoading}
        onClose={() => setIsOpenModal(false)}
        onSharePost={handleSharePost}
      />
      <div onClick={handleCopyURL}>
        <FiLink className='icon' />
        URL 복사
      </div>
    </Popover>
  );
};

export default PostShare;
