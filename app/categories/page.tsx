'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  const { categories, addCategory, editCategory, deleteCategory } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName('');
      setNewCategoryColor('#3B82F6');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-6 w-6 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Todos</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name..."
              className="flex-1"
            />
            <Input
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
              className="w-20"
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </form>

          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newName = prompt('Enter new name:', category.name);
                      const newColor = prompt('Enter new color:', category.color);
                      if (newName && newColor) {
                        editCategory(category.id, {
                          name: newName,
                          color: newColor,
                        });
                      }
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}