import SkeletonElement from './SkeletonElement';

const SkeletonUserProfile = () => {
  return (
    <>
      <div className='flex items-center mt-2 mb-6'>
        <SkeletonElement type='avatar' />
        <div className='ml-8'>
          <SkeletonElement type='title' />
          <SkeletonElement type='text' />
          <SkeletonElement type='info' />
        </div>
      </div>
      <SkeletonElement type='button' />
    </>
  );
};

export default SkeletonUserProfile;
