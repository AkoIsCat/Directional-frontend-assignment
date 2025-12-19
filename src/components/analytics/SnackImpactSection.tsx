import React, { useState, type ReactNode, type ComponentProps } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type LegendClickObj = Parameters<
  NonNullable<ComponentProps<typeof Legend>['onClick']>
>[0];

interface SnackMetric {
  snacks: number;
  meetingsMissed: number;
  morale: number;
}

interface DepartmentData {
  name: string;
  metrics: SnackMetric[];
}

interface Props {
  data: DepartmentData[];
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
}

const SnackImpactSection = ({ data = [] }: Props) => {
  const departments = Array.isArray(data) ? data : [];

  // 숨겨진 부서 이름을 관리하는 상태
  const [hiddenDepts, setHiddenDepts] = useState<string[]>([]);

  // 토글 핸들러: 클릭된 범례의 'value'(이름)를 사용하여 상태 업데이트
  const handleLegendClick = (obj: LegendClickObj) => {
    const { value } = obj; // Recharts Legend 클릭 시 'value'에 Line의 'name'이 담깁니다.
    if (typeof value === 'string') {
      setHiddenDepts((prev) =>
        prev.includes(value)
          ? prev.filter((k) => k !== value)
          : [...prev, value]
      );
    }
  };

  const deptColors: Record<string, string> = {
    Marketing: '#3b82f6',
    Sales: '#ef4444',
    HR: '#8b5cf6',
  };

  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm h-75 w-full rounded-xl relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="snacks"
            type="number"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />

          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            wrapperStyle={{ zIndex: 1000 }}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={50}
            onClick={handleLegendClick}
            // 클릭 가능한 부서만 범례 아이콘 투명도 조절로 시각적 피드백 제공 가능
            wrapperStyle={{ cursor: 'pointer', userSelect: 'none' }}
          />

          {departments.map((dept) => {
            const color = deptColors[dept.name] || '#8884d8';
            const isHidden = hiddenDepts.includes(dept.name);

            return (
              <React.Fragment key={dept.name}>
                {/* 실선 라인: 이 라인이 해당 부서의 범례 대표가 됩니다. */}
                <Line
                  yAxisId="left"
                  data={dept.metrics}
                  type="monotone"
                  dataKey="meetingsMissed"
                  stroke={color}
                  strokeWidth={2}
                  name={dept.name} // Legend에 표시될 이름 (토글 기준점)
                  dot={{ r: 4, fill: color, strokeWidth: 0 }}
                  connectNulls
                  hide={isHidden}
                  // 범례 클릭 시 구분하기 쉽게 투명도 조절 (옵션)
                  strokeOpacity={isHidden ? 0.2 : 1}
                />
                {/* 점선 라인: legendType="none"으로 범례 중복 방지 */}
                <Line
                  yAxisId="right"
                  data={dept.metrics}
                  type="monotone"
                  dataKey="morale"
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name={dept.name}
                  legendType="none" // 범례에는 나타나지 않음
                  connectNulls
                  hide={isHidden}
                  dot={(props: CustomDotProps): ReactNode => {
                    const { cx, cy } = props;
                    if (
                      !isHidden &&
                      typeof cx === 'number' &&
                      typeof cy === 'number'
                    ) {
                      return (
                        <rect
                          key={`sq-snack-${dept.name}-${cx}`}
                          x={cx - 4}
                          y={cy - 4}
                          width={8}
                          height={8}
                          fill={color}
                        />
                      );
                    }
                    return null;
                  }}
                />
              </React.Fragment>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SnackImpactSection;
