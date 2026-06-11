import { Trash2 } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import { DueDateChip } from './DueDateChip';
import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import type { Task } from '../../types/todo';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onClick: () => void;
}

export function TaskItem({ task, onClick }: TaskItemProps) {
  const toggleComplete = useTaskStore(state => state.toggleComplete);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const showToast = useUIStore(state => state.showToast);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleComplete(task.id);

    if (!task.completed) {
      showToast({
        type: 'undo',
        message: `"${task.title}" marked as complete`,
        taskId: task.id,
        undoLabel: 'Restore',
      });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div className={styles.taskItem} onClick={onClick}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div className={styles.content}>
        <p className={`${styles.title} ${task.completed ? styles.titleCompleted : ''}`}>
          {task.title}
        </p>
        <div className={styles.meta}>
          <PriorityBadge priority={task.priority} />
          <DueDateChip task={task} />
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          aria-label={`Delete "${task.title}"`}
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
