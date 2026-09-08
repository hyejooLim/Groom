import SkeletonElement from './SkeletonElement';

const SkeletonManageProfile = () => {
  return (
    <>
      <div>
        <SkeletonElement type='title' />
        <SkeletonElement type='text' />
      </div>
      <SkeletonElement type='title' />
    </>
  );
};

export default SkeletonManageProfile;
