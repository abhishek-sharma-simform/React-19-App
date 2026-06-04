import type { Priority, TaskStatus } from './todo';

export interface TaskFormValues {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
  status: TaskStatus;
}
