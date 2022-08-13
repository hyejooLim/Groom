import React, { FC, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Editor as EditorType } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

import { tinymceEditorState } from '../../../recoil/tinymce';

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
  onChangeThumbnailContent: (value: string) => void;
  onOpenFile: () => void;
  onGetImageUrl: (file: any) => void;
  loadTempPost: boolean;
  setLoadTempPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const TinymceEditor: FC<TinymceEditorProps> = ({
  content,
  onChangeContent,
  onChangeThumbnailContent,
  onOpenFile,
  onGetImageUrl,
  loadTempPost,
  setLoadTempPost,
}) => {
  const [tinymceEditor, setTinymceEditor] = useRecoilState(tinymceEditorState);
  const editorRef = useRef(null);

  console.log('content', content);

  const tinymcePlugins = ['link', 'lists', 'autoresize'];
  const tinymceToolbar =
    'image-upload blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';

  useEffect(() => {
    if (loadTempPost) {
      tinymceEditor.setContent(content);
      setLoadTempPost(false);
    }
  }, [content, loadTempPost]);

  const onEditorChange = (value: string, editor: EditorType) => {
    onChangeContent(value);
    onChangeThumbnailContent(editor.getContent({ format: 'text' }));
  };

  const handleDrop = (e: any) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      onGetImageUrl(Array.prototype.slice.call(e.dataTransfer.files));
    }
  };

  return (
    <EditorWrapper>
      <Editor
        onInit={(e, editor) => (editorRef.current = editor)}
        onEditorChange={(value, editor) => onEditorChange(value, editor)}
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
          image_caption: true, // figure로 감싸짐 (작동 안함)
          paste_data_images: false, // 자동 drag&drop 제거
          file_picker_types: 'image',
          setup(editor) {
            setTinymceEditor(editor);

            editor.ui.registry.addButton('image-upload', {
              icon: 'image',
              tooltip: '업로드',
              onAction: () => {
                editor.execCommand('image-upload');
              },
            });

            editor.addCommand('image-upload', onOpenFile);
          },
          init_instance_callback: (editor) => {
            editor.on('drop', handleDrop);
            editor.setContent(content);
            editor.execCommand('mceAutoResize');
          },
        }}
      />
    </EditorWrapper>
  );
};

export default TinymceEditor;
