/* eslint-disable react-hooks/incompatible-library */

import type { Post } from '../../types';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFilter,
  type SortingState,
  type ColumnSizingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatKST from '../utils/formatKST';
import Searchbar from './Searchbar';
import FilterPanel from './FilterPanner';
import Sort from '../../asset/sort.svg?react';

type PostsTableProps = {
  data: Post[];
  bottomRef: (node?: Element | null) => void;
  hasNextPage: boolean;
};

const PostsTable = ({ data, bottomRef, hasNextPage }: PostsTableProps) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    id: true,
    title: true,
    userId: true,
    createdAt: true,
    tag: true,
    category: true,
    body: false,
  });

  const navigate = useNavigate();

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: 'number',
      meta: {
        label: '번호',
      },
      header: '번호',
      minSize: 50,
      maxSize: 100,
      cell: ({ row }) => <p>{row.index + 1}</p>,
    },
    {
      accessorKey: 'title',
      meta: {
        label: '제목',
      },
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none hover:text-blue-600"
            onClick={() => {
              column.toggleSorting(sorted === 'asc', false);
            }}
          >
            제목
            <span className="text-sm">
              <Sort />
            </span>
          </div>
        );
      },
      size: 450,
      cell: ({ row, getValue }) => (
        <p
          className="cursor-pointer"
          onClick={() =>
            navigate(`${row.original.id}`, {
              state: { postData: row.original },
            })
          }
        >
          {getValue<string>()}
        </p>
      ),
    },
    {
      accessorKey: 'userId',
      meta: {
        label: '아이디',
      },
      header: '아이디',
      cell: (props) => <p>{props.getValue<string>()}</p>,
    },
    {
      accessorKey: 'createdAt',
      meta: {
        label: '작성일',
      },
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        return (
          <div
            className="flex items-center gap-2 cursor-pointer select-none hover:text-blue-600"
            onClick={() => column.toggleSorting(sorted === 'asc', false)}
          >
            작성일
            <span className="text-sm">
              <Sort />
            </span>
          </div>
        );
      },
      minSize: 50,
      maxSize: 220,
      cell: (props) => <p>{formatKST(props.getValue<string>())}</p>,
    },
    {
      accessorKey: 'category',
      meta: {
        label: '카테고리',
      },
      header: '카테고리',
      cell: (props) => <p>{props.getValue<string>()}</p>,
      filterFn: (row, columnId, filterValue: string[]) => {
        if (filterValue.length === 0) return true; // 아무것도 선택 안 하면 전체 표시
        return filterValue.includes(row.getValue(columnId));
      },
    },
    {
      accessorKey: 'tags',
      meta: {
        label: '태그',
      },
      header: '태그',
      minSize: 50,
      cell: (props) => <p>{props.getValue<string>()}</p>,
    },
    {
      accessorKey: 'body',
      header: '본문',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
      columnFilters,
      sorting,
      columnSizing,
    },
    globalFilterFn: (row, _, filterValue) => {
      const safeFilterValue = filterValue;

      const title = String(row.getValue('title'));
      const content = String(row.getValue('body') || '');

      // 제목이나 본문에 검색어가 포함되어 있으면 true 반환
      return (
        title.includes(safeFilterValue) || content.includes(safeFilterValue)
      );
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableMultiSort: false,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    onColumnSizingChange: (updater) => {
      setColumnSizing((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;

        // next 반영했을 때 총 폭 계산
        const leafCols = table.getAllLeafColumns();
        const total = leafCols.reduce((sum, col) => {
          const size = next[col.id] ?? col.getSize();
          return sum + size;
        }, 0);

        // 테이블 폭보다 커지려 하면 무시
        if (total > 1300) return prev;

        return next;
      });
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
  });

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* 1. 중앙 정렬된 검색바 영역 */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-2xl">
          <Searchbar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>

      {/* 2. 글쓰기 버튼 영역: 태그(마지막 컬럼) 위쪽에 배치하기 위해 flex-end 처리 */}
      <div className="flex justify-end mb-4 pr-78">
        {/* pr-[312px]는 우측 필터패널(288px) + 간격(24px) 만큼 띄워서 테이블 끝에 맞춤 */}
        <button
          onClick={() => navigate('/posts/create')}
          className="px-5 py-2 bg-white border text-gray-600 rounded-lg shadow-sm hover:bg-gray-50 transition-all font-medium text-sm"
        >
          글쓰기
        </button>
      </div>

      {/* 3. 메인 컨텐츠 영역: 테이블 + 필터 패널 */}
      <div className="flex gap-6 relative">
        {/* 테이블 영역 */}
        <div className="flex-1 bg-white border border-gray-200 shadow-sm overflow-hidden ml-7">
          <table className="w-full border-collapse table-fixed">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-[#f1f3f5]">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="relative h-14 border-b border-r border-gray-200 last:border-r-0 px-4 text-center text-lg font-bold text-gray-700"
                    >
                      <div className="flex items-center justify-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* 리사이즈 핸들러 */}
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none
                            ${
                              header.column.getIsResizing()
                                ? 'bg-blue-400'
                                : 'hover:bg-gray-300'
                            }`}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="h-20 border-r border-gray-100 last:border-r-0 px-4 text-center align-middle text-[18px] text-gray-600"
                    >
                      <div className="whitespace-pre-line leading-tight">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}

              {/* 무한 스크롤 및 하단 상태 바 */}
              <tr ref={bottomRef}>
                <td
                  colSpan={table.getVisibleFlatColumns().length}
                  className="h-16 text-center text-gray-400 bg-gray-50/20"
                >
                  {hasNextPage ? '더 불러오는 중...' : '마지막 데이터입니다.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 오른쪽 필터 패널 */}
        <div className="w-72 sticky top-8">
          <FilterPanel table={table} />
        </div>
      </div>
    </div>
  );
};

export default PostsTable;
