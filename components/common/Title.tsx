import React, { FC } from 'react';

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <div className='flex justify-center mb-8'>
      <h2 className='text-center w-24 py-2 border-b border-dashed border-light-grey text-2xl'>{title}</h2>
    </div>
  );
};

export default Title;
