export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  categoryId: string | null;
}

export type TodoStatus = 'all' | 'active' | 'completed';

export interface EditTodoFormData {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  categoryId: string | null;
}