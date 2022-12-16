import React, { FC } from 'react';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsCloudFill } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';

import Popover from '../common/Popover';

interface PostShareProps {
  isShow: boolean;
  onClose: () => void;
}

const PostShare: FC<PostShareProps> = ({ isShow, onClose }) => {
  return (
    <Popover isShow={isShow} onClose={onClose}>
      <div>
        <RiKakaoTalkFill className='icon' />
        카카오톡으로 공유
      </div>
      <div>
        <BsCloudFill className='icon' />
        구름 유저에게 공유
      </div>
      <div>
        <FiLink className='icon' />
        URL 복사
      </div>
    </Popover>
  );
};

export default PostShare;
