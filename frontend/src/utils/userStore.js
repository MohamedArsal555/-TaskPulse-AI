import { ROLES } from './roles';

// Self-registered accounts, kept separately from the fixed demo ROLES
// credentials. Uses localStorage (not sessionStorage) so an account created
// in one tab is still there after the browser is closed and reopened.
const USERS_KEY = 'tp_users';

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ username, email, password, roleId }) {
  const uname = username.trim();
  const users = readUsers();
  const taken =
    users.some((u) => u.username.toLowerCase() === uname.toLowerCase()) ||
    ROLES.some((r) => r.username.toLowerCase() === uname.toLowerCase());
  if (taken) return { ok: false, error: 'That username is already taken.' };

  users.push({ username: uname, email: email.trim(), password, roleId });
  writeUsers(users);
  return { ok: true };
}

export function findUserByCredentials(username, password) {
  return readUsers().find((u) => u.username === username && u.password === password) || null;
}

// Self-registered accounts only (the fixed demo ROLES accounts aren't real
// records, so they never appear here) — password omitted, for display in the
// profile module's team-accounts list.
export function listUsers() {
  return readUsers().map(({ password, ...rest }) => rest);
}

export function updateUserRole(username, roleId) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.username === username);
  if (idx === -1) return false;
  users[idx] = { ...users[idx], roleId };
  writeUsers(users);
  return true;
}

export function deleteUser(username) {
  const users = readUsers();
  const next = users.filter((u) => u.username !== username);
  writeUsers(next);
  return next.length !== users.length;
}

export function updateOwnProfile(username, { email, password }) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.username === username);
  if (idx === -1) return false;
  users[idx] = {
    ...users[idx],
    email: email || users[idx].email,
    password: password || users[idx].password,
  };
  writeUsers(users);
  return true;
}
