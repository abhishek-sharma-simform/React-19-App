import { Trash2, Plus } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { useTaskStore } from '../../store/taskStore';
import styles from './SmartListNav.module.css';

interface ProjectListProps {
  onAddProject: () => void;
  selectedProjectId?: string;
  onSelectProject: (id: string) => void;
}

export function ProjectList({ onAddProject, selectedProjectId, onSelectProject }: ProjectListProps) {
  const { projects, deleteProject } = useProjects();
  const tasks = useTaskStore(state => state.tasks);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 var(--spacing-md)` }}>
        <h3 className={styles.sectionTitle}>Projects</h3>
        <button
          onClick={onAddProject}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            padding: 'var(--spacing-xs)',
            fontSize: '16px',
          }}
          title="Add project"
        >
          <Plus size={16} />
        </button>
      </div>
      <ul className={styles.list}>
        {projects.map(project => {
          const taskCount = tasks.filter(t => t.projectId === project.id && !t.completed).length;
          return (
            <li key={project.id} className={styles.listItem}>
              <button
                className={`${styles.listItemButton} ${selectedProjectId === project.id ? styles.listItemButtonActive : ''}`}
                onClick={() => onSelectProject(project.id)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                  {project.emoji && <span>{project.emoji}</span>}
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: project.color,
                    }}
                  />
                  {project.name}
                </span>
                {taskCount > 0 && <span className={styles.badge}>{taskCount}</span>}
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  padding: 'var(--spacing-xs)',
                  fontSize: '14px',
                  opacity: 0,
                }}
                onMouseEnter={e => ((e.currentTarget.style.opacity = '1'))}
                onMouseLeave={e => ((e.currentTarget.style.opacity = '0'))}
                onClick={() => deleteProject(project.id)}
                title="Delete project"
              >
                <Trash2 size={14} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
