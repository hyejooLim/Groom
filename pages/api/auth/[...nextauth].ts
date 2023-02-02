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
          },
        });

        if (!user) {
          throw new Error('가입되지 않은 이메일입니다.');
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error('비밀번호가 틀렸습니다.');
        }

        const userWithoutPassword = {
          email: user.email,
          name: user.name,
        };
        return userWithoutPassword;
      },
    }),
  ],
  secret: process.env.COOKIE_SECRET,
});
