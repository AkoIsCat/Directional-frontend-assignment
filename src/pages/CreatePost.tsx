import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Background from '../components/UI/Background';
import Sidebar from '../components/UI/Sidebar';
import type { BasePost, Category } from '../types';
import { createPost } from '../api/PostsAxios';

const CATEGORIES = ['NOTICE', 'QNA', 'FREE'];
const FORBIDDEN_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];

const PostCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 입력 상태 관리
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<Category>('NOTICE');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // 1. 게시글 생성 Mutation
  const createMutation = useMutation({
    mutationFn: async (newPost: BasePost) => {
      return await createPost(newPost);
    },
    onSuccess: () => {
      alert('게시글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
    onError: (error) => {
      console.error('등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    },
  });

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (tags.length >= 5) return alert('태그는 최대 5개까지 가능합니다.');
      if (newTag.length > 24) return alert('태그는 24자 이내로 입력해주세요.');
      if (tags.includes(newTag)) return alert('이미 추가된 태그입니다.');
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  // 금지어 실시간 체크
  const hasForbiddenWords = useMemo(() => {
    return FORBIDDEN_WORDS.some((word) => body.includes(word));
  }, [body]);

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) {
      alert('제목과 본문을 모두 입력해주세요.');
      return;
    }
    createMutation.mutate({
      title,
      body,
      category,
      tags,
    });
  };

  return (
    <Background>
      <Sidebar />
      <main className="w-full m-14 bg-white border border-gray-300 shadow-sm min-h-[70vh] flex flex-col">
        {/* 제목 입력 영역 */}
        <div className="p-8 border-b border-gray-100">
          <input
            className="w-full text-2xl font-bold border-b border-gray-200 focus:border-black outline-none transition-colors py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
        {/* 카테고리 선택 바 */}
        <div className="bg-[#f9f9f9] px-8 py-3 border-y border-gray-200 flex justify-between items-center text-[13px]">
          <span className="text-gray-500 font-medium">카테고리 설정</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border border-gray-300 bg-white px-2 py-1 outline-none rounded-sm text-gray-600"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* 태그 입력 */}
        <div className="px-8 py-4 border-b border-gray-100 bg-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((item: string) => (
              <div
                key={item}
                className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-100"
              >
                #{item}
                <button
                  onClick={() => removeTag(item)}
                  className="text-red-400 hover:text-red-600 font-bold ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="태그 입력 후 Enter"
            className="w-full text-xs border border-gray-200 p-2 outline-none focus:border-blue-400 rounded-sm"
          />
        </div>
        {/* 본문 입력 */}
        <div className="flex-1 p-10 relative">
          <textarea
            className={`w-full h-full text-[17px] text-gray-800 outline-none resize-none whitespace-pre-wrap min-h-75 ${
              hasForbiddenWords ? 'bg-red-50' : ''
            }`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="이곳에 내용을 입력하세요..."
          />
          {hasForbiddenWords && (
            <p className="absolute bottom-4 left-10 text-red-500 text-[11px] font-bold bg-white/80 p-1">
              ⚠️ 금지어가 포함되어 등록이 불가능합니다.
            </p>
          )}
        </div>
        {/* 푸터 버튼 */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={hasForbiddenWords || createMutation.isPending}
            className={`px-8 py-2.5 text-sm font-medium text-black transition-colors shadow-sm ${
              hasForbiddenWords || createMutation.isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-800'
            }`}
          >
            {createMutation.isPending ? '등록 중...' : '작성완료'}
          </button>
        </div>
      </main>
    </Background>
  );
};

export default PostCreate;
