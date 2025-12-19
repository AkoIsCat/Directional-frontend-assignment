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

// Legend 클릭 핸들러 타입을 안전하게 추출
type LegendClickObj = Parameters<
  NonNullable<ComponentProps<typeof Legend>['onClick']>
>[0];

interface TeamMetric {
  cups: number;
  bugs: number;
  productivity: number;
}

interface TeamData {
  team: string;
  series: TeamMetric[];
}

interface Props {
  data: TeamData[];
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
}

const CoffeeImpactSection = ({ data }: Props) => {
  const teams = Array.isArray(data) ? data : [];

  const [hiddenTeams, setHiddenTeams] = useState<string[]>([]);

  const handleLegendClick = (obj: LegendClickObj) => {
    const { value } = obj; // Line의 name 속성에 지정한 팀 이름이 들어옵니다.
    if (typeof value === 'string') {
      setHiddenTeams((prev) =>
        prev.includes(value)
          ? prev.filter((k) => k !== value)
          : [...prev, value]
      );
    }
  };

  const teamColors: Record<string, string> = {
    Frontend: '#3b82f6',
    Backend: '#ef4444',
    AI: '#8b5cf6',
  };

  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm h-75 w-full rounded-xl relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="cups"
            type="number"
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 12 }}
          />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />

          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            wrapperStyle={{ zIndex: 1000 }}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}
          />

          {/* Legend 클릭 이벤트 연결 및 커서 스타일 추가 */}
          <Legend
            verticalAlign="bottom"
            height={50}
            onClick={handleLegendClick}
            wrapperStyle={{ cursor: 'pointer', userSelect: 'none' }}
          />

          {teams.map((teamData) => {
            const color = teamColors[teamData.team] || '#8884d8';
            const isHidden = hiddenTeams.includes(teamData.team);

            return (
              <React.Fragment key={teamData.team}>
                {/* 실선: Bugs (팀 이름을 name으로 설정하여 범례 기준점으로 사용) */}
                <Line
                  yAxisId="left"
                  data={teamData.series}
                  type="monotone"
                  dataKey="bugs"
                  stroke={color}
                  strokeWidth={2}
                  name={teamData.team} // 범례에 표시될 이름
                  dot={{ r: 4, fill: color, strokeWidth: 0 }}
                  connectNulls
                  hide={isHidden} // 4. 상태에 따라 숨김 처리
                />
                {/* 점선: Productivity */}
                <Line
                  yAxisId="right"
                  data={teamData.series}
                  type="monotone"
                  dataKey="productivity"
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name={teamData.team}
                  legendType="none" // 범례 중복 방지 (실선만 범례에 표시)
                  connectNulls
                  hide={isHidden} // 상태에 따라 동시에 숨김 처리
                  dot={(props: CustomDotProps): ReactNode => {
                    const { cx, cy } = props;
                    if (
                      !isHidden &&
                      typeof cx === 'number' &&
                      typeof cy === 'number'
                    ) {
                      return (
                        <rect
                          key={`square-${teamData.team}-${cx}`}
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

export default CoffeeImpactSection;
