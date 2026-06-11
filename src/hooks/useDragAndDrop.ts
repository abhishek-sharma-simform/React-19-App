import { useCallback } from 'react';
import { useTaskStore } from '../store/taskStore';
import type { TaskStatus } from '../types/todo';

export interface DragEndEvent {
  active: { id: string };
  over: { id: string } | null;
}

export function useDragAndDrop() {
  const reorderTasks = useTaskStore(state => state.reorderTasks);
  const setTaskStatus = useTaskStore(state => state.setTaskStatus);
  const tasks = useTaskStore(state => state.tasks);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      // Check if we're reordering within the same list
      const activeTask = tasks.find(t => t.id === active.id);
      const overTask = tasks.find(t => t.id === over.id);

      if (!activeTask || !overTask) return;

      // If dragging to a column header (status column), change status
      const validStatuses: TaskStatus[] = ['todo', 'in_progress', 'done'];
      if (validStatuses.includes(over.id as TaskStatus)) {
        setTaskStatus(active.id, over.id as TaskStatus);
        return;
      }

      // Otherwise, reorder tasks
      if (active.id === over.id) return;

      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === over.id);

      if (oldIndex === newIndex) return;

      const newTasks = Array.from(tasks);
      const [removed] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, removed);

      const reorderedIds = newTasks.map(t => t.id);
      reorderTasks(reorderedIds);
    },
    [tasks, reorderTasks, setTaskStatus],
  );

  return {
    handleDragEnd,
  };
}
