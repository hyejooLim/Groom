import NextAuth from 'next-auth';
import { PostItem, UserType } from '../types';

// session.user 속성 재정의
declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      imageUrl: string;
      posts: PostItem[];
      neighbors: UserType[];
    };
  }
}
