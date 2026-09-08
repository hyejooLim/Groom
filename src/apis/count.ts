import clientApi from '.';
import { VisitorsCount } from '@/@types/types';

const getVisitorsCount = async (): Promise<VisitorsCount> => {
  const response = await clientApi.get<VisitorsCount>('/count');

  return response;
};

export default getVisitorsCount;
