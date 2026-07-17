import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Field, Input, Select, PasswordField } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { C } from '../../styles/theme';
import { ROLES, levelLabel } from '../../utils/roles';
import { listUsers, updateUserRole, deleteUser } from '../../utils/userStore';

// "Users" access (utils/roles.js permissions.workload) doubles as the gate
// for this page's team-accounts section, since workload scoring is the
// per-employee module in this console — reuses the same matrix instead of
// adding a parallel permission dimension.
const MODULES = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'workload', label: 'Users / Workload' },
  { key: 'sprint', label: 'Projects / Blockers' },
  { key: 'delay', label: 'Tasks / Logs' },
];

const LEVEL_TONE = {
  full:    { fg: '#166534', bg: '#dcfce7' },
  edit:    { fg: '#166534', bg: '#dcfce7' },
  view:    { fg: '#1d4ed8', bg: '#dbeafe' },
  limited: { fg: '#a16207', bg: '#fef3c7' },
  none:    { fg: '#991b1b', bg: '#fee2e2' },
};

function initials(name) {
  return (name || '?').slice(0, 2).toUpperCase();
}

function LevelBadge({ role, moduleKey }) {
  const level = role.permissions?.[moduleKey] || 'none';
  const tone = LEVEL_TONE[level] || { fg: C.txtMut, bg: C.p50 };
  return (
    <span style={{ fontSize: 11.5, fontWeight: 700, color: tone.fg, background: tone.bg, padding: '3px 9px', borderRadius: 999 }}>
      {levelLabel(role, moduleKey)}
    </span>
  );
}

export function ProfilePage({ role, onUpdateProfile }) {
  const isRegistered = Boolean(role.email);
  const workloadAccess = role.permissions?.workload;
  const canManageUsers = workloadAccess === 'full';
  const canViewUsers = workloadAccess === 'full' || workloadAccess === 'view';

  const [users, setUsers] = useState(() => listUsers().filter((u) => u.username !== role.username));
  const [email, setEmail] = useState(role.email || '');
  const [password, setPassword] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  const refreshUsers = () => setUsers(listUsers().filter((u) => u.username !== role.username));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile({ email: email.trim(), password });
    setPassword('');
    setSaveMsg('Profile updated.');
  };

  const handleRoleChange = (username, roleId) => {
    updateUserRole(username, roleId);
    refreshUsers();
  };

  const handleRemove = (username) => {
    deleteUser(username);
    refreshUsers();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 780 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 52, height: 52, borderRadius: '50%', background: role.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0,
            }}
          >
            {initials(role.username)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.txt }}>{role.username}</div>
            <div style={{ fontSize: 13, color: C.txtMut, marginTop: 2 }}>
              {role.email || 'Demo account — no email on file'}
            </div>
          </div>
          <span
            style={{
              marginLeft: 'auto', flexShrink: 0, fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 999,
              background: `${role.color}18`, color: role.color, border: `1px solid ${role.color}33`,
            }}
          >
            {role.label}
          </span>
        </div>
        <p style={{ fontSize: 13, color: C.txtSub, marginTop: 16, lineHeight: 1.55 }}>{role.description}</p>
      </Card>

      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Your access</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {MODULES.map((m) => (
            <div
              key={m.key}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 8, border: `1px solid ${C.borderLight}` }}
            >
              <span style={{ fontSize: 13, color: C.txtSub, fontWeight: 500 }}>{m.label}</span>
              <LevelBadge role={role} moduleKey={m.key} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Account settings</h3>
        {isRegistered ? (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
            <Field label="Email">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <PasswordField
              label="New password"
              hint="Leave blank to keep your current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {saveMsg && <div style={{ fontSize: 12.5, color: '#166534', fontWeight: 600 }}>{saveMsg}</div>}
            <div>
              <Button type="submit" variant="outline">Save changes</Button>
            </div>
          </form>
        ) : (
          <p style={{ fontSize: 13, color: C.txtMut, marginTop: 8, lineHeight: 1.55 }}>
            This is a fixed demo account, so its details aren't editable here. Sign up for a
            registered account from the login screen to manage your own profile.
          </p>
        )}
      </Card>

      {canViewUsers && (
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Team accounts</h3>
          <p style={{ fontSize: 12.5, color: C.txtMut, marginBottom: 14 }}>
            {canManageUsers
              ? 'Self-registered accounts — change a role or remove an account.'
              : 'Self-registered accounts (view only for your role).'}
          </p>
          {users.length === 0 ? (
            <p style={{ fontSize: 13, color: C.txtMut }}>No other self-registered accounts yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {users.map((u) => {
                const r = ROLES.find((x) => x.id === u.roleId);
                return (
                  <div
                    key={u.username}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.borderLight}` }}
                  >
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: '50%', background: r?.color || C.p400, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0,
                      }}
                    >
                      {initials(u.username)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.txt }}>{u.username}</div>
                      <div style={{ fontSize: 12, color: C.txtMut }}>{u.email}</div>
                    </div>
                    {canManageUsers ? (
                      <>
                        <Select value={u.roleId} onChange={(e) => handleRoleChange(u.username, e.target.value)} style={{ width: 160 }}>
                          {ROLES.map((r2) => (
                            <option key={r2.id} value={r2.id}>{r2.label}</option>
                          ))}
                        </Select>
                        <button
                          type="button"
                          onClick={() => handleRemove(u.username)}
                          style={{ fontSize: 12, fontWeight: 600, color: '#dc2626', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: 12, fontWeight: 600, color: r?.color || C.txtMut }}>{r?.label || u.roleId}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
