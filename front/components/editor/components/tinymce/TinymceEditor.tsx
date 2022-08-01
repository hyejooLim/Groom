import React, { FC, useEffect, useRef } from 'react';
import dynamic, { DynamicOptions, Loader } from 'next/dynamic';
import styled from 'styled-components';
import tinymce from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

import './plugins/image-upload';

// type DynamicImportType = () => Promise<{ default: React.ComponentType<any> }>;

// const Obj: any = dynamic((): any => import('@tinymce/tinymce-react'), {
//   ssr: false,
// });

// const Editor = Obj.Editor;

const EditorWrapper = styled.div`
  .tox-tinymce {
    border: 0;
    margin: 0 auto;
    width: 880px;
  }

  .tox:not(.tox-tinymce-inline) .tox-editor-header {
    position: fixed;
    top: 0;
    width: 880px;
    height: 70px;
    left: 50%;
    transform: translate(-50%);
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    background-color: transparent;
  }
`;

interface TinymceEditorProps {
  content: string;
  onChangeContent: (value: string) => void;
  onOpenFile: () => void;
  onGetImageUrl: (file: any) => void;
  loadTempSavePost: boolean;
  setLoadTempSavePost: React.Dispatch<React.SetStateAction<boolean>>;
}

const TinymceEditor: FC<TinymceEditorProps> = ({
  content,
  onChangeContent,
  onOpenFile,
  onGetImageUrl,
  loadTempSavePost,
  setLoadTempSavePost,
}) => {
  const editorRef = useRef(null);

  console.log(content);

  const tinymcePlugins = ['link', 'lists', 'image-upload'];
  const tinymceToolbar =
    'image-upload blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';

  useEffect(() => {
    console.log('useEffect 실행');

    if (loadTempSavePost) {
      console.log('임시 저장글 불러옴');
      tinymce.activeEditor.setContent(content);
      setLoadTempSavePost(false);
    }
  }, [content, loadTempSavePost]);

  useEffect(() => {
    const divElement = document.querySelector('.tox-tinymce') as HTMLDivElement;
    const iframeElement = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
    console.log('divElement', divElement);
    console.log('iframeElement', iframeElement);

    if (divElement && iframeElement) {
      let newHeight = iframeElement.contentWindow.document.body.scrollHeight + 50;
      console.log(newHeight);

      if (newHeight <= 500) {
        divElement.style.height = '500px'; // 실제 변화가 있는 부분
        iframeElement.style.height = '500px'; // 코드에 보여지는 부분
        return;
      }

      divElement.style.height = newHeight + 'px';
      iframeElement.style.height = newHeight + 'px';
    }
  }, [content]);

  const handleDrop = (e: any) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      onGetImageUrl(Array.prototype.slice.call(e.dataTransfer.files));
    }
  };

  return (
    <EditorWrapper>
      <Editor
        onInit={(e, editor) => (editorRef.current = editor)}
        onChange={(e) => onChangeContent(e.target.getContent())}
        init={{
          plugins: tinymcePlugins,
          toolbar: tinymceToolbar,
          min_height: 500,
          menubar: false,
          branding: false,
          statusbar: false,
          block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
          body_class: 'content',
          // content_css: 'styles/content.css',
          iframe_attrs: { style: 'width: 100%; height: 100%; display: block;' },
          content_style:
            'body { font-family: Nanum Godic; font-size: 16px; padding: 0 10px 50px 10px; margin: 0; color: #333; -webkit-font-smoothing: antialiased; overflow-y: hidden } img[data-mce-selected] { outline-color: #000 !important } img { max-width: 100%; height: auto; } div.mce-resizehandle { background: #fff !important; border-radius: 6px !important; border: 2px solid #000 !important; width: 12px !important; height: 12px !important; } p[data-ke-size="size16"] { line-height: 1.75 } body > * { margin: 20px 0 0 0 }',
          /** image **/
          file_picker_types: 'image',
          open_file_handler: onOpenFile,
          init_instance_callback: (editor) => {
            editor.on('drop', handleDrop);
            editor.setContent(content);
          },
        }}
      />
    </EditorWrapper>
  );
};

export default TinymceEditor;
