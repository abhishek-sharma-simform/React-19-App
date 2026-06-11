import { useCallback } from 'react';
import type { RecurrenceRule } from '../../types/todo';
import { getRecurrenceLabel } from '../../utils/recurrenceHelpers';

interface RecurrenceEditorProps {
  recurrence: RecurrenceRule | undefined;
  onChange: (rule: RecurrenceRule | undefined) => void;
}

export function RecurrenceEditor({ recurrence, onChange }: RecurrenceEditorProps) {
  const handleFrequencyChange = useCallback(
    (frequency: RecurrenceRule['frequency']) => {
      onChange({
        frequency,
        interval: recurrence?.interval || 1,
      });
    },
    [recurrence?.interval, onChange],
  );

  const handleIntervalChange = useCallback(
    (interval: number) => {
      if (!recurrence) return;
      onChange({
        ...recurrence,
        interval: Math.max(1, interval),
      });
    },
    [recurrence, onChange],
  );

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
        {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(freq => (
          <button
            key={freq}
            onClick={() => handleFrequencyChange(freq)}
            style={{
              padding: 'var(--spacing-xs) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${recurrence?.frequency === freq ? 'var(--color-accent)' : 'var(--color-border)'}`,
              backgroundColor:
                recurrence?.frequency === freq ? 'var(--color-accent)' : 'transparent',
              color: recurrence?.frequency === freq ? '#fff' : 'var(--color-text-primary)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast)',
              textTransform: 'capitalize',
            }}
          >
            {freq}
          </button>
        ))}
      </div>

      {recurrence && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <label style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Interval:
            </label>
            <input
              type="number"
              min="1"
              max="52"
              value={recurrence.interval || 1}
              onChange={e => handleIntervalChange(parseInt(e.target.value))}
              style={{
                width: '60px',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
              }}
            />
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Every {recurrence.interval || 1} {recurrence.frequency}(s)
            </span>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <input
              type="date"
              value={recurrence.endDate ? recurrence.endDate.toISOString().split('T')[0] : ''}
              onChange={e => {
                const date = e.target.value ? new Date(e.target.value) : undefined;
                onChange({ ...recurrence, endDate: date });
              }}
              style={{
                padding: 'var(--spacing-xs) var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
              }}
              placeholder="End date (optional)"
            />
          </div>

          <button
            onClick={handleClear}
            style={{
              padding: 'var(--spacing-xs) var(--spacing-md)',
              backgroundColor: 'transparent',
              color: 'var(--color-overdue)',
              border: '1px solid var(--color-overdue)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            Remove Recurrence
          </button>

          <div
            style={{
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Repeats {getRecurrenceLabel(recurrence)}
            {recurrence.endDate && ` until ${recurrence.endDate.toLocaleDateString()}`}
          </div>
        </>
      )}
    </div>
  );
}
