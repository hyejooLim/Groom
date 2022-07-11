export type CommentItem = {
  User: UserType;
  content: React.ReactNode;
  datetime: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  posts?: PostItem[];
};

export type PostItem = {
  id: string;
  title: string;
  content: string;
  Comments?: CommentItem[];
  likeCount?: number;
  Category: CategoryItem;
  author: string;
  authorId: string;
  createdAt: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  posts?: PostItem[]; // 작성한 게시글
  subscribers?: UserType[];
};

export type ContentModeType = 'NEW' | 'EDIT';
export type WriteModeType = 'DEFAULT' | 'MARKDOWN';
