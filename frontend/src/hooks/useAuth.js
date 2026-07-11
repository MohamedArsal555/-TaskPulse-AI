import { useState } from 'react';

const STORAGE_KEY = 'tp_auth';
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin@123';

// Session-scoped: survives a page refresh but clears when the tab closes,
// since these are fixed demo credentials rather than a real backend session.
export function useAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');

  const login = (username, password) => {
    const ok = username === VALID_USERNAME && password === VALID_PASSWORD;
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setAuthed(true);
    }
    return ok;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
  };

  return { authed, login, logout };
}
