import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '../../../lib/prisma';
import { verifyPassword } from '../../../utils/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
          select: {
            email: true,
            password: true,
            name: true,
            posts: true,
          },
        });

        if (!user) {
          throw new Error('User not found.');
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Password not correct.');
        }

        const userWithoutPassword = {
          email: user.email,
          name: user.name,
          posts: user.posts,
        };
        return userWithoutPassword;
      },
    }),
  ],
  secret: process.env.COOKIE_SECRET,
});
