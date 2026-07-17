import { C } from '../../styles/theme';
import { PAGE_TITLES } from '../../utils/constants';

export function TopBar({ view, role, setView }) {
  const meta = PAGE_TITLES[view] || {};

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: '17px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: C.txt }}>{meta.title}</h1>
        <p style={{ fontSize: 13, color: C.txtMut, marginTop: 2 }}>{meta.subtitle}</p>
      </div>

      {role && (
        <button
          type="button"
          onClick={() => setView('profile')}
          aria-label="Open your profile"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px 4px 4px',
            borderRadius: 999,
            background: view === 'profile' ? `${role.color}22` : `${role.color}18`,
            border: `1px solid ${role.color}33`,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 24, height: 24, borderRadius: '50%', background: role.color, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, flexShrink: 0,
            }}
          >
            {(role.username || '?').slice(0, 2).toUpperCase()}
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: role.color }}>{role.label}</span>
        </button>
      )}
    </header>
  );
}
