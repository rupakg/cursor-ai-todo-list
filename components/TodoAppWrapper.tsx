'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TodoApp = dynamic(() => import('@/components/TodoApp'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse rounded-xl bg-gray-100 p-6">
      <div className="h-40 w-full"></div>
    </div>
  ),
});

export function TodoAppWrapper() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
              <CheckSquare className="h-8 w-8 text-blue-500" />
              <span>Todo List</span>
            </div>
            <Link href="/categories">
              <Button variant="outline">Manage Categories</Button>
            </Link>
          </div>
          <p className="mt-2 text-center text-gray-600">
            Stay organized and productive
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TodoApp />
        </Suspense>
      </div>
    </main>
  );
}