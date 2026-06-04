import { create } from 'zustand';

export interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'undo';
  taskId?: string;
  undoLabel?: string;
}

interface UIState {
  isSidebarOpen: boolean;
  activeView: 'list' | 'board' | 'calendar';
  isAddingTask: boolean;
  editingTaskId: string | null;
  toasts: Toast[];
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveView: (view: 'list' | 'board' | 'calendar') => void;
  openAddTask: () => void;
  closeAddTask: () => void;
  setEditingTaskId: (id: string | null) => void;
  showToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
}

type UIStore = UIState & UIActions;

const initialState: UIState = {
  isSidebarOpen: true,
  activeView: 'list',
  isAddingTask: false,
  editingTaskId: null,
  toasts: [],
};

export const useUIStore = create<UIStore>(set => ({
  ...initialState,
  toggleSidebar: () => {
    set(state => ({ isSidebarOpen: !state.isSidebarOpen }));
  },
  setSidebarOpen: (open: boolean) => {
    set({ isSidebarOpen: open });
  },
  setActiveView: (view: 'list' | 'board' | 'calendar') => {
    set({ activeView: view });
  },
  openAddTask: () => {
    set({ isAddingTask: true });
  },
  closeAddTask: () => {
    set({ isAddingTask: false });
  },
  setEditingTaskId: (id: string | null) => {
    set({ editingTaskId: id });
  },
  showToast: (toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    set(state => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(t => t.id !== id),
      }));
    }, 5000);
    return id;
  },
  dismissToast: (id: string) => {
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    }));
  },
}));
