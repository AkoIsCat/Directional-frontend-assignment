import { getMockPosts } from '../api/MockAxios';
import PostsTable from '../components/table/PostsTable';
import Background from '../components/UI/Background';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';

import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useMemo, useState } from 'react';
import type { AllPost } from '../types';

const Posts = () => {
  const [displayCount, setDisplayCount] = useState(20); // 처음에 보여줄 개수

  const { ref } = useInView({
    rootMargin: '200px',
    onChange: (inView) => {
      if (inView && data && displayCount < data.items.length) {
        setDisplayCount((prev) => prev + 20);
      }
    },
  });

  const { data, isLoading } = useQuery<AllPost>({
    queryKey: ['posts'],
    queryFn: getMockPosts,
    refetchOnWindowFocus: false,
  });

  const visibleData = useMemo(() => {
    return data?.items.slice(0, displayCount) ?? [];
  }, [data, displayCount]);

  if (isLoading) return <div>초기 로딩 중...</div>;
  return (
    <Background>
      <Sidebar />
      <main className="m-14">
        <Header>게시판</Header>
        <PostsTable
          data={visibleData ?? []}
          bottomRef={ref}
          hasNextPage={data ? displayCount < data.items.length : false}
        />
      </main>
    </Background>
  );
};

export default Posts;
