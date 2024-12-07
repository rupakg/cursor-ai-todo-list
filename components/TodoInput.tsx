'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { CategorySelect } from './CategorySelect';
import { useCategories } from '@/hooks/useCategories';

interface TodoInputProps {
  onAdd: (
    title: string,
    startDate: Date | null,
    endDate: Date | null,
    categoryId: string | null
  ) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const { categories } = useCategories();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), startDate, endDate, categoryId);
      setTitle('');
      setStartDate(null);
      setEndDate(null);
      setCategoryId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <PlusCircle className="h-4 w-4" />
          Add
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <DatePicker
          date={startDate}
          onChange={setStartDate}
          label="Select start date"
        />
        <DatePicker
          date={endDate}
          onChange={setEndDate}
          label="Select end date"
        />
        <CategorySelect
          categories={categories}
          value={categoryId}
          onChange={setCategoryId}
        />
      </div>
    </form>
  );
}