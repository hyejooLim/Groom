import SkeletonElement from './SkeletonElement';

const SkeletonLastPosts = () => {
  return (
    <ul>
      <SkeletonElement type='box' />
      <SkeletonElement type='box' />
      <SkeletonElement type='box' />
      <SkeletonElement type='box' />
    </ul>
  );
};

export default SkeletonLastPosts;
