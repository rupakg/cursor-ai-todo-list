'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Personal', color: '#3B82F6' },
  { id: '2', name: 'Work', color: '#EF4444' },
];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('categories');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const editCategory = (id: string, data: { name: string; color: string }) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...data } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  return {
    categories,
    addCategory,
    editCategory,
    deleteCategory,
  };
}