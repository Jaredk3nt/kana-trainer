import { useEffect } from 'react';

export default function useKeyListener(keymap) {
  useEffect(() => {
    function handleKeyPresses(e) {
      const keyFn = keymap[e.keyCode];
      if (keyFn) {
        keyFn();
      }
    }
    window.addEventListener('keydown', handleKeyPresses);
    return () => window.removeEventListener('keydown', handleKeyPresses);
  }, [keymap]);
}
