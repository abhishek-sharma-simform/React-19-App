import { useUIStore } from '../store/uiStore';
import { useTaskStore } from '../store/taskStore';

export function useBulkSelection() {
  const selectedTaskIds = useUIStore(state => state.selectedTaskIds);
  const toggleTaskSelection = useUIStore(state => state.toggleTaskSelection);
  const selectAllTasks = useUIStore(state => state.selectAllTasks);
  const clearSelection = useUIStore(state => state.clearSelection);
  const bulkComplete = useTaskStore(state => state.bulkComplete);
  const bulkDelete = useTaskStore(state => state.bulkDelete);
  const bulkUpdatePriority = useTaskStore(state => state.bulkUpdatePriority);
  const allTasks = useTaskStore(state => state.tasks);

  const handleSelectAll = () => {
    const incompleteTasks = allTasks.filter(t => !t.completed && !t.deletedAt);
    selectAllTasks(incompleteTasks.map(t => t.id));
  };

  const handleCompleteSelected = () => {
    bulkComplete(Array.from(selectedTaskIds));
    clearSelection();
  };

  const handleDeleteSelected = () => {
    bulkDelete(Array.from(selectedTaskIds));
    clearSelection();
  };

  const handleSetPriority = (priority: import('../types/todo').Priority) => {
    bulkUpdatePriority(Array.from(selectedTaskIds), priority);
    clearSelection();
  };

  return {
    selectedTaskIds,
    toggleTaskSelection,
    handleSelectAll,
    handleCompleteSelected,
    handleDeleteSelected,
    handleSetPriority,
    clearSelection,
  };
}
