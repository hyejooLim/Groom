import React, { FC, ChangeEvent, useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import Router from 'next/router';
import AWS from 'aws-sdk';
import { Modal } from 'antd';
import dayjs from 'dayjs';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import TempPostsModal from './TempPostsModal';
import ToastMessage from '../common/ToastMessage';
import SettingModal from './SettingModal';
import { tinymceEditorState } from '../../recoil/tinymce';
import useGetTempPosts from '../../hooks/query/tempPosts';
import { useCreateTempPost, useUpdateTempPost } from '../../hooks/query/tempPost';
import useDebounce from '../../hooks/common/debounce';
import useCreateAutoSave from '../../hooks/query/autosave';
import getAutoSave from '../../apis/autosave/getAutoSave';
import createPost from '../../apis/post/createPost';
import updatePost from '../../apis/post/updatePost';
import * as ContentMode from '../../constants/ContentMode';
import { ContentModeType, PostItem, CategoryItem, TempPostItem } from '../../types';
import * as S from '../../styles/ts/components/editor/Editor';

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.NEXT_PUBLIC_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_BUCKET_SECRET_ACCESS_KEY,
});

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
        htmlContent: post.htmlContent,
        tags: post.tags,
        category: post.category,
        isPublic: post.isPublic,
        allowComments: post.allowComments,
        createdAt: post.createdAt,
      };
    } else {
      return {
        title: '',
        content: '',
        htmlContent: '',
        tags: [],
        category: { id: null, name: '' },
        isPublic: true,
        allowComments: true,
      };
    }
  };

  let editorUrl = '';
  const [postData, setPostData] = useState<PostItem>(makePostState());
  const [loadContent, setLoadContent] = useState(false);

  const createAutoSave = useCreateAutoSave();
  let debouncedPostData = useDebounce(postData, 5000);

  const { data: tempPosts } = useGetTempPosts();
  const createTempPost = useCreateTempPost();
  const updateTempPost = useUpdateTempPost();

  const [loadTempPost, setLoadTempPost] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [toastHeight, setToastHeight] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isClickedPage, setIsClickedPage] = useState(false);
  const [isOpenTempPostsModal, setIsOpenTempPostsModal] = useState(false);
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const tinymceEditor = useRecoilValue(tinymceEditorState);

  const showToastBox = useCallback((message: string) => {
    setShowToastMessage(true);
    setToastMessage(message);

    setTimeout(() => {
      setToastHeight(true);
    }, 1000);

    setTimeout(() => {
      setToastHeight(false);
    }, 3000);

    setTimeout(() => {
      setShowToastMessage(false);
    }, 4000);
  }, []);

  const askContinueWrite = async () => {
    try {
      const result = await getAutoSave();

      if (result === null) {
        return;
      }

      const { title, content, htmlContent, category, tags, createdAt } = result;

      Modal.confirm({
        content: `${dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}에 저장된 글이 있습니다. 이어서 작성하시겠습니까?`,
        cancelText: '취소',
        okText: '확인',
        onCancel: () => {
          setPostData(makePostState());
          localStorage.removeItem('isSaved'); // 글을 이어서 작성하지 않는 경우 임시저장글을 새로 저장할 수 있음
        },
        onOk: () => {
          setPostData({
            ...postData,
            title,
            content,
            htmlContent,
            category,
            tags,
          });
          setLoadContent(true);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (mode === ContentMode.ADD) {
      askContinueWrite();
      debouncedPostData = null;
    }
  }, []);

  useEffect(() => {
    if (mode === ContentMode.ADD) {
      if (debouncedPostData) {
        const { title, content, htmlContent, category, tags } = postData;

        createAutoSave.mutate({ title, content, htmlContent, categoryId: category?.id, tags });
      }
    }
  }, [debouncedPostData]);

  useEffect(() => {
    if (createTempPost.isSuccess) {
      showToastBox('작성 중인 글이 저장되었습니다.');
      localStorage.setItem('isSaved', 'true');
    }
  }, [createTempPost.isSuccess]);

  useEffect(() => {
    if (updateTempPost.isSuccess) {
      showToastBox('작성 중인 글이 저장되었습니다.');
    }
  }, [updateTempPost.isSuccess]);

  useEffect(() => {
    document.querySelector('.groom_wrapper').addEventListener('click', clickPage);
    tinymceEditor?.on('click', clickPage);

    return () => {
      document.querySelector('.groom_wrapper')?.removeEventListener('click', clickPage);
      tinymceEditor?.off('click', clickPage);
    };
  }, [tinymceEditor]);

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
  }, [isClickedPage]);

  const clickPage = () => {
    setIsClickedPage(true);
  };

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

    if (!isClickedPage) {
      history.back(); // 페이지에 변화가 없으면 뒤로가기
      return;
    }

    if (window.confirm('사이트에서 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.')) {
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

    setIsTitleEmpty(false);
  };

  const handleChangeContent = (htmlValue: string, textValue: string) => {
    setPostData({
      ...postData,
      htmlContent: htmlValue,
      content: textValue,
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

    let images = dom.select('img');
    images.map((image) => {
      image.removeAttribute('data-mce-src');
    });

    dom.bind(images, 'load', (e) => {
      tinymceEditor.nodeChanged();
      dom.unbind(images, 'load');
    });
  };

  const handleGetImageUrl = (files: Array<File>) => {
    [].forEach.call(files, async (file: File) => {
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'groom-project',
          Key: file.name,
          Body: file,
        },
      });

      const promise = upload.promise();
      const imageUrl = await promise.then((response) => response.Location);

      handleUploadImage(imageUrl, file.name);
    });
  };

  const handleSaveTempPost = () => {
    if (tempPosts.length === 100) {
      alert('최대 100개의 글을 임시 저장할 수 있습니다.');
      return;
    }

    if (!postData.title && !postData.content) {
      alert('제목을 입력하세요.');
      return;
    }

    const newTempPost: TempPostItem = {
      title: postData.title,
      content: postData.content,
      htmlContent: postData.htmlContent,
      tags: postData.tags,
      category: postData.category,
    };

    const { title, content, htmlContent, tags, category } = postData;

    localStorage.getItem('isSaved')
      ? updateTempPost.mutate({ id: tempPosts[0].id, title, content, htmlContent, tags, category })
      : createTempPost.mutate(newTempPost);
  };

  const onLoadPost = (post: TempPostItem) => {
    setIsOpenTempPostsModal(false);

    setPostData({
      ...postData,
      title: post.title,
      htmlContent: post.htmlContent,
      tags: post.tags,
      category: post.category,
    });

    setLoadTempPost(true);
    showToastBox('글을 불러왔습니다.');
  };

  const onClickCompleteButton = useCallback(() => {
    if (!postData.title) {
      setIsTitleEmpty(true);
      return;
    }

    setIsOpenSettingModal(true);
  }, [postData.title]);

  const onPublishPost = async () => {
    try {
      // 글쓰기 모드에 따라 api 호출
      let result: Response | string = null;

      if (mode === ContentMode.ADD) {
        result = await createPost({ data: postData });
      } else if (mode === ContentMode.EDIT) {
        result = await updatePost({ data: postData });
      }

      if (result === 'ok') {
        Router.push('/manage/posts');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.EditorWrapper className='groom_wrapper'>
      <EditorToolbar />
      <EditorContent
        title={postData.title}
        isTitleEmpty={isTitleEmpty}
        onChangeTitle={handleChangeTitle}
        htmlContent={postData.htmlContent}
        onChangeContent={handleChangeContent}
        tags={postData.tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        category={postData.category}
        onChangeCategory={handleChangeCategory}
        onGetImageUrl={handleGetImageUrl}
        loadTempPost={loadTempPost}
        setLoadTempPost={setLoadTempPost}
        loadContent={loadContent}
        setLoadContent={setLoadContent}
      />
      <S.ContentAside>
        <div className='btn_wrapper'>
          {mode === ContentMode.ADD && (
            <span className='temp_save btn'>
              <a className='text' onClick={handleSaveTempPost}>
                임시저장
              </a>
              <a
                aria-expanded='false'
                aria-label={`임시저장 개수 ${tempPosts?.length}개`}
                className='count'
                onClick={() => setIsOpenTempPostsModal(true)}
              >
                {tempPosts?.length}
              </a>
            </span>
          )}
          <S.CompleteButton className='complete btn' onClick={onClickCompleteButton}>
            완료
          </S.CompleteButton>
        </div>
      </S.ContentAside>
      <ToastMessage show={showToastMessage} height={toastHeight} message={toastMessage} />
      <TempPostsModal
        isOpen={isOpenTempPostsModal}
        setIsOpen={setIsOpenTempPostsModal}
        onLoadPost={onLoadPost}
        onSaveTempPost={handleSaveTempPost}
      />
      <SettingModal
        mode={mode}
        createdAt={post?.createdAt}
        postData={postData}
        setPostData={setPostData}
        isOpen={isOpenSettingModal}
        setIsOpen={setIsOpenSettingModal}
        onPublishPost={onPublishPost}
      />
    </S.EditorWrapper>
  );
};

export default Editor;
