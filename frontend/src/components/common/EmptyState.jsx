import { C } from '../../styles/theme';
import { Icon } from './Icon';

export function EmptyState({ icon = 'grid', title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 20px', color: C.txtMut }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: 10,
          background: C.bg,
          border: `1px solid ${C.borderLight}`,
          marginBottom: 14,
          color: C.txtMut,
        }}
      >
        <Icon name={icon} size={20} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: C.txtSub, marginBottom: 4 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13.5 }}>{subtitle}</div>}
    </div>
  );
}
