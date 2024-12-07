'use client';

import { Todo } from '@/lib/types';
import { Trash2, Check, Calendar, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { EditTodoDialog } from './EditTodoDialog';
import { CategoryBadge } from './CategoryBadge';
import { useCategories } from '@/hooks/useCategories';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    data: {
      title: string;
      startDate: Date | null;
      endDate: Date | null;
      categoryId: string | null;
    }
  ) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { categories } = useCategories();
  const category = categories.find((c) => c.id === todo.categoryId);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
              todo.completed
                ? 'border-purple-500 bg-purple-500 text-white'
                : 'border-gray-300'
            }`}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </button>
          <div className="flex flex-1 items-center gap-2">
            <span
              className={`text-sm ${
                todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}
            >
              {todo.title}
            </span>
            {category && (
              <CategoryBadge name={category.name} color={category.color} />
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-500"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {(todo.startDate || todo.endDate) && (
          <div className="flex gap-4 border-t border-gray-100 pt-2 text-xs text-gray-500">
            {todo.startDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Start: {format(new Date(todo.startDate), 'PP')}</span>
              </div>
            )}
            {todo.endDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Due: {format(new Date(todo.endDate), 'PP')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <EditTodoDialog
        todo={todo}
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={(data) => onEdit(todo.id, data)}
      />
    </>
  );
}