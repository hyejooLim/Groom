import React, { FC } from 'react';
import styled from 'styled-components';
import tinymce from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

import './plugins/image-upload';

const EditorWrapper = styled.div`
  .tox-tinymce {
    border: 0;
    margin: 0;

    .tox-editor-header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tox-sidebar-wrap {
      width: 880px;
      margin: 0 auto;
    }
  }

  .tox:not(.tox-tinymce-inline) .tox-editor-header {
    box-shadow: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

interface TinymceEditorProps {
  content: string;
  onChangeContent: (value: string) => void;
  onOpenFile: () => void;
}

const TinymceEditor: FC<TinymceEditorProps> = ({ content, onChangeContent, onOpenFile }) => {
  console.log(content);

  const tinymcePlugins = ['link', 'lists', 'image-upload'];
  const tinymceToolbar =
    'image-upload blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';

  return (
    <EditorWrapper>
      <Editor
        onChange={(e) => onChangeContent(e.target.getContent())}
        init={{
          plugins: tinymcePlugins,
          toolbar: tinymceToolbar,
          height: 500,
          menubar: false,
          branding: false,
          statusbar: false,
          block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
          content_style: 'body { font-family: Nanum Godic; font-size: 16px }',
          /** image **/
          file_picker_types: 'image',
          open_file_handler: onOpenFile,
          init_instance_callback: (editor) => {
            editor.setContent(content);
          },
        }}
      />
    </EditorWrapper>
  );
};

export default TinymceEditor;
