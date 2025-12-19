import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Background from '../components/UI/Background';
import Sidebar from '../components/UI/Sidebar';
import Header from '../components/UI/Header';
import formatKST from '../components/utils/formatKST';
import { deletePost } from '../api/PostsAxios';

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const post = location.state?.postData;
  const currentUserId = 'u_mock_1'; // 예시용 로그인 아이디
  const isMyPost = post && currentUserId === post.userId;

  // 삭제 mutate
  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      return await deletePost(postId);
    },
    onSuccess: () => {
      alert('게시글이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // mutation 실행
      console.log(post.id);
      deleteMutation.mutate(post.id);
    }
  };

  if (!post) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <Background>
      <Sidebar />
      <main className="w-full m-14 bg-white border border-gray-300 shadow-sm min-h-[80vh] flex flex-col">
        {/* 제목 */}
        <div className="p-8 border-b border-gray-100">
          <Header>{post.title}</Header>
        </div>
        {/* 아이디, 작성일 */}
        <div className="bg-[#f9f9f9] px-8 py-3 border-y border-gray-200 flex justify-between items-center text-[13px] text-gray-500">
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-800 text-base">
              {post.userId || '작성자'}
            </span>
            <span className="text-gray-300">|</span>
            <span>{formatKST(post.createdAt)}</span>
          </div>
        </div>
        {/* 카테고리, 태그 */}
        <div className="px-8 py-2 flex justify-between items-center border-b border-gray-100 bg-white">
          <span className="text-xs text-gray-400">[{post.category}]</span>
          <div className="flex gap-2 text-xs text-gray-400">
            {post.tags.map((item: string) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
        {/* 본문 */}
        <div className="flex-1 p-10 text-[17px] text-gray-800 whitespace-pre-wrap">
          {post.body || post.content || '본문 내용이 없습니다.'}
        </div>
        {/* 푸터 */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-center">
          {/* 내 게시글일 때만 수정/삭제 버튼 노출 */}
          {isMyPost && (
            <div className="flex gap-5">
              <button
                onClick={() =>
                  navigate(`/posts/${post.id}/edit`, {
                    state: { postData: post },
                  })
                }
                className="px-6 py-2.5 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                className="mr-6 px-6 py-2.5 bg-white border border-gray-300 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shadow-sm"
              >
                삭제하기
              </button>
            </div>
          )}
          <button
            onClick={() => navigate('/')}
            className="px-8 py-2.5 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            목록보기
          </button>
        </div>
      </main>
    </Background>
  );
};

export default PostDetail;
