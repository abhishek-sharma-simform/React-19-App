import { useState } from 'react';
import { X } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import styles from './CreateProjectModal.module.css';

const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
];

const EMOJIS = ['📁', '💼', '🎯', '📝', '💡', '🚀', '🎨', '📊', '✅', '⚙️'];

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const { addProject } = useProjects();

  if (!isOpen) {
    return null;
  }

  const handleCreate = () => {
    if (!name.trim()) return;
    addProject(name.trim(), selectedColor, selectedEmoji);
    setName('');
    setSelectedColor(COLORS[0]);
    setSelectedEmoji(EMOJIS[0]);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Project</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div className={styles.formGroup}>
            <label className={styles.label}>Project Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter project name..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Emoji</label>
            <div className={styles.emojiPicker}>
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  className={`${styles.emojiOption} ${selectedEmoji === emoji ? styles.selected : ''}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Color</label>
            <div className={styles.colorPicker}>
              {COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.buttonSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.buttonPrimary} disabled={!name.trim()}>
              Create Project
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
