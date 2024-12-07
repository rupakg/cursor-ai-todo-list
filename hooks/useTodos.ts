'use client';

import { useState, useEffect } from 'react';
import { Todo, TodoStatus } from '@/lib/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');
      if (saved) {
        return JSON.parse(saved, (key, value) => {
          if (key === 'startDate' || key === 'endDate' || key === 'createdAt') {
            return value ? new Date(value) : null;
          }
          return value;
        });
      }
    }
    return [];
  });
  const [filter, setFilter] = useState<TodoStatus>('all');

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
  };
}