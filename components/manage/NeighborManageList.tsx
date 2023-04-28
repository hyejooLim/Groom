import React, { FC, useCallback } from 'react';
import { BeatLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { Avatar } from 'antd';
import { BsCloudFill, BsPersonFill } from 'react-icons/bs';

import { UserType } from '../../types';
import PaginationContainer from '../common/PaginationContainer';
import { useCancelNeighbor } from '../../hooks/query/neighbor';
import { currentPageState, firstIndexState, lastIndexState, MANAGE_PAGE_SIZE } from '../../recoil/manage';
import * as S from '../../styles/ts/components/manage/NeighborManageList';

interface NeighborManageListProps {
  neighbors: UserType[];
  isLoading?: boolean;
  isFetching: boolean;
}

const NeighborManageList: FC<NeighborManageListProps> = ({ neighbors, isLoading, isFetching }) => {
  const [firstIndex, setFirstIndex] = useRecoilState(firstIndexState);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

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
    [MANAGE_PAGE_SIZE]
  );

  return (
    <>
      <S.ListWrapper>
        {isLoading || isFetching ? (
          <BeatLoader className='loader' color='#ddd' size={16} />
        ) : (
          <>
            {neighbors?.length > 0 ? (
              neighbors?.slice(firstIndex, lastIndex).map((neighbor) => (
                <S.NeighborInfoWrapper key={neighbor.id}>
                  <div className='neighbor_info'>
                    <Avatar
                      size={40}
                      icon={<BsCloudFill style={{ height: '40px', lineHeight: '40px' }} />}
                      src={neighbor?.imageUrl}
                    />
                    <div className='neighbor_info_text'>
                      <div className='neighbor_title'>
                        <span className='name'>{neighbor.name}</span>
                        <span className='email'>{neighbor.email}</span>
                      </div>
                      <div className='neighbor_sub'>
                        <span>게시글 {neighbor.posts?.length}</span>
                        <span>이웃 {neighbor.neighbors?.length}</span>
                      </div>
                    </div>
                  </div>
                  <S.NeighborCancelButton onClick={() => onCancelNeighbor(neighbor.id, neighbor.name)}>
                    이웃 취소
                  </S.NeighborCancelButton>
                </S.NeighborInfoWrapper>
              ))
            ) : (
              <S.EmptyBox>
                <div className='icon_wrapper'>
                  <BsPersonFill className='icon' />
                </div>
                이웃이 없습니다.
              </S.EmptyBox>
            )}
          </>
        )}
      </S.ListWrapper>
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
