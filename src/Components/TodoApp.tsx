import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useSmartList } from '../hooks/useSmartList';
import { QuickAddBar } from './todo/QuickAddBar';
import { SmartListNav } from './todo/SmartListNav';
import { TaskList } from './todo/TaskList';
import { TaskDetailPanel } from './todo/TaskDetailPanel';
import { ToastContainer } from './todo/Toast';
import styles from './todo/TodoApp.module.css';

export default function TodoApp() {
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);
  const { filteredTasks } = useSmartList();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedTaskId(null);
  };

  return (
    <div className={styles.todoApp}>
      <SmartListNav />
      <div className={styles.main}>
        <QuickAddBar />
        <div className={styles.content}>
          <TaskList tasks={filteredTasks} />
        </div>
      </div>
      <TaskDetailPanel isOpen={isPanelOpen} onClose={handleClosePanel} />
      <ToastContainer />
    </div>
  );
}
