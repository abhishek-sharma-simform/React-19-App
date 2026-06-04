import { Search, X } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { useUIStore } from '../../store/uiStore';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const searchQuery = useUIStore(state => state.searchQuery);
  const setSearchQuery = useUIStore(state => state.setSearchQuery);
  const { filteredTasks } = useSearch();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className={styles.searchBar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
        <Search size={18} style={{ color: 'var(--color-text-secondary)' }} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search tasks by title or description... (Ctrl+K)"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: 'var(--spacing-xs)',
            }}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className={styles.resultsCount}>
          {filteredTasks.length} result{filteredTasks.length !== 1 ? 's' : ''} found
        </div>
      )}
    </div>
  );
}
