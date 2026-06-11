import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { parseDateString } from '../../utils/dateHelpers';
import type { Priority } from '../../types/todo';
import styles from './QuickAddBar.module.css';

export function QuickAddBar() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('none');
  const [dueDate, setDueDate] = useState('');
  const addTask = useTaskStore(state => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const overrides: Record<string, unknown> = { priority };
    if (dueDate) {
      const parsedDate = parseDateString(dueDate);
      if (parsedDate) {
        overrides.dueDate = parsedDate;
      }
    }

    addTask(title.trim(), overrides);
    setTitle('');
    setPriority('none');
    setDueDate('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.quickAddBar}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="task-title" className={styles.label}>
              What needs to be done?
            </label>
            <input
              id="task-title"
              type="text"
              className={styles.input}
              placeholder="Add a new task..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </div>
          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </div>

        <div className={styles.options}>
          <div className={styles.optionGroup}>
            <label className={styles.label}>Priority</label>
            <div className={styles.priorityButtons}>
              {(['none', 'low', 'medium', 'high', 'urgent'] as Priority[]).map(p => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.priorityButton} ${priority === p ? styles.priorityButtonActive : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <label htmlFor="due-date" className={styles.label}>
              Due Date
            </label>
            <input
              id="due-date"
              type="date"
              className={styles.input}
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              style={{ padding: '8px 12px' }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
