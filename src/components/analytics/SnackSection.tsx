import { useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { SnackBrand } from '../../types';

interface Props {
  data: SnackBrand[];
}

// Recharts LegendPayload와 호환되는 인터페이스 정의
interface LegendEntry {
  value?: string | number;
  name?: string;
  payload?: {
    name?: string;
    [key: string]: unknown;
  };
}

const SnackSection = ({ data = [] }: Props) => {
  const [hiddenBrands, setHiddenBrands] = useState<string[]>([]);
  // 레드 계열의 간식 브랜드 색상 팔레트
  const COLORS = ['#b91c1c', '#dc2626', '#ef4444', '#f87171', '#fca5a5'];

  // 토글 핸들러
  const handleLegendClick = (entry: LegendEntry) => {
    const brandName =
      entry.value?.toString() || entry.name || entry.payload?.name;

    if (brandName) {
      setHiddenBrands((prev) =>
        prev.includes(brandName)
          ? prev.filter((b) => b !== brandName)
          : [...prev, brandName]
      );
    }
  };

  // 범례 텍스트 포매터 (숨김 시 회색 처리)
  const renderLegendText = (value: string) => {
    const isHidden = hiddenBrands.includes(value);
    return (
      <span
        style={{
          color: isHidden ? '#9ca3af' : '#374151',
          transition: 'color 0.2s ease',
          cursor: 'pointer',
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="flex h-full w-full gap-2">
      {/* 바 그래프 */}
      <div className="h-84 w-full shadow-sm border bg-white rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: -20, bottom: 20 }}
          >
            <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
              tick={{ fontSize: 11 }}
              height={60}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="rect"
              onClick={handleLegendClick}
              formatter={renderLegendText}
              wrapperStyle={{
                paddingTop: '10px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            />
            <Bar dataKey="share" name="점유율" barSize={30}>
              {data.map((entry, i) => (
                <Cell
                  key={`bar-cell-${entry.name}`}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={hiddenBrands.includes(entry.name) ? 0.1 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 도넛 그래프 */}
      <div className="h-84 w-full shadow-sm border bg-white rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Pie
              data={data}
              dataKey="share"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={5}
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell
                  key={`pie-cell-${entry.name}`}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={hiddenBrands.includes(entry.name) ? 0 : 1}
                  style={{
                    pointerEvents: hiddenBrands.includes(entry.name)
                      ? 'none'
                      : 'auto',
                    outline: 'none',
                  }}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="rect"
              layout="horizontal"
              onClick={handleLegendClick}
              formatter={renderLegendText}
              wrapperStyle={{
                fontSize: '12px',
                paddingTop: '20px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SnackSection;
