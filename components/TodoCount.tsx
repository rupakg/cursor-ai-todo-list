'use client';

interface TodoCountProps {
  count: number;
}

export function TodoCount({ count }: TodoCountProps) {
  return (
    <span className="text-sm text-gray-500">
      {count} {count === 1 ? 'item' : 'items'}
    </span>
  );
}