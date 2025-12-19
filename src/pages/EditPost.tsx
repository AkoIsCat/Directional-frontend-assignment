import Background from '../components/UI/Background';
import Sidebar from '../components/UI/Sidebar';
import formatKST from '../components/utils/formatKST';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

const CATEGORIES = ['NOTICE', 'QNA', 'FREE'];
const FORBIDDEN_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.postData;

  // 수정용 상태 관리
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || post?.content || '');
  const [category, setCategory] = useState(post?.category || 'FREE');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  // 태그 추가 핸들러
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

  // 태그 삭제 핸들러
  const removeTag = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  // 금지어 포함 여부 실시간 체크
  const hasForbiddenWords = useMemo(() => {
    return FORBIDDEN_WORDS.some((word) => body.includes(word));
  }, [body]);

  const handleUpdate = () => {
    if (hasForbiddenWords) {
      alert('본문에 금지어가 포함되어 있어 수정할 수 없습니다.');
      return;
    }
    if (body.length < 1) {
      alert('내용을 입력해 주세요.');
      return;
    }
    // API 호출 로직이 들어갈 자리
    console.log({ title, body, category, tags });
    alert('수정되었습니다.');
    navigate('/');
  };

  if (!post) return null;

  return (
    <Background>
      <Sidebar />
      <main className="w-full m-14 bg-white border border-gray-300 shadow-sm min-h-[80vh] flex flex-col">
        {/* 제목 수정 */}
        <div className="p-8 border-b border-gray-100">
          <input
            className="w-full text-2xl font-bold border-b border-transparent focus:border-black outline-none transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
        {/* 아이디, 작성일 */}
        <div className="bg-[#f9f9f9] px-8 py-3 border-y border-gray-200 flex justify-between items-center text-[13px] text-gray-500">
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-800 text-base">
              {post.userId}
            </span>
            <span className="text-gray-300">|</span>
            <span>{formatKST(post.createdAt)}</span>
          </div>
          {/* 카테고리 선택 */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 bg-white px-1 py-0.5 outline-none rounded-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* 태그 입력 및 목록 */}
        <div className="px-8 py-2 border-b border-gray-100 bg-white">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((item: string) => (
              <div
                key={item}
                className="flex items-center gap-1 text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full"
              >
                #{item}
                <button
                  onClick={() => removeTag(item)}
                  className="text-red-400 hover:text-red-600 font-bold"
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
            placeholder="태그 입력 후 Enter (최대 5개, 24자 이내)"
            className="w-full text-xs border border-gray-200 p-1.5 outline-none focus:border-blue-400"
          />
        </div>
        {/* 본문 수정 (금지어 체크 포함) */}
        <div className="flex-1 p-10 relative">
          <textarea
            className={`w-full h-full text-[17px] text-gray-800 outline-none resize-none whitespace-pre-wrap ${
              hasForbiddenWords ? 'bg-red-50' : ''
            }`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="본문 내용을 입력하세요"
          />
          {hasForbiddenWords && (
            <div className="absolute bottom-4 left-10 text-red-500 text-xs font-bold">
              ⚠️ 금지어가 포함되어 있습니다 (캄보디아, 프놈펜, 불법체류,
              텔레그램)
            </div>
          )}
        </div>
        {/* 푸터 */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm"
          >
            취소
          </button>
          <button
            onClick={handleUpdate}
            disabled={hasForbiddenWords}
            className={`px-8 py-2.5 text-sm font-medium text-black transition-colors shadow-sm ${
              hasForbiddenWords
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-800 active:bg-red-900'
            }`}
          >
            수정완료
          </button>
        </div>
      </main>
    </Background>
  );
};
export default EditPost;
