import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Router from 'next/router';
import AWS from 'aws-sdk';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import TempPostsModal from '../TempPostsModal';
import ToastMessage from '../ToastMessage';
import { tinymceEditorState } from '../../recoil/tinymce';
import { tempPostsCountState, tempPostsState } from '../../recoil/tempPosts';
import createTempPost from '../../apis/createTempPost';
import createPost from '../../apis/createPost';
import getTempPosts from '../../apis/getTempPosts';
import * as ContentMode from '../../constants/ContentMode';
import { ContentModeType, PostItem, CategoryItem, TempPostItem } from '../../types';
import { EditorWrapper, ContentAside, PublishButton } from '../../styles/ts/components/editor/Editor';

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
        title: post.title,
        content: post.content,
        HTMLcontent: post.HTMLcontent,
        tags: post.tags,
        category: post.category,
      };
    } else {
      return {
        title: '',
        content: '',
        HTMLcontent: '',
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

  const handleChangeContent = (HTMLvalue: string, textValue: string) => {
    setPostData({
      ...postData,
      HTMLcontent: HTMLvalue,
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

    let img = dom.select('img');
    dom.bind(img, 'load', (e) => {
      tinymceEditor.nodeChanged();
      dom.unbind(img, 'load');
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

  const handleTempPost = async () => {
    try {
      if (!postData.title && !postData.content) {
        alert('제목을 입력하세요.');
        return;
      }

      if (tempPosts.length === 100) {
        alert('최대 100개의 글을 임시 저장할 수 있습니다.');
        return;
      }

      const newTempPost: TempPostItem = {
        title: postData.title,
        content: postData.content,
        HTMLcontent: postData.HTMLcontent,
        tags: postData.tags,
        category: postData.category,
      };

      setTempPost(newTempPost);

      if (tempPosts.find((post: TempPostItem) => JSON.stringify(post) === JSON.stringify(newTempPost))) {
        alert('이미 저장된 글입니다.');
        return;
      }

      const result = await createTempPost({
        data: newTempPost,
      });

      if (result.ok) {
        setTempPosts((prevState: TempPostItem[]) => {
          return [newTempPost, ...prevState];
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

    setPostData({
      ...postData,
      title: post.title,
      HTMLcontent: post.HTMLcontent,
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

  const onPublishPost = async () => {
    try {
      if (!postData.title && !postData.content) {
        alert('글을 작성해 주세요.');
        return;
      }

      const confirm = window.confirm('글을 발행하시겠습니까?');
      if (!confirm) {
        return;
      }

      const result = await createPost({ data: postData });

      if (result.ok) {
        Router.push('/manage/post');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EditorWrapper className='groom_wrapper'>
      <EditorToolbar />
      <EditorContent
        title={postData.title}
        onChangeTitle={handleChangeTitle}
        HTMLcontent={postData.HTMLcontent}
        onChangeContent={handleChangeContent}
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
          <PublishButton className='publish btn' onClick={onPublishPost}>
            완료
          </PublishButton>
        </div>
      </ContentAside>
      <ToastMessage toastMessage={toastMessage} showToastMessage={showToastMessage} show={show} />
      <TempPostsModal isOpen={isOpen} setIsOpen={setIsOpen} onLoadPost={onLoadPost} />
    </EditorWrapper>
  );
};

export default Editor;
