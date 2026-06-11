import { format, isToday as isTodayFns, isPast, isToday as fnIsToday, differenceInDays } from 'date-fns';
import type { Task } from '../types/todo';

export function formatDueDate(date: Date | undefined): string {
  if (!date) return '';
  return format(date, 'MMM d, yyyy');
}

export function formatRelativeDate(date: Date | undefined): string {
  if (!date) return '';

  if (isTodayFns(date)) {
    return 'Today';
  }

  const days = differenceInDays(date, new Date());
  if (days === 1) {
    return 'Tomorrow';
  }

  if (days === -1) {
    return 'Yesterday';
  }

  if (days > 1 && days <= 7) {
    return format(date, 'EEEE');
  }

  return format(date, 'MMM d');
}

export function parseDateString(s: string): Date | undefined {
  if (!s) return undefined;
  const [year, month, day] = s.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isToday(task: Task): boolean {
  return task.dueDate ? fnIsToday(task.dueDate) : false;
}

export function isOverdue(task: Task): boolean {
  return task.dueDate && !task.completed ? isPast(task.dueDate) && !fnIsToday(task.dueDate) : false;
}
