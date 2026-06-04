import { CheckCircle, Trash2, AlertCircle, X } from 'lucide-react';
import { useBulkSelection } from '../../hooks/useBulkSelection';
import type { Priority } from '../../types/todo';

export function BulkActionBar() {
  const {
    selectedTaskIds,
    handleSelectAll,
    handleCompleteSelected,
    handleDeleteSelected,
    handleSetPriority,
    clearSelection,
  } = useBulkSelection();

  if (selectedTaskIds.size === 0) {
    return null;
  }

  const priorities: Priority[] = ['none', 'low', 'medium', 'high', 'urgent'];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--spacing-lg)',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--color-accent)',
        color: '#fff',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-lg)',
        flexWrap: 'wrap',
        maxWidth: 'calc(100% - 2rem)',
      }}
    >
      <span style={{ fontWeight: 'var(--font-weight-semibold)', whiteSpace: 'nowrap' }}>
        {selectedTaskIds.size} selected
      </span>

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
        <button
          onClick={handleCompleteSelected}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}
          title="Mark selected as complete"
        >
          <CheckCircle size={16} />
          Complete
        </button>

        <button
          onClick={handleDeleteSelected}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}
          title="Delete selected"
        >
          <Trash2 size={16} />
          Delete
        </button>

        <select
          onChange={e => {
            if (e.target.value) {
              handleSetPriority(e.target.value as Priority);
            }
          }}
          style={{
            padding: 'var(--spacing-xs) var(--spacing-sm)',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
          }}
          defaultValue=""
        >
          <option value="">Set Priority...</option>
          {priorities.map(priority => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={clearSelection}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            padding: 0,
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}
          title="Clear selection"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
