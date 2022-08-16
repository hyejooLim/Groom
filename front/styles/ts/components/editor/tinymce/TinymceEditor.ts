import styled from 'styled-components';

export const EditorWrapper = styled.div`
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
