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
import type { CoffeeBrand } from '../../types';

interface Props {
  data: CoffeeBrand[];
}

interface LegendEntry {
  value?: string | number; // Recharts 내부 타입과 일치시킴
  name?: string;
  payload?: {
    brand?: string;
    [key: string]: unknown;
  };
}

const CoffeeSection = ({ data = [] }: Props) => {
  const COLORS = ['#1e3932', '#006241', '#2d5e4c', '#5a8b7a', '#8db3a6'];
  const [hiddenBrands, setHiddenBrands] = useState<string[]>([]);

  const handleLegendClick = (entry: LegendEntry) => {
    // value가 undefined일 경우를 대비해 처리
    const brandName =
      entry.value?.toString() || entry.name || entry.payload?.brand;

    if (brandName) {
      setHiddenBrands((prev) =>
        prev.includes(brandName)
          ? prev.filter((b) => b !== brandName)
          : [...prev, brandName]
      );
    }
  };

  const renderLegendText = (value: string) => {
    const isHidden = hiddenBrands.includes(value);
    return (
      <span
        style={{
          color: isHidden ? '#9ca3af' : '#374151',
          transition: 'color 0.2s ease',
          fontWeight: isHidden ? 400 : 500,
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-75 ">
      <div className="w-75 h-84 border border-gray-200 rounded-xl bg-white p-4 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="brand"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} width={40} />
            <Tooltip />
            <Legend
              onClick={handleLegendClick}
              formatter={renderLegendText}
              wrapperStyle={{ cursor: 'pointer', userSelect: 'none' }}
            />
            <Bar dataKey="popularity" name="인기도">
              {data.map((entry, i) => (
                <Cell
                  key={`bar-${entry.brand}`}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={hiddenBrands.includes(entry.brand) ? 0.1 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border bg-white p-4 shadow-sm rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="popularity"
              nameKey="brand"
              innerRadius={50}
              outerRadius={80}
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell
                  key={`pie-${entry.brand}`}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={hiddenBrands.includes(entry.brand) ? 0 : 1}
                  style={{
                    pointerEvents: hiddenBrands.includes(entry.brand)
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

export default CoffeeSection;
