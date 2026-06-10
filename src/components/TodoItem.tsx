import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<string, string> = {
  low: 'border-l-4 border-green-400',
  medium: 'border-l-4 border-yellow-400',
  high: 'border-l-4 border-red-400',
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-green-50 text-green-600',
  medium: 'bg-yellow-50 text-yellow-600',
  high: 'bg-red-50 text-red-600',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  function handleEditSave() {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleEditCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-2xl shadow-sm flex items-center gap-3 px-4 py-3 group transition-all',
        PRIORITY_STYLES[todo.priority],
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Text / Edit field */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full outline-none text-gray-700 text-sm bg-transparent border-b border-indigo-300"
          />
        ) : (
          <span
            className={clsx(
              'block text-sm text-gray-700 truncate',
              todo.completed && 'line-through text-gray-400'
            )}
          >
            {todo.text}
          </span>
        )}
        <span className={clsx('text-xs font-medium px-1.5 py-0.5 rounded mt-1 inline-block', PRIORITY_BADGE[todo.priority])}>
          {todo.priority}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
              aria-label="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-400 transition-colors"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
