import { CategoryItem, TagItem } from '../types';

interface createTempPostProps {
  title: string;
  content: string;
  thumbnailContent: string;
  tags?: TagItem[];
  category: CategoryItem;
}

const createTempPost = async ({ data }: { data: createTempPostProps }) => {
  const iframe = document.querySelector('.tox-edit-area__iframe') as HTMLIFrameElement;
  const childElementCount = iframe.contentWindow.document.body.childElementCount;

  let newContent = '';
  for (let i = 0; i < childElementCount; i++) {
    newContent += iframe.contentWindow.document.body.children[i].outerHTML;
  }

  data.content = newContent;

  const response = await fetch('/api/tempPost', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createTempPost;
