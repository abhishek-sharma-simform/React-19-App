export type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type SmartList = 'all' | 'today' | 'completed';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  dueTime?: string;
  priority: Priority;
  projectId?: string;
  labels: string[];
  subTasks: SubTask[];
  recurrence?: string;
  reminder?: Date;
  order: number;
  status: TaskStatus;
  deletedAt?: Date;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  emoji?: string;
  createdAt: Date;
  order: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number;
  daysOfWeek?: number[];
  endDate?: Date;
  occurrences?: number;
}
