import { Input } from '../UI/input';

type SearchbarType = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
};

const Searchbar = ({ globalFilter, setGlobalFilter }: SearchbarType) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="flex w-full max-w-2xl shadow-sm">
        <Input
          className="h-12 rounded border-gray-300 focus-visible:ring-0 text-lg"
          placeholder="제목 및 본문 내용 검색"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Searchbar;
