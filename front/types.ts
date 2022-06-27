export type PostType = {
  id: string;
  title: string;
  content: string;
  Comments?: CommentItem[];
  likeCount?: number;
  category: string;
  author: string;
  authorId: string;
  createdAt: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  posts?: PostType[]; // 작성한 게시글
  subscribers?: number; // 구독자 수
};

export type CommentItem = {
  User: UserType;
  content: React.ReactNode;
  datetime: string;
};
