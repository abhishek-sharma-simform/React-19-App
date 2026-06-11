import { isOverdue, formatRelativeDate } from '../../utils/dateHelpers';
import { isToday } from '../../utils/dateHelpers';
import type { Task } from '../../types/todo';

interface DueDateChipProps {
  task: Task;
}

export function DueDateChip({ task }: DueDateChipProps) {
  if (!task.dueDate) {
    return null;
  }

  const isTaskOverdue = isOverdue(task);
  const isTaskToday = isToday(task);
  let bgColor = 'var(--color-surface)';
  let textColor = 'var(--color-text-primary)';

  if (isTaskOverdue) {
    bgColor = 'var(--color-overdue)';
    textColor = '#fff';
  } else if (isTaskToday) {
    bgColor = 'var(--color-today)';
    textColor = '#fff';
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        paddingLeft: 'var(--spacing-sm)',
        paddingRight: 'var(--spacing-sm)',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: bgColor,
        color: textColor,
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        whiteSpace: 'nowrap',
      }}
    >
      {formatRelativeDate(task.dueDate)}
    </span>
  );
}
