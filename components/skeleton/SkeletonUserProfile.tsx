import SkeletonElement from './SkeletonElement';
import * as S from '../../styles/ts/components/skeleton/SkeletonUserProfile';

const SkeletonUserProfile = () => {
  return (
    <>
      <S.InfoArea>
        <SkeletonElement type='avatar' />
        <S.UserInfo>
          <SkeletonElement type='title' />
          <SkeletonElement type='text' />
          <SkeletonElement type='info' />
        </S.UserInfo>
      </S.InfoArea>
      <SkeletonElement type='button' />
    </>
  );
};

export default SkeletonUserProfile;
