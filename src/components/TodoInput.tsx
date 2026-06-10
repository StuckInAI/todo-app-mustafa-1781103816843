import { useState } from 'react';
import { Priority } from '@/types';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-red-500' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full outline-none text-gray-700 placeholder-gray-300 text-base bg-transparent"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-semibold border transition-all',
                priority === p.value
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white border-gray-200 text-gray-400 hover:border-indigo-300'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </form>
  );
}
