import { useTodos } from '../hooks/useTodos';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoFilter from '../components/TodoFilter';
import TodoStats from '../components/TodoStats';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-500 text-white p-2 rounded-xl shadow-md">
            <CheckSquare size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">My To-Dos</h1>
            <p className="text-sm text-gray-400">Stay organised, get things done.</p>
          </div>
        </div>

        {/* Stats */}
        <TodoStats activeCount={activeCount} completedCount={completedCount} />

        {/* Input */}
        <div className="mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filter */}
        <div className="mb-4">
          <TodoFilter filter={filter} setFilter={setFilter} />
        </div>

        {/* List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Clear completed */}
        {completedCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCompleted}
              className="text-sm text-red-400 hover:text-red-600 transition-colors font-medium"
            >
              Clear {completedCount} completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
