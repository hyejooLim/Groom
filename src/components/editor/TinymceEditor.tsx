import React, { FC, useEffect } from 'react';
import { Editor as EditorType } from 'tinymce';

import { Editor } from '@tinymce/tinymce-react';
import * as S from '@/styles/ts/components/editor/TinymceEditor';

interface TinymceEditorProps {
  editorRef: React.RefObject<EditorType | null>;
  titleRef: React.RefObject<any>;
  htmlContent: string;
  onChangeContent: (HTMLvalue: string, textValue: string) => void;
  onOpenFile: () => void;
  onGetImageUrl: (file: any) => void;
  loadTempPost: boolean;
  setLoadTempPost: React.Dispatch<React.SetStateAction<boolean>>;
  loadContent: boolean;
  setLoadContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const TinymceEditor: FC<TinymceEditorProps> = ({
  editorRef,
  titleRef,
  htmlContent,
  onChangeContent,
  onOpenFile,
  onGetImageUrl,
  loadTempPost,
  setLoadTempPost,
  loadContent,
  setLoadContent,
}) => {
  const tinymcePlugins = ['link', 'lists', 'autoresize'];
  const tinymceToolbar =
    'image-upload blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (loadTempPost) {
      editor.setContent(htmlContent);
      setLoadTempPost(false);
    }

    if (loadContent) {
      editor.setContent(htmlContent);
      setLoadContent(false);
    }
  }, [htmlContent, loadTempPost, loadContent, editorRef]);

  const handleDrop = (e: any) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      onGetImageUrl(Array.prototype.slice.call(e.dataTransfer.files));
    }
  };

  return (
    <S.EditorWrapper>
      <Editor
        onInit={(e, editor) => (editorRef.current = editor)}
        onEditorChange={(value, editor) => onChangeContent(value, editor.getContent({ format: 'text' }))}
        init={{
          body_class: 'content',
          plugins: tinymcePlugins,
          toolbar: tinymceToolbar,
          min_height: 500,
          menubar: false,
          branding: false,
          statusbar: false,
          content_style: S.CONTENT_STYLE,
          block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
          iframe_attrs: { style: 'width: 100%; height: 100%; display: block;' },
          toolbar_mode: 'wrap',
          /** image **/
          image_caption: true, // figure로 감싸짐 (작동 안함)
          paste_data_images: false, // 자동 drag&drop 제거
          file_picker_types: 'image',
          setup(editor) {
            editorRef.current = editor;

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
            editor.setContent(htmlContent);
            editor.execCommand('mceAutoResize');
            titleRef.current?.focus();
          },
        }}
      />
    </S.EditorWrapper>
  );
};

export default TinymceEditor;
