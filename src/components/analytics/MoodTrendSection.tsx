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
import type { MoodTrend } from '../../types';

// Legend 클릭 시 들어오는 타입을 컴포넌트 Props에서 안전하게 추출
type LegendClickObj = Parameters<
  NonNullable<ComponentProps<typeof Legend>['onClick']>
>[0];

interface Props {
  data: MoodTrend[];
}

const MoodTrendSection = ({ data = [] }: Props) => {
  const [hidden, setHidden] = useState<string[]>([]);

  const handleLegendClick = (obj: LegendClickObj) => {
    const dataKey = obj?.dataKey;
    if (typeof dataKey === 'string') {
      setHidden(
        (prev) =>
          prev.includes(dataKey)
            ? prev.filter((k) => k !== dataKey) // 이미 숨겨져 있으면 제거 (다시 표시)
            : [...prev, dataKey] // 안 숨겨져 있으면 추가 (숨김 처리)
      );
    }
  };

  const keys = ['happy', 'stressed', 'tired'];
  const colors = ['#10b981', '#ef4444', '#f59e0b'];

  return (
    <div className="grid grid-cols-2 gap-4 h-75 w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      {/* 바 차트 영역 */}
      <div className="h-full">
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
                // hide 속성을 사용하여 그래프만 숨기고 범례는 유지
                hide={hidden.includes(k)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 면적 차트 영역 */}
      <div className="h-full">
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
                // hide 속성을 사용하여 그래프만 숨기고 범례는 유지
                hide={hidden.includes(k)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodTrendSection;
