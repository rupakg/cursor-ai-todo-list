'use client';

import { TodoStatus } from '@/lib/types';
import { useCategories } from '@/hooks/useCategories';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

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

  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name || 'All Categories';

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              current === value
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Category:</label>
        <Select.Root value={selectedCategory || 'all'} onValueChange={(value) => onCategoryChange(value === 'all' ? null : value)}>
          <Select.Trigger
            className="flex h-9 w-[180px] items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Select.Value>{selectedCategoryName}</Select.Value>
            <Select.Icon>
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
              <Select.Viewport className="p-1">
                <Select.Item
                  value="all"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100"
                >
                  <Select.ItemText>All Categories</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
                {categories.map((category) => (
                  <Select.Item
                    key={category.id}
                    value={category.id}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <Select.ItemText>{category.name}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="h-4 w-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}