import type { Task, SubTask } from '../types/todo';

export function createTask(title: string, overrides?: Partial<Task>): Task {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
    priority: 'none',
    labels: [],
    subTasks: [],
    order: 0,
    status: 'todo',
    ...overrides,
  };
}

export function updateTask(existing: Task, patch: Partial<Task>): Task {
  return {
    ...existing,
    ...patch,
    updatedAt: new Date(),
  };
}

export function createSubTask(title: string, overrides?: Partial<SubTask>): SubTask {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: now,
    order: 0,
    ...overrides,
  };
}
