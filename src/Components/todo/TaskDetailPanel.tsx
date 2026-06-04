import { X } from 'lucide-react';
import { useTaskStore, selectTaskById } from '../../store/taskStore';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { useProjects } from '../../hooks/useProjects';
import { parseDateString } from '../../utils/dateHelpers';
import { LabelPicker } from './LabelPicker';
import { SubTaskList } from './SubTaskList';
import styles from './TaskDetailPanel.module.css';

interface TaskDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailPanel({ isOpen, onClose }: TaskDetailPanelProps) {
  const selectedTaskId = useTaskStore(state => state.selectedTaskId);
  const task = useTaskStore(state => (selectedTaskId ? selectTaskById(state, selectedTaskId) : undefined));
  const updateTask = useTaskStore(state => state.updateTask);
  const { projects } = useProjects();

  useKeyboardShortcut({
    key: 'Escape',
    handler: onClose,
  });

  if (!isOpen || !task) {
    return null;
  }

  const handleChange = (field: string, value: unknown) => {
    if (field === 'dueDate' && typeof value === 'string') {
      const date = value ? parseDateString(value) : undefined;
      updateTask(task.id, { [field]: date });
    } else {
      updateTask(task.id, { [field]: value });
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Task</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label htmlFor="detail-title" className={styles.label}>
              Title
            </label>
            <input
              id="detail-title"
              type="text"
              className={styles.input}
              value={task.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="Task title"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail-description" className={styles.label}>
              Description
            </label>
            <textarea
              id="detail-description"
              className={styles.textarea}
              value={task.description || ''}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Add details..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail-priority" className={styles.label}>
              Priority
            </label>
            <select
              id="detail-priority"
              className={styles.select}
              value={task.priority}
              onChange={e => handleChange('priority', e.target.value)}
            >
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail-dueDate" className={styles.label}>
              Due Date
            </label>
            <input
              id="detail-dueDate"
              type="date"
              className={styles.input}
              value={task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''}
              onChange={e => handleChange('dueDate', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail-dueTime" className={styles.label}>
              Due Time
            </label>
            <input
              id="detail-dueTime"
              type="time"
              className={styles.input}
              value={task.dueTime || ''}
              onChange={e => handleChange('dueTime', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail-status" className={styles.label}>
              Status
            </label>
            <select
              id="detail-status"
              className={styles.select}
              value={task.status}
              onChange={e => handleChange('status', e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail-project" className={styles.label}>
              Project
            </label>
            <select
              id="detail-project"
              className={styles.select}
              value={task.projectId || ''}
              onChange={e => handleChange('projectId', e.target.value || undefined)}
            >
              <option value="">No Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.emoji} {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Labels</label>
            <LabelPicker
              selectedLabelIds={task.labels}
              onLabelToggle={labelId => {
                const newLabels = task.labels.includes(labelId)
                  ? task.labels.filter(l => l !== labelId)
                  : [...task.labels, labelId];
                handleChange('labels', newLabels);
              }}
              onLabelCreate={() => {}}
            />
          </div>

          <hr style={{ borderColor: 'var(--color-border)', marginTop: 'var(--spacing-lg)' }} />

          <SubTaskList task={task} />
        </div>
      </div>
    </>
  );
}
