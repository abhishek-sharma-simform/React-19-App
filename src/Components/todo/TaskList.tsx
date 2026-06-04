import { useTaskStore } from '../../store/taskStore';
import { TaskItem } from './TaskItem';
import type { Task } from '../../types/todo';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);

  if (tasks.length === 0) {
    return (
      <div className={styles.taskList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>✅</div>
          <p className={styles.emptyStateText}>You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onClick={() => setSelectedTaskId(task.id)}
        />
      ))}
    </div>
  );
}
