'use client';

import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilter } from '@/components/TodoFilter';
import { TodoCount } from '@/components/TodoCount';
import { useTodos } from '@/hooks/useTodos';

export default function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, filter, setFilter } =
    useTodos();

  return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
      <TodoInput onAdd={addTodo} />

      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <TodoFilter current={filter} onChange={setFilter} />
        <TodoCount count={todos.length} />
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
        {todos.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            No {filter === 'all' ? '' : filter} todos yet
          </p>
        )}
      </div>
    </div>
  );
}