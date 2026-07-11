import { C } from '../../styles/theme';
import { PAGE_TITLES } from '../../utils/constants';

export function TopBar({ view }) {
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
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 600, color: C.txt }}>{meta.title}</h1>
      <p style={{ fontSize: 13, color: C.txtMut, marginTop: 2 }}>{meta.subtitle}</p>
    </header>
  );
}
