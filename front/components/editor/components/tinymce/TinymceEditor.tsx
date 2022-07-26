import React, { FC } from 'react';
import styled from 'styled-components';
import tinymce from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

import './plugins/image-upload';

const EditorWrapper = styled.div`
  .tox-tinymce {
    border: 0;
    margin: 0 auto;
    width: 880px;

    .tox-sidebar-wrap {
      width: 880px;
      margin: 0 auto;
    }
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
}

const TinymceEditor: FC<TinymceEditorProps> = ({ content, onChangeContent, onOpenFile, onGetImageUrl }) => {
  // console.log(content);

  const tinymcePlugins = ['link', 'lists', 'image-upload'];
  const tinymceToolbar =
    'image-upload blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';

  const handleDrop = (e: any) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      onGetImageUrl(Array.prototype.slice.call(e.dataTransfer.files));
    }
  };

  return (
    <EditorWrapper>
      <Editor
        onChange={(e) => onChangeContent(e.target.getContent())}
        init={{
          plugins: tinymcePlugins,
          toolbar: tinymceToolbar,
          min_height: 500,
          menubar: false,
          branding: false,
          statusbar: false,
          block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
          content_style:
            'body { font-family: Nanum Godic; font-size: 16px; padding: 0 10px 50px 10px; margin: 0; overflow-y: hidden; color: #333; word-wrap: break-word; -webkit-font-smoothing: antialiased } img[data-mce-selected] { outline-color: #000 !important } img { max-width: 100%; height: auto } div.mce-resizehandle { background: #fff !important; border-radius: 6px !important; border: 2px solid #000 !important; width: 12px !important; height: 12px !important; } p[data-ke-size="size16"] { line-height: 1.75 } body > * { margin: 20px 0 0 0 }',
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
