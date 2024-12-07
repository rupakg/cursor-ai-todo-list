'use client';

import { useState, useEffect, useMemo } from 'react';
import { Todo, TodoStatus } from '@/lib/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Initialize todos from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');
      if (saved) {
        try {
          const parsedTodos = JSON.parse(saved);
          // Convert date strings back to Date objects
          return parsedTodos.map((todo: any) => ({
            ...todo,
            createdAt: todo.createdAt ? new Date(todo.createdAt) : null,
            startDate: todo.startDate ? new Date(todo.startDate) : null,
            endDate: todo.endDate ? new Date(todo.endDate) : null,
          }));
        } catch (e) {
          console.error('Failed to parse todos from localStorage:', e);
          return [];
        }
      }
    }
    return [];
  });
  const [filter, setFilter] = useState<TodoStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed);
      
      const matchesCategory =
        !selectedCategory || todo.categoryId === selectedCategory;

      return matchesStatus && matchesCategory;
    });
  }, [todos, filter, selectedCategory]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    title: string,
    startDate: Date | null,
    endDate: Date | null,
    categoryId: string | null
  ) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      startDate,
      endDate,
      categoryId,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (
    id: string,
    data: {
      title: string;
      startDate: Date | null;
      endDate: Date | null;
      categoryId: string | null;
    }
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...data,
            }
          : todo
      )
    );
  };

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    selectedCategory,
    setSelectedCategory,
  };
}