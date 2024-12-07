'use client';

import { TodoStatus } from '@/lib/types';

interface TodoFilterProps {
  current: TodoStatus;
  onChange: (status: TodoStatus) => void;
}

export function TodoFilter({ current, onChange }: TodoFilterProps) {
  const filters: { label: string; value: TodoStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            current === value
              ? 'bg-purple-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}