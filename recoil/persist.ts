import { atom, AtomEffect, useSetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const ssrAllowedState = atom({
  key: 'ssrAllowed',
  default: false,
});

export const useSsrAllowedState = () => {
  const setSsrAllowed = useSetRecoilState(ssrAllowedState);
  return () => setSsrAllowed(true);
};

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrAllowedState).then(() => persistAtom(param));
};
