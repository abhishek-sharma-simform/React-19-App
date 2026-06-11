import { useState } from 'react';
import { useTaskStore, selectIncompleteTodayCount, selectIncompleteTotalCount } from '../../store/taskStore';
import { useSmartList } from '../../hooks/useSmartList';
import { ProjectList } from './ProjectList';
import { CreateProjectModal } from './CreateProjectModal';
import styles from './SmartListNav.module.css';

export function SmartListNav() {
  const { activeList, setActiveList } = useSmartList();
  const todayCount = useTaskStore(selectIncompleteTodayCount);
  const totalCount = useTaskStore(selectIncompleteTotalCount);
  const completedCount = useTaskStore(state =>
    state.tasks.filter(t => t.completed && !t.deletedAt).length,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>();

  return (
    <>
      <nav className={styles.sidebar}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Smart Lists</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <button
                className={`${styles.listItemButton} ${activeList === 'all' ? styles.listItemButtonActive : ''}`}
                onClick={() => {
                  setActiveList('all');
                  setSelectedProjectId(undefined);
                }}
              >
                <span>All Tasks</span>
                {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                className={`${styles.listItemButton} ${activeList === 'today' ? styles.listItemButtonActive : ''}`}
                onClick={() => {
                  setActiveList('today');
                  setSelectedProjectId(undefined);
                }}
              >
                <span>Today</span>
                {todayCount > 0 && <span className={styles.badge}>{todayCount}</span>}
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                className={`${styles.listItemButton} ${activeList === 'completed' ? styles.listItemButtonActive : ''}`}
                onClick={() => {
                  setActiveList('completed');
                  setSelectedProjectId(undefined);
                }}
              >
                <span>Completed</span>
                {completedCount > 0 && <span className={styles.badge}>{completedCount}</span>}
              </button>
            </li>
          </ul>
        </div>

        <ProjectList
          onAddProject={() => setIsModalOpen(true)}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
      </nav>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
