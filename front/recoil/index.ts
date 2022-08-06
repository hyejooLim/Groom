import { atom } from 'recoil';
import { Editor, TinyMCE } from 'tinymce';

export const tinymceState = atom<TinyMCE>({
  key: 'tinymce',
  default: null,
  dangerouslyAllowMutability: true,
});

export const tinymceEditorState = atom<Editor>({
  key: 'tinymceEditor',
  default: null,
  dangerouslyAllowMutability: true,
});
