import { Trash2, Plus } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { createSubTask } from '../../utils/taskHelpers';
import type { Task, SubTask } from '../../types/todo';

interface SubTaskListProps {
  task: Task;
}

export function SubTaskList({ task }: SubTaskListProps) {
  const updateTask = useTaskStore(state => state.updateTask);

  const handleAddSubTask = () => {
    const title = prompt('Enter sub-task title:');
    if (!title?.trim()) return;

    const newSubTask = createSubTask(title.trim(), { order: task.subTasks.length });
    updateTask(task.id, {
      subTasks: [...task.subTasks, newSubTask],
    });
  };

  const handleToggleSubTask = (subTaskId: string) => {
    const updated = task.subTasks.map(st =>
      st.id === subTaskId
        ? { ...st, completed: !st.completed, completedAt: !st.completed ? new Date() : undefined }
        : st,
    );
    updateTask(task.id, { subTasks: updated });
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    updateTask(task.id, {
      subTasks: task.subTasks.filter(st => st.id !== subTaskId),
    });
  };

  const completedCount = task.subTasks.filter(st => st.completed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: '0 0 var(--spacing-xs) 0', fontWeight: 'var(--font-weight-semibold)' }}>
            Sub-tasks ({completedCount}/{task.subTasks.length})
          </p>
          {task.subTasks.length > 0 && (
            <div
              style={{
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'var(--color-border)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--color-accent)',
                  width: `${(completedCount / task.subTasks.length) * 100}%`,
                  transition: 'width var(--transition-fast)',
                }}
              />
            </div>
          )}
        </div>
        <button
          onClick={handleAddSubTask}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            padding: 'var(--spacing-xs)',
          }}
          title="Add sub-task"
        >
          <Plus size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {task.subTasks.map(subTask => (
          <div
            key={subTask.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              padding: 'var(--spacing-sm)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => handleToggleSubTask(subTask.id)}
              style={{
                cursor: 'pointer',
                accentColor: 'var(--color-accent)',
              }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: subTask.completed ? 'line-through' : 'none',
                color: subTask.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
              }}
            >
              {subTask.title}
            </span>
            <button
              onClick={() => handleDeleteSubTask(subTask.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: 'var(--spacing-xs)',
              }}
              title="Delete sub-task"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
