export const KEYBOARD_SHORTCUTS = {
  NEW_TASK: { key: 'n', description: 'Create new task' },
  TOGGLE_COMPLETE: { key: ' ', description: 'Toggle task complete' },
  DELETE_TASK: { key: 'Delete', description: 'Delete focused task' },
  EDIT_TASK: { key: 'e', description: 'Edit focused task' },
  OPEN_SEARCH: { key: 'k', ctrl: true, description: 'Open search (Ctrl+K)' },
  CLOSE: { key: 'Escape', description: 'Close panels/modals' },
  PRIORITY_1: { key: '1', description: 'Set Urgent priority' },
  PRIORITY_2: { key: '2', description: 'Set High priority' },
  PRIORITY_3: { key: '3', description: 'Set Medium priority' },
  PRIORITY_4: { key: '4', description: 'Set Low priority' },
} as const;

export function getShortcutLabel(shortcut: (typeof KEYBOARD_SHORTCUTS)[keyof typeof KEYBOARD_SHORTCUTS]): string {
  if (shortcut.ctrl) {
    return `Ctrl+${shortcut.key}`;
  }
  if (shortcut.key === 'Escape') {
    return 'Esc';
  }
  if (shortcut.key === ' ') {
    return 'Space';
  }
  if (shortcut.key === 'Delete') {
    return 'Del';
  }
  return shortcut.key;
}
