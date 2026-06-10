import { FilterType } from '../types';
import clsx from 'clsx';

type TodoFilterProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="flex gap-2 bg-white rounded-xl border border-gray-100 shadow-sm p-1 w-fit">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
            filter === f.value
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
