import React, { FC, useCallback } from 'react';
import { BeatLoader } from 'react-spinners';
import { BsPersonFill } from 'react-icons/bs';
import { Avatar, Button } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';

import { UserType } from '@/@types/types';
import PaginationContainer from '../common/PaginationContainer';
import { useCancelNeighbor } from '@/hooks/query/neighbor';
import { MANAGE_PAGE_SIZE, useManageStore } from '@/stores/useManageStore';

interface NeighborManageListProps {
  neighbors: UserType[];
  isLoading?: boolean;
  isFetching: boolean;
}

const NeighborManageList: FC<NeighborManageListProps> = ({ neighbors, isLoading, isFetching }) => {
  const firstIndex = useManageStore((state) => state.firstIndex);
  const setFirstIndex = useManageStore((state) => state.setFirstIndex);

  const lastIndex = useManageStore((state) => state.lastIndex);
  const setLastIndex = useManageStore((state) => state.setLastIndex);

  const currentPage = useManageStore((state) => state.currentPage);
  const setCurrentPage = useManageStore((state) => state.setCurrentPage);

  const cancelNeighbor = useCancelNeighbor();

  const onCancelNeighbor = useCallback((neighborId: number, neighborName: string) => {
    if (!confirm(`${neighborName}님을 이웃 취소하시겠습니까?`)) {
      return;
    }

    cancelNeighbor.mutate(neighborId);
  }, []);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE],
  );

  return (
    <>
      <div className='mt-2 h-[383px] border border-[#e0e5ee] bg-white leading-[180%] break-all'>
        {isLoading || isFetching ? (
          <div className='text-center leading-[383px]'>
            <BeatLoader className='loader' color='#ddd' size={16} />
          </div>
        ) : (
          <>
            {neighbors?.length > 0 ? (
              neighbors?.slice(firstIndex, lastIndex).map((neighbor) => (
                <div
                  key={neighbor.id}
                  className='group flex items-center justify-between border-b border-[#f1f3f6] px-4 py-3 hover:bg-[#fafbfd]'
                >
                  <div className='flex items-center'>
                    <Avatar sx={{ width: 40, height: 40 }} src={neighbor?.imageUrl}>
                      <CloudIcon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <div className='ml-4'>
                      <div className='flex items-center'>
                        <span className='text-md'>{neighbor.name}</span>
                        <span className='ml-4 text-grey'>{neighbor.email}</span>
                      </div>
                      <div className='text-dark'>
                        <span className='mr-2'>게시글 {neighbor.posts?.length}</span>•
                        <span className='ml-2'>이웃 {neighbor.neighbors?.length}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => onCancelNeighbor(neighbor.id, neighbor.name)}
                  >
                    이웃 취소
                  </Button>
                </div>
              ))
            ) : (
              <div className='box-border py-32 text-center text-[#959595]'>
                <div className='mx-auto mb-4 block h-[60px] w-[60px] rounded-[80px] bg-[#d0d0d0] pt-4 box-border'>
                  <BsPersonFill className='mx-auto block h-[27px] w-[27px] text-white' />
                </div>
                이웃이 없습니다.
              </div>
            )}
          </>
        )}
      </div>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={neighbors?.length}
        onChange={onChangePage}
      />
    </>
  );
};

export default NeighborManageList;
