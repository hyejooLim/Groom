import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../../prisma/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).send({ message: "세션이 만료되었습니다." });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        select: {
          receivedPosts: {
            where: {
              post: {
                categoryId: Number(req.query.id),
              },
            },
            include: {
              sender: {
                select: {
                  name: true,
                  imageUrl: true,
                  password: false,
                },
              },
              receiver: {
                select: {
                  name: true,
                  imageUrl: true,
                  password: false,
                },
              },
              post: {
                select: {
                  id: true,
                  title: true,
                  categoryId: true,
                  category: {
                    select: {
                      name: true,
                    },
                  },
                  authorId: true,
                  author: {
                    select: {
                      name: true,
                    },
                  },
                  createdAt: true,
                },
              },
            },
            orderBy: [
              {
                sharedAt: "desc",
              },
            ],
          },
        },
      });

      res.status(200).json(user.receivedPosts);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
