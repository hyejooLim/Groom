import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "PUT") {
      await prisma.sharedPost.update({
        where: {
          id: Number(req.query.id),
        },
        data: {
          isVisited: true,
        },
      });

      res.status(200).send("ok");
    }

    if (req.method === "DELETE") {
      await prisma.sharedPost.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      res.status(200).send("ok");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
