import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Task, SmartList } from '../types/todo';
import { createTask, updateTask } from '../utils/taskHelpers';
import { filterBySmartList, sortTasks } from '../utils/taskFilters';

interface TaskState {
  tasks: Task[];
  activeSmartList: SmartList;
  selectedTaskId: string | null;
}

interface TaskActions {
  addTask: (title: string, overrides?: Partial<Task>) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  reorderTasks: (ids: string[]) => void;
  setActiveSmartList: (list: SmartList) => void;
  setSelectedTaskId: (id: string | null) => void;
}

type TaskStore = TaskState & TaskActions;

const initialState: TaskState = {
  tasks: [],
  activeSmartList: 'all',
  selectedTaskId: null,
};

export const useTaskStore = create<TaskStore>()(
  persist(
    set => ({
      ...initialState,
      addTask: (title: string, overrides?: Partial<Task>) => {
        const newTask = createTask(title, overrides);
        set(state => {
          const maxOrder = state.tasks.length > 0 ? Math.max(...state.tasks.map(t => t.order)) : -1;
          return {
            tasks: [...state.tasks, { ...newTask, order: maxOrder + 1 }],
          };
        });
      },
      updateTask: (id: string, patch: Partial<Task>) => {
        set(state => ({
          tasks: state.tasks.map(task => (task.id === id ? updateTask(task, patch) : task)),
        }));
      },
      deleteTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
          selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
        }));
      },
      toggleComplete: (id: string) => {
        set(state => ({
          tasks: state.tasks.map(task => {
            if (task.id === id) {
              return updateTask(task, {
                completed: !task.completed,
                completedAt: !task.completed ? new Date() : undefined,
                status: !task.completed ? 'done' : 'todo',
              });
            }
            return task;
          }),
        }));
      },
      reorderTasks: (ids: string[]) => {
        set(state => {
          const reordered = ids.map((id, index) => {
            const task = state.tasks.find(t => t.id === id);
            return task ? { ...task, order: index } : null;
          });
          return {
            tasks: state.tasks.map(task => {
              const found = reordered.find(r => r?.id === task.id);
              return found || task;
            }),
          };
        });
      },
      setActiveSmartList: (list: SmartList) => {
        set({ activeSmartList: list });
      },
      setSelectedTaskId: (id: string | null) => {
        set({ selectedTaskId: id });
      },
    }),
    {
      name: 'todo-tasks',
      storage: createJSONStorage(() => localStorage, {
        reviver: (_key, value) => {
          if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            return new Date(value);
          }
          return value;
        },
      }),
    },
  ),
);

export const selectAllTasks = (state: TaskState): Task[] => sortTasks(state.tasks);

export const selectTodayTasks = (state: TaskState): Task[] => {
  return sortTasks(filterBySmartList(state.tasks, 'today'));
};

export const selectFilteredTasks = (state: TaskState): Task[] => {
  return sortTasks(filterBySmartList(state.tasks, state.activeSmartList));
};

export const selectIncompleteTodayCount = (state: TaskState): number => {
  return selectTodayTasks(state).length;
};

export const selectIncompleteTotalCount = (state: TaskState): number => {
  return state.tasks.filter(t => !t.completed && !t.deletedAt).length;
};

export const selectTaskById = (state: TaskState, id: string): Task | undefined => {
  return state.tasks.find(t => t.id === id);
};
