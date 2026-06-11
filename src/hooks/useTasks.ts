import { useTaskStore, selectAllTasks } from '../store/taskStore';

export function useTasks() {
  const tasks = useTaskStore(selectAllTasks);
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const toggleComplete = useTaskStore(state => state.toggleComplete);
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    setSelectedTaskId,
  };
}
