import { useState } from 'react';
import { List, Grid3x3 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { useUIStore } from '../store/uiStore';
import { useSmartList } from '../hooks/useSmartList';
import { useSearch } from '../hooks/useSearch';
import { QuickAddBar } from './todo/QuickAddBar';
import { SmartListNav } from './todo/SmartListNav';
import { SearchBar } from './todo/SearchBar';
import { TaskList } from './todo/TaskList';
import { BoardView } from './todo/BoardView';
import { TaskDetailPanel } from './todo/TaskDetailPanel';
import { ToastContainer } from './todo/Toast';
import styles from './todo/TodoApp.module.css';

export default function TodoApp() {
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);
  const { filteredTasks } = useSmartList();
  const { filteredTasks: searchFilteredTasks } = useSearch();
  const activeView = useUIStore(state => state.activeView);
  const setActiveView = useUIStore(state => state.setActiveView);
  const searchQuery = useUIStore(state => state.searchQuery);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedTaskId(null);
  };

  // Apply search filter on top of smart list filter
  const displayTasks = searchQuery ? searchFilteredTasks : filteredTasks;

  return (
    <div className={styles.todoApp}>
      <SmartListNav />
      <div className={styles.main}>
        <SearchBar />
        <QuickAddBar />

        <div style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <button
              onClick={() => setActiveView('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: activeView === 'list' ? 'var(--color-accent)' : 'var(--color-surface)',
                color: activeView === 'list' ? '#fff' : 'var(--color-text-primary)',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'all var(--transition-fast)',
              }}
              title="List view"
            >
              <List size={18} />
              List
            </button>
            <button
              onClick={() => setActiveView('board')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: activeView === 'board' ? 'var(--color-accent)' : 'var(--color-surface)',
                color: activeView === 'board' ? '#fff' : 'var(--color-text-primary)',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'all var(--transition-fast)',
              }}
              title="Board view (Kanban)"
            >
              <Grid3x3 size={18} />
              Board
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {activeView === 'list' ? (
            <TaskList tasks={displayTasks} />
          ) : (
            <BoardView />
          )}
        </div>
      </div>
      <TaskDetailPanel isOpen={isPanelOpen} onClose={handleClosePanel} />
      <ToastContainer />
    </div>
  );
}
