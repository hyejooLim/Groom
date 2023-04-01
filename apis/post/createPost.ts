import clientApi from '..';
import { TagItem, CategoryItem } from '../../types';
import { revalidateMainPage } from '../revalidate';

interface CreatePostProps {
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
  isPublic: boolean;
  allowComments: boolean;
  createdAt?: string;
}

//: Promise<Response | string>
const createPost = async ({ data }: { data: CreatePostProps }) => {
  await clientApi.post('/post', data).then((res) => {
    res === 'ok' && revalidateMainPage();
  });
};

export default createPost;
