import React, { FC, useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsCloudFill } from "react-icons/bs";
import { FiLink } from "react-icons/fi";

import Popover from "../common/Popover";
import PostShareModal from "./PostShareModal";
import { useGetPost, useSharePost } from "../../hooks/query/post";
import { developmentURL, productionURL2 } from "../../constants/URL";
import { Sharer } from "../../types";

interface PostShareProps {
  postId: number;
  isShow: boolean;
  onClose: () => void;
}

interface WindowWithKakao extends Window {
  Kakao?: any;
}

const PostShare: FC<PostShareProps> = ({ postId, isShow, onClose }) => {
  const sharePost = useSharePost();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: post } = useGetPost(postId);

  useEffect(() => {
    if (sharePost.isSuccess) {
      setIsOpenModal(false);
    }
  }, [sharePost.isSuccess]);

  const handleSharePostByKakao = () => {
    const windowWithKakao = window as WindowWithKakao;

    if (windowWithKakao.Kakao) {
      const kakao = windowWithKakao.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }

      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `${post.title}`,
          description: `${post.content}`,
          imageUrl:
            "https://groom-project.s3.ap-northeast-2.amazonaws.com/Groom_Logo_Circle.png",
          link: {
            webUrl:
              process.env.NODE_ENV === "development"
                ? `${developmentURL}/post/${postId}`
                : `${productionURL2}/post/${postId}`,
            mobileWebUrl:
              process.env.NODE_ENV === "development"
                ? `${developmentURL}/post/${postId}`
                : `${productionURL2}/post/${postId}`,
          },
        },
        buttonTitle: "Groom 웹에서 보기",
      });
    }
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("복사 되었습니다.");
    } catch (err) {
      alert("복사 실패했습니다.");
    }
  };

  const handleSharePost = (sharers: Sharer[]) => {
    sharePost.mutate({ id: postId, sharers });
  };

  return (
    <Popover isShow={isShow} onClose={onClose}>
      <div onClick={handleSharePostByKakao}>
        <RiKakaoTalkFill className="icon" />
        카카오톡으로 공유
      </div>
      <div onClick={() => setIsOpenModal(true)}>
        <BsCloudFill className="icon" />
        구름 유저에게 공유
      </div>
      <PostShareModal
        isOpen={isOpenModal}
        isLoading={sharePost?.isPending}
        onClose={() => setIsOpenModal(false)}
        onSharePost={handleSharePost}
      />
      <div onClick={handleCopyURL}>
        <FiLink className="icon" />
        URL 복사
      </div>
    </Popover>
  );
};

export default PostShare;
