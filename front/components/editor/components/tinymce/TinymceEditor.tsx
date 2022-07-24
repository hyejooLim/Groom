import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import tinymce from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

import './plugins/image-upload';

const EditorWrapper = styled.div`
  .tox-tinymce {
    border: 0;
    margin: 0;

    .tox-sidebar-wrap {
      width: 880px;
      margin: 0 auto;
    }
  }

  .tox:not(.tox-tinymce-inline) .tox-editor-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

interface TinymceEditorProps {
  content: string;
  onChangeContent: (value: string) => void;
  onOpenFile: () => void;
  onGetImageUrl: (file: any) => void;
  imageUrlList: (string | ArrayBuffer)[];
}

const TinymceEditor: FC<TinymceEditorProps> = ({
  content,
  onChangeContent,
  onOpenFile,
  onGetImageUrl,
  imageUrlList,
}) => {
  // console.log(content);

  const tinymcePlugins = ['link', 'lists', 'image-upload'];
  const tinymceToolbar =
    'image-upload blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';

  useEffect(() => {
    if (imageUrlList !== null) {
      console.log('useEffect', imageUrlList);

      handleUploadImage(imageUrlList);
    }
  }, [imageUrlList]);

  const handleDrop = (e: any) => {
    console.log('handle drop');

    if (e.dataTransfer && e.dataTransfer.files) {
      console.log('on get image url');

      onGetImageUrl(Array.prototype.slice.call(e.dataTransfer.files));
    }
  };

  const handleUploadImage = (imageUrlList: (string | ArrayBuffer)[]) => {
    const editor = tinymce.activeEditor;
    const dom = editor.dom;

    imageUrlList.map((imageUrl) => {
      editor.execCommand('mceInsertContent', false, '<img id="new_image" src="' + imageUrl + '" />');

      let img = dom.select('#new_image');
      dom.setAttrib(img, 'id', 'new_image');
      dom.bind(img, 'load', (e) => {
        editor.nodeChanged();
        dom.unbind(img, 'load');
      });
    });
  };

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
          content_style:
            'body { font-family: Nanum Godic; font-size: 16px; overflow-y: hidden; padding-bottom: 20px; color: #333 } img[data-mce-selected] { outline-color: #000 !important } img { max-width: 100%; height: auto } div.mce-resizehandle { background: #fff !important; border-radius: 6px !important; border: 2px solid #000 !important; width: 12px !important; height: 12px !important; }',
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
