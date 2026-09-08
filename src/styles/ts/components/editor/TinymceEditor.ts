import styled from 'styled-components';

export const EditorWrapper = styled.div`
  &:focus-visible {
    outline: none;
  }

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

export const CONTENT_STYLE =
  'body { color: #333; font-size: 16px; font-family: Nanum Godic; margin: 0; padding: 0 10px 50px !important; overflow-y: hidden; -webkit-font-smoothing: antialiased; } img[data-mce-selected] { outline-color: #000 !important; } img { max-width: 100%; height: auto; } div.mce-resizehandle { background: #fff !important; border-radius: 6px !important; border: 2px solid #000 !important; width: 12px !important; height: 12px !important; } .content > * { margin: 20px 0 0 0; } .content p + p { margin: 1px auto 0; } .content p { line-height: 1.75; }';
