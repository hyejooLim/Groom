import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getCsrfToken } from 'next-auth/react';
import dayjs from 'dayjs';

import prisma from '../../lib/prisma';
import { VisitorsCount } from '../../types';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const csrfToken = await getCsrfToken({ req });
      if (!csrfToken) {
        return res.status(401).send({ message: '토큰이 존재하지 않습니다.' });
      }

      const exVisitorsCount = await prisma.visitorsCount.findFirst();
      let visitorsCount: VisitorsCount = null;

      // 사이트의 첫 방문인 경우
      if (!exVisitorsCount) {
        await prisma.visitor.create({
          data: {
            csrfToken,
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
        if (dayjs().diff(exVisitorsCount.expireDate) > 0) {
          await prisma.visitor.deleteMany({
            where: {
              NOT: {
                csrfToken,
              },
            },
          });

          visitorsCount = await prisma.visitorsCount.update({
            where: {
              id: exVisitorsCount.id,
            },
            data: {
              todayCount: 1,
              totalCount: exVisitorsCount.totalCount + 1,
              expireDate: dayjs().format('YYYY-MM-DD 23:59:59'),
            },
          });
        } else {
          const visitor = await prisma.visitor.findFirst({
            where: {
              csrfToken,
            },
          });

          // 사이트에 처음 방문하는 유저인 경우
          if (!visitor) {
            await prisma.visitor.create({
              data: {
                csrfToken,
              },
            });

            visitorsCount = await prisma.visitorsCount.update({
              where: {
                id: exVisitorsCount.id,
              },
              data: {
                todayCount: exVisitorsCount.todayCount + 1,
                totalCount: exVisitorsCount.totalCount + 1,
              },
            });
          } else {
            visitorsCount = exVisitorsCount;
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
