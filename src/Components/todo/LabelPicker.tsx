import { X } from 'lucide-react';
import { useLabels } from '../../hooks/useProjects';
import type { Label } from '../../types/todo';

interface LabelPickerProps {
  selectedLabelIds: string[];
  onLabelToggle: (labelId: string) => void;
  onLabelCreate: (name: string, color: string) => void;
}

export function LabelPicker({ selectedLabelIds, onLabelToggle, onLabelCreate }: LabelPickerProps) {
  const { labels, addLabel } = useLabels();

  const handleAddLabel = (labelName: string) => {
    if (!labelName.trim()) return;
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    addLabel(labelName.trim(), color);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          flexWrap: 'wrap',
        }}
      >
        {labels.map(label => (
          <button
            key={label.id}
            onClick={() => onLabelToggle(label.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${label.color}`,
              backgroundColor: selectedLabelIds.includes(label.id) ? label.color : 'transparent',
              color: selectedLabelIds.includes(label.id) ? '#fff' : label.color,
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast)',
            }}
          >
            {label.name}
            {selectedLabelIds.includes(label.id) && <X size={14} />}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add new label..."
        onKeyDown={e => {
          if (e.key === 'Enter') {
            const input = e.currentTarget;
            handleAddLabel(input.value);
            input.value = '';
          }
        }}
        style={{
          padding: 'var(--spacing-sm)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
        }}
      />
    </div>
  );
}
