import { TinyMCE } from 'tinymce';

export const loadTinyMce = async () => {
  let tinymce: TinyMCE = null;

  if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    await import('tinymce').then((mod) => (tinymce = mod.default));
  }

  return tinymce;
};
