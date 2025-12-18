import { login } from '../api/LoginAxios';
import { useQuery } from '@tanstack/react-query';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useQuery({
    queryKey: ['initialAuth'],
    queryFn: async () => {
      const existingToken = localStorage.getItem('accessToken');
      if (existingToken) return { accessToken: existingToken };

      // 토큰이 없으면 로그인 호출
      const data = await login();
      // 성공 시 로컬스토리지에 토큰 저장
      localStorage.setItem('accessToken', data.token);
      return data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <p>인증 정보를 확인 중입니다...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <p className="text-red-500">
          인증에 실패했습니다. 환경 변수나 API를 확인해주세요.
        </p>
      </div>
    );
  }
  // 인증 성공 시 Routes 렌더링
  return <>{children}</>;
};

export default AuthWrapper;
