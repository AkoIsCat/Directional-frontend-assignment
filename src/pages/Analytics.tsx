import { useQuery } from '@tanstack/react-query';

import Background from '../components/UI/Background';
import Sidebar from '../components/UI/Sidebar';
import Header from '../components/UI/Header';

import CoffeeSection from '../components/analytics/CoffeeSection';
import SnackSection from '../components/analytics/SnackSection';
import MoodTrendSection from '../components/analytics/MoodTrendSection';
import WorkoutTrendSection from '../components/analytics/WorkoutTrendSection';
import CoffeeImpactSection from '../components/analytics/CoffeeImpactSection';
import SnackImpactSection from '../components/analytics/SnackImpactSection';

import {
  getCoffeeBrands,
  getCoffeeConsumption,
  getMoodTrend,
  getSnackBrands,
  getSnackImpact,
  getWorkoutTrend,
} from '../api/MockAxios';

const Analytics = () => {
  const { data: coffeeBrands } = useQuery({
    queryKey: ['coffeeBrands'],
    queryFn: getCoffeeBrands,
    refetchOnWindowFocus: false,
  });

  const { data: snackBrands } = useQuery({
    queryKey: ['snackBrands'],
    queryFn: getSnackBrands,
    refetchOnWindowFocus: false,
  });

  const { data: MoodTrend } = useQuery({
    queryKey: ['MoodTrend'],
    queryFn: getMoodTrend,
    refetchOnWindowFocus: false,
  });

  const { data: WorkoutTrend } = useQuery({
    queryKey: ['WorkoutTrend'],
    queryFn: getWorkoutTrend,
    refetchOnWindowFocus: false,
  });

  const { data: CoffeeConsumption } = useQuery({
    queryKey: ['CoffeeConsumption'],
    queryFn: getCoffeeConsumption,
    refetchOnWindowFocus: false,
  });

  const { data: SnackImpact } = useQuery({
    queryKey: ['SnackImpact'],
    queryFn: getSnackImpact,
    refetchOnWindowFocus: false,
  });

  console.log(coffeeBrands, snackBrands);
  console.log(MoodTrend, WorkoutTrend);
  console.log(CoffeeConsumption, SnackImpact);

  return (
    <Background>
      <Sidebar />
      <main className="m-14">
        <Header>데이터 시각화</Header>
        {/* 첫번째 줄 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">인기 커피 브랜드</h2>
            <div className="h-100">
              <CoffeeSection data={coffeeBrands || []} />
            </div>
          </section>
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">인기 간식 브랜드</h2>
            <div className="h-100">
              <SnackSection data={snackBrands || []} />
            </div>
          </section>
        </div>
        {/* 두 번째 줄 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">주간 무드 트렌드</h2>
            <div className="h-100">
              <MoodTrendSection data={MoodTrend || []} />
            </div>
          </section>
          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">주간 운동 트렌드</h2>
            <div className="h-100">
              <WorkoutTrendSection data={WorkoutTrend || []} />
            </div>
          </section>
        </div>
        {/* 세 번째 줄 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">
              팀별 커피 소비/버그/생산성
            </h2>
            <div className="h-100">
              <CoffeeImpactSection data={CoffeeConsumption?.teams || []} />
            </div>
          </section>
          <section className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">부서별 간식 영향</h2>
            <div className="h-100">
              <SnackImpactSection data={SnackImpact?.departments || []} />
            </div>
          </section>
        </div>
      </main>
    </Background>
  );
};

export default Analytics;
