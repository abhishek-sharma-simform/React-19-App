import { addDays, addWeeks, addMonths, addYears, isBefore, isAfter, isSameDay } from 'date-fns';
import type { Task, RecurrenceRule } from '../types/todo';

export function expandRecurringTask(
  task: Task,
  rangeStart: Date,
  rangeEnd: Date,
): Task[] {
  if (!task.dueDate || !task.recurrence) {
    return [task];
  }

  const expanded: Task[] = [];
  let currentDate = new Date(task.dueDate);

  const maxIterations = 365; // Safety limit
  let iterations = 0;

  while (isBefore(currentDate, rangeEnd) && iterations < maxIterations) {
    iterations++;

    if (isAfter(currentDate, rangeStart) || isSameDay(currentDate, rangeStart)) {
      expanded.push({
        ...task,
        id: `${task.id}-${currentDate.getTime()}`,
        dueDate: new Date(currentDate),
      });
    }

    // Calculate next occurrence
    const rule = task.recurrence;
    switch (rule.frequency) {
      case 'daily':
        currentDate = addDays(currentDate, rule.interval || 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, rule.interval || 1);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, rule.interval || 1);
        break;
      case 'yearly':
        currentDate = addYears(currentDate, rule.interval || 1);
        break;
    }

    // Check end conditions
    if (rule.endDate && isAfter(currentDate, rule.endDate)) {
      break;
    }
    if (rule.occurrences && expanded.length >= rule.occurrences) {
      break;
    }
  }

  return expanded;
}

export function getRecurrenceLabel(rule: RecurrenceRule): string {
  const interval = rule.interval || 1;
  const intervalText = interval > 1 ? `every ${interval} ` : '';

  switch (rule.frequency) {
    case 'daily':
      return `${intervalText}day${interval > 1 ? 's' : ''}`;
    case 'weekly':
      return `${intervalText}week${interval > 1 ? 's' : ''}`;
    case 'monthly':
      return `${intervalText}month${interval > 1 ? 's' : ''}`;
    case 'yearly':
      return `${intervalText}year${interval > 1 ? 's' : ''}`;
    default:
      return 'Never';
  }
}
