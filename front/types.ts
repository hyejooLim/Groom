export type ContentModeType = 'ADD' | 'EDIT' | 'VIEW';
export type WriteModeType = 'DEFAULT' | 'MARKDOWN';

// 게시글 발행 예약 날짜
export type ReserveDate = {
  date: string;
  hour: string;
  minute: string;
};

export type UserType = {
  id?: number;
  email: string;
  password: string;
  name: string;
  imageUrl?: string; // 프로필 이미지 주소
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
  isPublic: boolean; // 공개 또는 비공개 (작성자만 볼 수 있음)
  allowComments: boolean;
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
