import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dayjs from 'dayjs';

import prisma from '../../lib/prisma';
import { VisitorsCount } from '../../types';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const visitorsCountModel = await prisma.visitorsCount.findFirst();

      const session = await getSession({ req });
      if (!session) {
        return res.status(200).json(visitorsCountModel);
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user.email,
        },
      });

      if (!user) {
        return res.status(200).json(visitorsCountModel);
      }

      let visitorsCount: VisitorsCount = null;

      // 사이트의 첫 방문인 경우
      if (!visitorsCountModel) {
        await prisma.visitor.create({
          data: {
            id: user.id,
          },
        });

        visitorsCount = await prisma.visitorsCount.create({
          data: {
            todayCount: 1,
            totalCount: 1,
            expireDate: dayjs().format('YYYY-MM-DD 23:59:59'),
          },
        });
      } else {
        // 날짜가 1일 이상 지나서 만료 날짜를 새로 세팅
        if (dayjs().diff(visitorsCountModel.expireDate) > 0) {
          await prisma.visitor.deleteMany({
            where: {
              NOT: {
                id: user.id,
              },
            },
          });

          visitorsCount = await prisma.visitorsCount.update({
            where: {
              id: visitorsCountModel.id,
            },
            data: {
              todayCount: 1,
              totalCount: visitorsCountModel.totalCount + 1,
              expireDate: dayjs().format('YYYY-MM-DD 23:59:59'),
            },
          });
        } else {
          const visitor = await prisma.visitor.findUnique({
            where: {
              id: user.id,
            },
          });

          // 사이트에 처음 방문하는 유저인 경우
          if (!visitor) {
            await prisma.visitor.create({
              data: {
                id: user.id,
              },
            });

            visitorsCount = await prisma.visitorsCount.update({
              where: {
                id: visitorsCountModel.id,
              },
              data: {
                todayCount: visitorsCountModel.todayCount + 1,
                totalCount: visitorsCountModel.totalCount + 1,
              },
            });
          } else {
            visitorsCount = visitorsCountModel;
          }
        }
      }

      return res.status(200).json(visitorsCount);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handler;
