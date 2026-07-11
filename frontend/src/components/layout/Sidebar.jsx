import { useState } from 'react';
import { C } from '../../styles/theme';
import { NAV_ITEMS } from '../../utils/constants';
import { Icon } from '../common/Icon';
import { ConfirmDialog } from '../common/ConfirmDialog';

export function Sidebar({ view, setView, onLogout }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <aside
      className="tp-sidebar"
      style={{
        width: 240,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: C.grad,
        color: 'rgba(255,255,255,0.85)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 14px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px', marginBottom: 30 }}>
        <div
          className="tp-serif"
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: C.p500,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          TP
        </div>
        <div>
          <div className="tp-serif" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.15, color: '#fff' }}>
            TaskPulse AI
          </div>
          <div style={{ fontSize: 10.5, opacity: 0.5, letterSpacing: 0.4 }}>Prediction console</div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`tp-nav-item${view === item.key ? ' active' : ''}`}
            onClick={() => setView(item.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '9px 12px',
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              color: 'inherit',
              fontSize: 13.5,
              fontWeight: 500,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          className="tp-nav-item"
          onClick={() => setConfirmOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            padding: '9px 12px',
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'inherit',
            fontSize: 13.5,
            fontWeight: 500,
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <Icon name="logout" size={16} />
          Log out
        </button>

        <div style={{ padding: '4px 10px 0', fontSize: 11, opacity: 0.4, lineHeight: 1.6 }}>
          Rule-based scoring engine
          <br />
          v0.1 · Nexora Business Solutions
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Log out?"
        message="You'll need to sign back in with your TaskPulse AI credentials to continue."
        confirmLabel="Log out"
        cancelLabel="Stay signed in"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onLogout();
        }}
      />
    </aside>
  );
}
