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

export type UserType = {
  id: string;
  name: string;
  email: string;
  posts?: PostItem[]; // 작성한 게시글
  subscribedPosts?: PostItem[]; // 유저가 구독한 게시글
};

export type ContentModeType = 'ADD' | 'EDIT' | 'VIEW';
export type WriteModeType = 'DEFAULT' | 'MARKDOWN';
