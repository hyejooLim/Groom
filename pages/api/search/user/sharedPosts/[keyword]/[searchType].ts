import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../../lib/prisma";

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

      let user = {};
      const keyword = req.query.keyword as string;
      const searchType = req.query.searchType as string;

      if (searchType === "title") {
        user = await prisma.user.findUnique({
          where: {
            email: session.user?.email,
          },
          select: {
            receivedPosts: {
              where: {
                post: {
                  title: {
                    contains: keyword,
                  },
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
      } else if (searchType === "content") {
        user = await prisma.user.findUnique({
          where: {
            email: session.user?.email,
          },
          select: {
            receivedPosts: {
              where: {
                post: {
                  content: {
                    contains: keyword,
                  },
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
      } else if (searchType === "tag") {
        user = await prisma.user.findUnique({
          where: {
            email: session.user?.email,
          },
          select: {
            receivedPosts: {
              where: {
                post: {
                  tags: {
                    some: {
                      name: keyword,
                    },
                  },
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
      } else if (searchType === "sender") {
        user = await prisma.user.findUnique({
          where: {
            email: session.user?.email,
          },
          select: {
            receivedPosts: {
              where: {
                sender: {
                  name: {
                    contains: keyword,
                  },
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
      }

      res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
