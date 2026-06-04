import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  handler: () => void;
  ctrlKey?: boolean;
  shiftKey?: boolean;
}

export function useKeyboardShortcut(shortcuts: ShortcutConfig | ShortcutConfig[]) {
  useEffect(() => {
    const shortcutList = Array.isArray(shortcuts) ? shortcuts : [shortcuts];

    function handleKeyDown(event: KeyboardEvent) {
      for (const shortcut of shortcutList) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrlKey ? event.ctrlKey || event.metaKey : true;
        const shiftMatches = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;

        if (keyMatches && ctrlMatches && shiftMatches) {
          event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
