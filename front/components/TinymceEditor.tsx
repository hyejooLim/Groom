import React, { useRef } from 'react';
import styled from 'styled-components';
import tinymce from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

import useInput from '../hooks/input';

const EditorWrapper = styled.div``;

const EditorHead = styled.div``;

const EditorMain = styled.div`
  .select_category {
    display: block;
    width: 860px;
    height: 30px;
    margin: 46px auto 0;
    position: relative;
  }

  .post_title {
    width: 860px;
    margin: 18px auto 17px;
    padding-bottom: 26px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const TinymceEditor = () => {
  const [content, onChangeContent] = useInput('');
  const editorRef = useRef(null);

  return (
    <Editor
      onInit={(e, editor) => (editorRef.current = editor)}
      initialValue='<p>This is the initial content of the editor.</p>'
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
    // <EditorWrapper>
    //   <EditorHead></EditorHead>
    //   <EditorMain>
    //     <div className='select_category'></div>
    //     <div className='post_title'>
    //       <Input.TextArea placeholder='제목을 입력하세요' />
    //     </div>
    //   </EditorMain>
    // </EditorWrapper>
  );
};

export default TinymceEditor;
