export type PostType = {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  authorId: string;
  createdAt: string;
};

export type CommentItem = {
  author: string;
  content: React.ReactNode;
  datetime: string;
};
