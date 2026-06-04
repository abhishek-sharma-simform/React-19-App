import { useCallback, useRef, useEffect } from 'react';
import { useTaskStore, selectAllTasks } from '../store/taskStore';
import { useUIStore } from '../store/uiStore';
import type { Task } from '../types/todo';

export function useSearch(debounceDelay = 200) {
  const searchQuery = useUIStore(state => state.searchQuery);
  const setSearchQuery = useUIStore(state => state.setSearchQuery);
  const allTasks = useTaskStore(selectAllTasks);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const searchTasks = useCallback(
    (tasks: Task[], query: string): Task[] => {
      if (!query.trim()) {
        return tasks;
      }

      const lowerQuery = query.toLowerCase();
      return tasks.filter(
        task =>
          task.title.toLowerCase().includes(lowerQuery) ||
          (task.description && task.description.toLowerCase().includes(lowerQuery)),
      );
    },
    [],
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setSearchQuery(query);
      }, debounceDelay);
    },
    [debounceDelay, setSearchQuery],
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const filteredTasks = searchTasks(allTasks, searchQuery);

  return {
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    filteredTasks,
  };
}
