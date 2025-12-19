import MockInstance from './MockInstance';

export const getMockPosts = async () => {
  try {
    const { data } = await MockInstance('/posts', {
      params: { count: 500 },
    });
    return data;
  } catch (error) {
    console.error('게시글 목록 로드 에러: ', error);
  }
};

export const getCoffeeBrands = async () => {
  try {
    const { data } = await MockInstance('/top-coffee-brands');
    return data;
  } catch (error) {
    console.error('인기 커피 브랜드 로드 에러: ', error);
  }
};

export const getSnackBrands = async () => {
  try {
    const { data } = await MockInstance('/popular-snack-brands');
    return data;
  } catch (error) {
    console.error('인기 간식 브랜드 로드 에러: ', error);
  }
};

export const getMoodTrend = async () => {
  try {
    const { data } = await MockInstance('/weekly-mood-trend');
    return data;
  } catch (error) {
    console.error('주간 무드 트렌드 로드 에러: ', error);
  }
};

export const getWorkoutTrend = async () => {
  try {
    const { data } = await MockInstance('/weekly-workout-trend');
    return data;
  } catch (error) {
    console.error('주간 운동 트렌드 로드 에러: ', error);
  }
};

export const getCoffeeConsumption = async () => {
  try {
    const { data } = await MockInstance('/coffee-consumption');
    return data;
  } catch (error) {
    console.error('팀별 커피 소비/버그/생산성 로드 에러: ', error);
  }
};

export const getSnackImpact = async () => {
  try {
    const { data } = await MockInstance('/snack-impact');
    return data;
  } catch (error) {
    console.error('부서별 간식 영향 로드 에러: ', error);
  }
};
