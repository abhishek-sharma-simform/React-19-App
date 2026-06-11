import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useTaskStore } from '../../store/taskStore';
import type { Toast as ToastType } from '../../store/uiStore';
import styles from './Toast.module.css';

export function Toast({ toast }: { toast: ToastType }) {
  const dismissToast = useUIStore(state => state.dismissToast);
  const toggleComplete = useTaskStore(state => state.toggleComplete);

  const handleUndo = () => {
    if (toast.taskId) {
      toggleComplete(toast.taskId);
    }
    dismissToast(toast.id);
  };

  const toastClass = `${styles.toast} ${
    toast.type === 'info'
      ? styles.toastInfo
      : toast.type === 'success'
        ? styles.toastSuccess
        : toast.type === 'error'
          ? styles.toastError
          : styles.toastUndo
  }`;

  return (
    <div className={toastClass}>
      <div className={styles.toastContent}>
        <p className={styles.toastMessage}>{toast.message}</p>
      </div>
      <div className={styles.toastActions}>
        {toast.type === 'undo' && toast.taskId && (
          <button className={styles.undoButton} onClick={handleUndo}>
            {toast.undoLabel || 'Undo'}
          </button>
        )}
        <button
          className={styles.closeButton}
          onClick={() => dismissToast(toast.id)}
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useUIStore(state => state.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
