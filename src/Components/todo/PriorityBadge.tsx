import type { Priority } from '../../types/todo';

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityColors: Record<Priority, string> = {
  urgent: 'var(--color-priority-urgent)',
  high: 'var(--color-priority-high)',
  medium: 'var(--color-priority-medium)',
  low: 'var(--color-priority-low)',
  none: 'var(--color-priority-none)',
};

const priorityLabels: Record<Priority, string> = {
  urgent: '🔴',
  high: '🟠',
  medium: '🟡',
  low: '🔵',
  none: '',
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (priority === 'none') {
    return null;
  }

  return (
    <span
      title={priority}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: priorityColors[priority],
        fontSize: '12px',
        color: '#fff',
        fontWeight: 'var(--font-weight-semibold)',
      }}
    >
      {priorityLabels[priority]}
    </span>
  );
}
