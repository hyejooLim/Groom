import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';

import AppLayout from '../components/AppLayout';

const pageSize = 8; // 페이지 당 포스터 개수

// const TitleWrapper = styled.div`
//   /* width: 100%; */
//   /* position: relative; */
//   text-align: center;
// `;

// 컴포넌트화 필요
const Title = styled.h2`
  display: inline-block;
  margin: 0 0 40px;
  padding: 0 5px 3px;
  font-size: 20px;
  font-weight: 400;
  color: #444;
  line-height: 200%;
  border-bottom: 1px dashed #ddd;
  text-shadow: 1px 1px #dedede;
  word-break: break-word;
`;

const ListWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all; // ?
  height: 448px;

  & ul {
    margin: 0;
    border-top: 1px dotted #ddd;

    & li {
      padding: 12px 10px 9px;
      font-size: 14px;
      border-bottom: 1px dotted #ddd;
    }
  }
`;

const PosterInfo = styled.div`
  float: right;
`;

const Home = () => {
  const [posters, setPosters] = useState([
    { category: 'algorithm', title: '입국심사', author: 'sandy', date: '2022.06.12' },
    { category: 'algorithm', title: '거리두기 확인하기', author: 'sandy', date: '2022.06.11' },
    { category: 'algorithm', title: '점프와 순간 이동', author: 'tomas', date: '2022.05.28' },
    { category: 'algorithm', title: '끝말잇기', author: 'jenny', date: '2022.05.16' },
    { category: 'javascript', title: '자바스크립트 알아보기', author: 'tomas', date: '2022.04.30' },
    { category: 'typescript', title: '타입스크립트 시작하기', author: 'elli', date: '2022.04.29' },
    { category: 'react', title: '리액트란?', author: 'sandy', date: '2022.04.24' },
    { category: 'react', title: '리액트 프레임워크', author: 'mint', date: '2022.04.20' },
    { category: 'algorithm', title: '전화번호 목록', author: 'sandy', date: '2022.04.27' },
    { category: 'algorithm', title: '프린터', author: 'happy', date: '2022.04.03' },
  ]);
  const [current, setCurrent] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const onChangePage = useCallback(
    (page) => {
      setCurrent(page);
      setFirstIndex((page - 1) * pageSize);
      setLastIndex(page * pageSize);
    },
    [pageSize]
  );

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title>전체 글</Title>
      </div>
      <ListWrapper>
        <ul>
          {posters?.slice(firstIndex, lastIndex).map((poster, idx) => (
            <li key={idx}>
              <a style={{ fontSize: '15px' }}>
                [{poster.category}] {poster.title}
              </a>
              <PosterInfo>
                <span style={{ color: '#666', marginRight: 8 }}>{poster.author}</span>
                <span style={{ color: '#666' }}>{poster.date}</span>
              </PosterInfo>
            </li>
          ))}
        </ul>
      </ListWrapper>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          pageSize={pageSize}
          current={current}
          total={posters.length}
          onChange={onChangePage}
          style={{
            listStyle: 'none',
            padding: 0,
            width: '30%',
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        />
      </div>
    </AppLayout>
  );
};

export default Home;
