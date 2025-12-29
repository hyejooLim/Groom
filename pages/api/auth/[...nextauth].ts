export const runtime = "nodejs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "../../../lib/prisma";
import { verifyPassword } from "../../../utils/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
          },
        });

        if (!user) {
          throw new Error("가입되지 않은 이메일입니다.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("비밀번호가 틀렸습니다.");
        }

        const userWithoutPassword = {
          id: String(user.id),
          email: user.email,
          name: user.name,
        };
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email },
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          posts: {
            select: {
              id: true,
              title: true,
              category: {
                select: {
                  name: true,
                },
              },
              isPublic: true,
              allowComments: true,
            },
          },
          neighbors: {
            select: {
              id: true,
            },
          },
        },
      });

      session.user = user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
