'use client';

import { TodoStatus } from '@/lib/types';
import { useCategories } from '@/hooks/useCategories';

interface TodoFilterProps {
  current: TodoStatus;
  onChange: (status: TodoStatus) => void;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function TodoFilter({ 
  current, 
  onChange, 
  selectedCategory,
  onCategoryChange 
}: TodoFilterProps) {
  const { categories } = useCategories();
  const filters: { label: string; value: TodoStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex items-center gap-4">
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

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Category:</label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}