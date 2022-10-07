import { atom } from 'recoil';

export const todayCountState = atom<number>({
  key: 'todayCount',
  default: 0,
});

export const totalCountState = atom<number>({
  key: 'totalCount',
  default: 0,
});
