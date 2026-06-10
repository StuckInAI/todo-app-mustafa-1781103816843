type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  const total = activeCount + completedCount;
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{activeCount} remaining</span>
        <span>{pct}% done</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
