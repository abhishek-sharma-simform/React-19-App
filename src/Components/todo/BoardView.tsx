import { useTaskStore } from '../../store/taskStore';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { PriorityBadge } from './PriorityBadge';
import { DueDateChip } from './DueDateChip';
import type { Task, TaskStatus } from '../../types/todo';
import styles from './BoardView.module.css';

interface BoardColumn {
  status: TaskStatus;
  title: string;
  color: string;
}

const COLUMNS: BoardColumn[] = [
  { status: 'todo', title: 'To Do', color: '#6b7280' },
  { status: 'in_progress', title: 'In Progress', color: '#f59e0b' },
  { status: 'done', title: 'Done', color: '#22c55e' },
];

export function BoardView() {
  const tasks = useTaskStore(state => state.tasks);
  const setTaskStatus = useTaskStore(state => state.setTaskStatus);
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter(t => t.status === status && !t.deletedAt && !t.completed);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      setTaskStatus(taskId, status);
    }
  };

  return (
    <div className={styles.boardView}>
      {COLUMNS.map(column => {
        const columnTasks = getTasksByStatus(column.status);
        return (
          <div key={column.status} className={styles.column}>
            <div
              className={styles.columnHeader}
              style={{
                borderBottomColor: column.color,
              }}
            >
              <span>{column.title}</span>
              <span className={styles.columnCount}>{columnTasks.length}</span>
            </div>
            <div
              className={styles.columnContent}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, column.status)}
            >
              {columnTasks.length === 0 ? (
                <div className={styles.emptyColumn}>No tasks</div>
              ) : (
                columnTasks.map(task => (
                  <div
                    key={task.id}
                    className={styles.card}
                    draggable
                    onDragStart={e => handleDragStart(e, task.id)}
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    <p className={styles.cardTitle}>{task.title}</p>
                    <div className={styles.cardMeta}>
                      <PriorityBadge priority={task.priority} />
                      <DueDateChip task={task} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
