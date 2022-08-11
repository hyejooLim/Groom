import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Button } from 'antd';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import TempPostsModal from '../TempPostsModal';
import ToastMessage from '../ToastMessage';
import { tinymceEditorState } from '../../recoil/tinymce';
import createTempPost from '../../api/createTempPost';
import * as ContentMode from '../constants/ContentMode';
import { ContentModeType, PostItem, CategoryItem, TempPostItem } from '../../types';
import { tempPostsCountState, tempPostsState } from '../../recoil/tempPosts';
import getTempPosts from '../../api/getTempPosts';

const EditorWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 944px;
`;

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

interface EditorProps {
  post?: PostItem;
  mode: ContentModeType;
}

const Editor: FC<EditorProps> = ({ post, mode }) => {
  const makePostState = () => {
    if (post && mode === ContentMode.EDIT) {
      return {
        title: post.title,
        content: post.content,
        tags: post.tags,
        category: post.category,
      };
    } else {
      return {
        title: '',
        content: '',
        tags: [],
        category: { id: null, name: '' },
      };
    }
  };

  let editorUrl = '';
  const [postData, setPostData] = useState<PostItem>(makePostState());

  const [tempPost, setTempPost] = useState<TempPostItem>(null);
  const [tempPosts, setTempPosts] = useRecoilState(tempPostsState);
  const [tempPostsCount, setTempPostsCount] = useRecoilState(tempPostsCountState);
  const [loadTempPost, setLoadTempPost] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const tinymceEditor = useRecoilValue(tinymceEditorState);

  useEffect(() => {
    handleGetTempPosts();
  }, []);

  const handleGetTempPosts = async () => {
    try {
      const result = await getTempPosts();

      setTempPosts(result);
      setTempPostsCount(result.length);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleChangeThumbnailContent = (value: string) => {
    setTempPost({
      ...tempPost,
      thumbnailContent: value,
    });
  };

  const handleAddTag = (value: string) => {
    setPostData({
      ...postData,
      tags: [...postData.tags, { name: value }],
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
      category: { id: Number(option.id), name: value },
    });
  };

  const handleUploadImage = async (imageUrl: string, filename: string) => {
    const dom = tinymceEditor.dom;

    tinymceEditor.execCommand(
      'mceInsertContent',
      false,
      '<img src="' + imageUrl + '" data-filename="' + filename + '" />'
    );

    let img = dom.select('img');
    dom.bind(img, 'load', (e) => {
      tinymceEditor.nodeChanged();
      dom.unbind(img, 'load');
    });
  };

  const base64ToBlob = (base64Data: string, filename: string) => {
    const parts = base64Data.split(';base64,'); // seperate data
    const contentType = parts[0].split(':')[1]; // ex) image/png
    const decodedData = window.atob(parts[1]); // decode base64 encoded data
    const uint8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; i++) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: contentType });
    const blobUrl = URL.createObjectURL(blob);

    handleUploadImage(blobUrl, filename);
  };

  const handleGetImageUrl = (files: Array<File>) => {
    console.log('files', files);

    [].forEach.call(files, (file: File) => {
      const reader = new FileReader();

      // 읽기 동작이 성공적으로 완료되면 실행
      reader.onload = () => {
        base64ToBlob(reader.result as string, file.name);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleTempPost = async () => {
    try {
      if (!postData.title && !postData.content) {
        alert('제목을 입력하세요.');
        return;
      }

      setTempPost((prevState: TempPostItem) => {
        return {
          ...prevState,
          title: postData.title,
          content: postData.content,
          tags: postData.tags,
          category: postData.category,
        };
      });

      if (tempPosts.find((post: TempPostItem) => JSON.stringify(post) === JSON.stringify(tempPost))) {
        alert('이미 저장된 글입니다.');
        return;
      }

      const result = await createTempPost({
        data: tempPost,
      });

      if (result.ok) {
        setTempPosts((prevState: TempPostItem[]) => {
          return [tempPost, ...prevState];
        });

        setTempPostsCount((prev) => prev + 1);

        setShowToastMessage(true);
        setToastMessage('작성 중인 글이 저장되었습니다.');

        setTimeout(() => {
          setShow(true);
        }, 1000);

        setTimeout(() => {
          setShow(false);
        }, 3000);

        setTimeout(() => {
          setShowToastMessage(false);
        }, 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onLoadPost = (post: TempPostItem) => {
    setIsOpen(false);
    console.log(post);

    setPostData({
      ...postData,
      title: post.title,
      content: post.content,
      tags: post.tags,
      category: post.category,
    });

    setLoadTempPost(true);

    setShowToastMessage(true);
    setToastMessage('글을 불러왔습니다.');

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

  return (
    <EditorWrapper className='groom_wrapper'>
      <EditorToolbar />
      <EditorContent
        title={postData.title}
        onChangeTitle={handleChangeTitle}
        content={postData.content}
        onChangeContent={handleChangeContent}
        onChangeThumbnailContent={handleChangeThumbnailContent}
        tags={postData.tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        category={postData.category}
        onChangeCategory={handleChangeCategory}
        onGetImageUrl={handleGetImageUrl}
        loadTempPost={loadTempPost}
        setLoadTempPost={setLoadTempPost}
      />
      <ContentAside>
        <div className='btn_wrapper'>
          {mode === ContentMode.ADD && (
            <span className='temp_save btn'>
              <a className='text' onClick={handleTempPost}>
                임시저장
              </a>
              <a
                aria-expanded='false'
                aria-label={`임시저장 개수 ${tempPostsCount}개`}
                className='count'
                onClick={() => setIsOpen(true)}
              >
                {tempPostsCount}
              </a>
            </span>
          )}
          <PublishButton className='publish btn'>완료</PublishButton>
        </div>
      </ContentAside>
      <ToastMessage toastMessage={toastMessage} showToastMessage={showToastMessage} show={show} />
      <TempPostsModal isOpen={isOpen} setIsOpen={setIsOpen} onLoadPost={onLoadPost} />
    </EditorWrapper>
  );
};

export default Editor;
