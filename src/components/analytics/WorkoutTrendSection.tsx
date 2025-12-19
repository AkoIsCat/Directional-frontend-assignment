import { useState, type ComponentProps } from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { WorkoutTrend } from '../../types';

interface Props {
  data: WorkoutTrend[];
}

// Legend 컴포넌트의 onClick 속성에서 첫 번째 인자의 타입을 추출합니다.
type LegendClickProps = Parameters<
  NonNullable<ComponentProps<typeof Legend>['onClick']>
>[0];

const WorkoutTrendSection = ({ data = [] }: Props) => {
  const [hidden, setHidden] = useState<string[]>([]);

  // 추출한 타입을 사용하여 any 없이 핸들러 정의
  const handleLegendClick = (props: LegendClickProps) => {
    // Recharts의 LegendProps 구조에 따라 dataKey를 안전하게 추출
    const { dataKey } = props;

    if (typeof dataKey === 'string') {
      setHidden((prev) =>
        prev.includes(dataKey)
          ? prev.filter((k) => k !== dataKey)
          : [...prev, dataKey]
      );
    }
  };

  const keys = ['running', 'cycling', 'stretching'];
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="grid grid-cols-2 gap-4 h-75 w-full">
      <div className="border border-gray-200 bg-white p-4 shadow-sm rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis unit="%" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend
              onClick={handleLegendClick}
              wrapperStyle={{ cursor: 'pointer' }}
            />
            {keys.map((k, i) => (
              <Bar
                key={k}
                dataKey={k}
                stackId="a"
                fill={colors[i]}
                hide={hidden.includes(k)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-gray-200 bg-white p-4 shadow-sm rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis unit="%" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend
              onClick={handleLegendClick}
              wrapperStyle={{ cursor: 'pointer' }}
            />
            {keys.map((k, i) => (
              <Area
                key={k}
                type="monotone"
                dataKey={k}
                stackId="1"
                fill={colors[i]}
                stroke={colors[i]}
                fillOpacity={0.6}
                hide={hidden.includes(k)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutTrendSection;
