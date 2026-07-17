import { useState } from 'react';
import { findRoleByCredentials, findRoleById } from '../utils/roles';
import { findUserByCredentials, registerUser, updateOwnProfile } from '../utils/userStore';

const STORAGE_KEY = 'tp_auth';

// Session-scoped: survives a page refresh but clears when the tab closes,
// since the signed-in account is a demo/self-registered login rather than a
// real backend session. Two credential sources feed login(): the fixed demo
// ROLES accounts in utils/roles.js, and self-registered accounts persisted
// in localStorage via utils/userStore.js — both resolve to a role object so
// the rest of the app only ever deals with one shape.
export function useAuth() {
  const [account, setAccount] = useState(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const saved = JSON.parse(raw);
      const role = findRoleById(saved.roleId);
      return role ? { ...role, username: saved.username, email: saved.email } : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    const uname = username.trim();
    let resolved = null;

    const user = findUserByCredentials(uname, password);
    if (user) {
      const role = findRoleById(user.roleId);
      if (role) resolved = { ...role, username: user.username, email: user.email };
    } else {
      const demoRole = findRoleByCredentials(uname, password);
      if (demoRole) resolved = { ...demoRole, email: '' };
    }

    if (resolved) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ roleId: resolved.id, username: resolved.username, email: resolved.email })
      );
      setAccount(resolved);
    }
    return resolved;
  };

  const register = ({ username, email, password, roleId }) => registerUser({ username, email, password, roleId });

  // Only meaningful for self-registered accounts (the fixed demo ROLES
  // accounts have nowhere to persist an edit). Keeps the in-memory session in
  // sync so the new email shows up immediately without a re-login.
  const updateProfile = ({ email, password }) => {
    if (!account || !account.email) return false;
    const ok = updateOwnProfile(account.username, { email, password });
    if (ok) {
      const next = { ...account, email: email || account.email };
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ roleId: next.id, username: next.username, email: next.email })
      );
      setAccount(next);
    }
    return ok;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAccount(null);
  };

  return { authed: !!account, role: account, login, register, updateProfile, logout };
}
