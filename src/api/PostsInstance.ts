import axios from 'axios';

const PostsInstance = axios.create({
  baseURL: import.meta.env.VITE_POSTS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터
PostsInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 최신 토큰 가져오기
    const token = localStorage.getItem('accessToken');

    // 토큰이 존재한다면 헤더에 Bearer 토큰 주입
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

export default PostsInstance;
