import type { Task, SmartList } from '../types/todo';
import { isToday, isOverdue } from './dateHelpers';

export function filterBySmartList(tasks: Task[], list: SmartList): Task[] {
  if (list === 'completed') {
    return tasks.filter(t => t.completed && !t.deletedAt);
  }

  const incompleteTasks = tasks.filter(t => !t.completed && !t.deletedAt);

  if (list === 'today') {
    return incompleteTasks.filter(isToday);
  }

  return incompleteTasks;
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
}

export function getTasksByPriority(tasks: Task[]): Record<string, Task[]> {
  const grouped: Record<string, Task[]> = {
    urgent: [],
    high: [],
    medium: [],
    low: [],
    none: [],
  };

  tasks.forEach(task => {
    grouped[task.priority].push(task);
  });

  return grouped;
}

export function getOverdueTasks(tasks: Task[]): Task[] {
  return tasks.filter(isOverdue);
}
