import { useTaskStore, selectFilteredTasks } from '../store/taskStore';

export function useSmartList() {
  const activeList = useTaskStore(state => state.activeSmartList);
  const setActiveList = useTaskStore(state => state.setActiveSmartList);
  const filteredTasks = useTaskStore(selectFilteredTasks);

  return {
    activeList,
    setActiveList,
    filteredTasks,
  };
}
