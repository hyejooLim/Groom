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
  tags?: string[];
  Comments?: CommentItem[];
  likeCount?: number;
  Category: CategoryItem;
  author: string;
  authorId: string;
  createdAt: string;
};

export type SubscriberType = {
  id: string;
  name: string;
  email: string;
  posts?: PostItem[];
  subscribers?: SubscriberType[]; // 구독자
  categories: CategoryItem[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  posts?: PostItem[]; // 작성한 게시글
  subscribers?: SubscriberType[]; // 유저가 구독한 사람들
};

export type ContentModeType = 'NEW' | 'EDIT';
export type WriteModeType = 'DEFAULT' | 'MARKDOWN';
