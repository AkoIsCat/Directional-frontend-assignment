import type { Table as TanStackTable } from '@tanstack/react-table';
import { Checkbox } from '../UI/checkbox';

interface FilterPanelProps<TData> {
  table: TanStackTable<TData>;
}

export default function FilterPanel<TData>({ table }: FilterPanelProps<TData>) {
  const categoryColumn = table.getColumn('category');
  const currentFilterValue =
    (categoryColumn?.getFilterValue() as string[]) ?? [];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      // 체크되면 필터 배열에 추가
      categoryColumn?.setFilterValue([...currentFilterValue, category]);
    } else {
      // 체크 해제되면 필터 배열에서 제거
      categoryColumn?.setFilterValue(
        currentFilterValue.filter((val) => val !== category)
      );
    }
  };

  return (
    <aside className="w-64 shrink-0 border border-gray-300 p-6 bg-white shadow-sm rounded-sm h-fit fixed right-20">
      <div className="space-y-8">
        {/* Column 섹션 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-sidebar" />
            <h2 className="font-bold text-sm tracking-tight">Column</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {table
              .getAllLeafColumns()
              .filter((column) => column.id !== 'body')
              .map((column) => (
                <label
                  key={column.id}
                  className="flex items-center gap-2 text-xs font-semibold cursor-pointer "
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    className={`
                    w-7 h-7 rounded-none border-2 border-slate-400 
                    data-[state=checked]:bg-white 
                    data-[state=checked]:text-black 
                    data-[state=checked]:border-slate-400
                  `}
                  />
                  <span className="truncate uppercase">
                    {column.columnDef.meta?.label}
                  </span>
                </label>
              ))}
          </div>
        </section>

        {/* 카테고리 필터 섹션 */}
        <section className="pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-sidebar" />
            <h2 className="font-bold text-sm tracking-tight">Filter</h2>
          </div>
          <div className="flex flex-col gap-3">
            {['NOTICE', 'QNA', 'FREE'].map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={currentFilterValue.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, !!checked)
                  }
                  className={`
                    w-7 h-7 rounded-none border-2 border-slate-400 
                    data-[state=checked]:bg-white 
                    data-[state=checked]:text-black 
                    data-[state=checked]:border-slate-400
                  `}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
