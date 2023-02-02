import React, { FC } from 'react';

interface SkeletonProps {
  type: string;
}

const SkeletonElement: FC<SkeletonProps> = ({ type }) => {
  return <div className={`skeleton ${type}`}></div>;
};

export default SkeletonElement;
