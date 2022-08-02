import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import tinymce from 'tinymce';
import classnames from 'classnames';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import TempSavePostsModal from '../../TempSavePostsModal';
import { ContentModeType, PostItem, CategoryItem } from '../../../types';
import * as ContentMode from '../constants/ContentMode';

const ContentAside = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 66px;
  background-color: #f5f5f5;
  min-width: 944px;
  text-align: right;

  .btn_wrapper {
    float: right;
    padding: 13px 54px 0 0;
    display: flex;

    .btn {
      height: 40px;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      margin: 0 4px;
      transition: border-color 0.2s, color 0.2s, background-color 0.2s;
    }

    .temp_save {
      width: 122px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .btn_wrapper .count:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.09);
    display: inline-block;
    margin: 0 9px -1px 9px;
  }
`;

const PublishButton = styled(Button)`
  color: #fff;
  background-color: #000;
  border: 1px solid #000;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not([disabled]):focus,
  &:not([disabled]):hover {
    border-color: #f54;
    color: #fff;
    background-color: #f54;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 70px;
  width: 100%;
  z-index: 1;

  .toast_message {
    width: 100%;
    min-width: 640px;
    transition: height 0.5s ease-in-out;
    height: 0;
    line-height: 50px;
    text-align: center;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 /4%), 0 1px 0 0 rgb(0 0 0 /4%);
    letter-spacing: -0.2px;
    overflow: hidden;
    color: #f54;
    background-color: #f8f8f8;
    font-size: 15px;
    font-weight: 300;
  }

  .toast_message.show {
    height: 50px;
  }
`;

interface EditorProps {
  post?: PostItem;
  mode: ContentModeType;
}

const Editor: FC<EditorProps> = ({ post, mode }) => {
  const makePostState = () => {
    if (post && mode === ContentMode.EDIT) {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags,
        Comments: post.Comments,
        likeCount: post.likeCount,
        Category: post.Category,
        author: post.author,
        authorId: post.authorId,
        createdAt: post.createdAt,
      };
    } else {
      return {
        id: '',
        title: '',
        content: '',
        Category: { id: '', name: '' },
        tags: [],
        author: '',
        authorId: '',
        createdAt: '',
      };
    }
  };

  let editorUrl = '';
  const [postData, setPostData] = useState(makePostState());

  const [tempSavePosts, setTempSavePosts] = useState<PostItem[]>([]);
  const [loadTempSavePost, setLoadTempSavePost] = useState(false);
  const [tempCount, setTempCount] = useState(0);

  const [showToastMessage, setShowToastMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeunload', preventUnload);

    return () => {
      window.removeEventListener('beforeunload', preventUnload);
    };
  }, []);

  useEffect(() => {
    editorUrl = location.href;
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack); // 사용자의 세션 기록 탐색으로 인해 현재 활성화된 기록 항목이 바뀔 때 발생

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  // 새로고침 및 창 닫기 방지
  const preventUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; // chrome에서 동작하도록 추가
  };

  // 뒤로가기 방지
  const preventGoBack = (e: PopStateEvent) => {
    if (editorUrl !== location.href) {
      return;
    }

    const confirm = window.confirm('사이트에서 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
    if (confirm) {
      history.back(); // popstate 이벤트 발생
      return;
    }

    history.pushState(null, '', location.href);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      title: e.target.value,
    });
  };

  const handleChangeContent = (value: string) => {
    setPostData({
      ...postData,
      content: value,
    });
  };

  const handleAddTag = (value: string) => {
    setPostData({
      ...postData,
      tags: [...postData.tags, value],
    });
  };

  const handleRemoveTag = (index: number) => {
    let newTags = [...postData.tags];
    newTags = newTags.filter((tag) => newTags.indexOf(tag) !== index);

    setPostData({
      ...postData,
      tags: newTags,
    });
  };

  const handleChangeCategory = (value: string, option: CategoryItem) => {
    setPostData({
      ...postData,
      Category: { id: option.id, name: value },
    });
  };

  const handleUploadImage = (imageUrl: string) => {
    const editor = tinymce.activeEditor;
    const dom = editor.dom;

    editor.execCommand('mceInsertContent', false, '<img id="new_image" src="' + imageUrl + '" />');

    let img = dom.select('#new_image');
    dom.setAttrib(img, 'id', 'new_image');
    dom.bind(img, 'load', (e) => {
      editor.nodeChanged();
      dom.unbind(img, 'load');
    });
  };

  const handleGetImageUrl = (files: Array<File>) => {
    console.log('files', files);

    [].forEach.call(files, (file: File) => {
      const reader = new FileReader();

      // 읽기 동작이 성공적으로 완료되면 실행
      reader.onload = (e) => {
        console.log(e.target.result);
        handleUploadImage(e.target.result as string);
      };

      reader.readAsDataURL(file);
    });
  };

  const onTempSavePost = () => {
    if (!postData.title && !postData.content) {
      alert('제목을 입력하세요.');
      return;
    }

    const tempSavePost: PostItem = {
      id: String(tempSavePosts.length + 1),
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      Category: postData.Category,
      author: postData.author,
      authorId: postData.authorId,
      createdAt: postData.createdAt,
    };

    if (
      !tempSavePosts.find(
        (post: PostItem) => post.title === tempSavePost.title && post.content === tempSavePost.content
      )
    ) {
      setTempSavePosts((prevState: PostItem[]) => {
        return [
          {
            id: String(prevState.length + 1),
            title: postData.title,
            content: postData.content,
            tags: postData.tags,
            Category: postData.Category,
            author: postData.author,
            authorId: postData.authorId,
            createdAt: postData.createdAt,
          },
          ...prevState,
        ];
      });

      setTempCount((prev) => prev + 1);
    }

    setShowToastMessage(true);

    setTimeout(() => {
      setShow(true);
    }, 1000);

    setTimeout(() => {
      setShow(false);
    }, 3000);

    setTimeout(() => {
      setShowToastMessage(false);
    }, 4000);
  };

  const onLoadPost = (post: PostItem) => {
    setIsOpen(false);
    console.log(post);

    setPostData({
      ...postData,
      title: post.title,
      content: post.content,
      tags: post.tags,
      Category: post.Category,
    });

    setLoadTempSavePost(true);
  };

  return (
    <>
      <EditorToolbar />
      <EditorContent
        title={postData.title}
        onChangeTitle={handleChangeTitle}
        content={postData.content}
        onChangeContent={handleChangeContent}
        tags={postData.tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        category={postData.Category}
        onChangeCategory={handleChangeCategory}
        onGetImageUrl={handleGetImageUrl}
        loadTempSavePost={loadTempSavePost}
        setLoadTempSavePost={setLoadTempSavePost}
      />
      <ContentAside>
        <div className='btn_wrapper'>
          {mode === ContentMode.ADD && (
            <span className='temp_save btn'>
              <a className='text' onClick={onTempSavePost}>
                임시저장
              </a>
              <a
                aria-expanded='false'
                aria-label={`임시저장 개수 ${tempCount}개`}
                className='count'
                onClick={() => setIsOpen(true)}
              >
                {tempCount}
              </a>
            </span>
          )}
          <PublishButton className='publish btn'>완료</PublishButton>
        </div>
      </ContentAside>
      <ToastContainer>
        {showToastMessage && (
          <div className='toast_wrapper'>
            <div className={classnames('toast_message', { show })}>작성 중인 글이 저장되었습니다.</div>
          </div>
        )}
      </ToastContainer>
      <TempSavePostsModal isOpen={isOpen} setIsOpen={setIsOpen} tempSavePosts={tempSavePosts} onLoadPost={onLoadPost} />
    </>
  );
};

export default Editor;
