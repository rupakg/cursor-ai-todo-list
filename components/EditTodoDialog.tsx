'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DatePicker } from './DatePicker';
import { Todo, EditTodoFormData } from '@/lib/types';

interface EditTodoDialogProps {
  todo: Todo;
  open: boolean;
  onClose: () => void;
  onSave: (data: EditTodoFormData) => void;
}

export function EditTodoDialog({ todo, open, onClose, onSave }: EditTodoDialogProps) {
  const [formData, setFormData] = useState<EditTodoFormData>({
    title: todo.title,
    startDate: todo.startDate,
    endDate: todo.endDate,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              date={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              label="Start date"
            />
            <DatePicker
              date={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              label="End date"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}