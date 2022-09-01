export type ContentModeType = 'ADD' | 'EDIT' | 'VIEW';
export type WriteModeType = 'DEFAULT' | 'MARKDOWN';

export type UserType = {
  id?: number;
  email: string;
  password: string;
  name: string;
  comments: CommentItem[];
  posts?: PostItem[]; // 작성한 게시글
  tempPosts?: TempPostItem[];
  subscribedPosts?: PostItem[]; // 유저가 구독한 게시글
  likedPosts?: PostItem[]; // 유저가 좋아요한 게시글
  createdAt?: string;
  updatedAt?: string;
};

export type PostItem = {
  id?: number;
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  comments?: CommentItem[];
  category: CategoryItem;
  categoryId?: number;
  author?: UserType;
  authorId?: number;
  subscribers?: UserType[];
  likers?: UserType[];
  createdAt?: string;
  updatedAt?: string;
};

export type TempPostItem = {
  id?: number;
  title: string;
  content: string;
  htmlContent: string;
  tags?: TagItem[];
  category: CategoryItem;
  categoryId?: number;
  author?: UserType;
  authorId?: number;
  createdAt?: string;
};

export type TagItem = {
  id?: number;
  name: string;
  posts?: PostItem[];
  tempPosts?: TempPostItem[];
};

export type CategoryItem = {
  id?: number;
  name?: string;
  priority?: number;
  posts?: PostItem[];
  tempPosts?: TempPostItem[];
};

export type CommentItem = {
  id?: number;
  post: PostItem;
  postId?: number;
  author: UserType;
  authorId?: number;
  content: string;
  datetime: string;
};

export type CategoryJson = {
  append: CategoryItem[];
  update: CategoryItem[];
  delete: CategoryItem[];
};
